"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { getBlogArticle, ShopifyArticle } from "../../../../lib/shopify-blog";
import MainContentWrapper from "../../../../components/MainContentWrapper";

interface PageParams {
	params: Promise<{
		handle: string;
	}>;
}

export default function BlogArticlePage({ params }: PageParams) {
	const { handle } = use(params);
	const [article, setArticle] = useState<ShopifyArticle | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const blogHandle = "news";

	useEffect(() => {
		const fetchArticle = async () => {
			setLoading(true);
			try {
				const articleData = await getBlogArticle(blogHandle, handle);
				setArticle(articleData);
				setError(null);
			} catch (err) {
				console.error("Error fetching blog article:", err);
				setError("Failed to load the article. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchArticle();
	}, [handle]);

	// Función para formatear la fecha
	const formatDate = (dateString: string) => {
		if (!dateString) return "";
		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		return new Date(dateString).toLocaleDateString("en-US", options);
	};

	if (loading) {
		return (
			<MainContentWrapper>
				<div className="max-w-screen-xl mx-auto px-4 pt-20 pb-12 sm:px-6 lg:px-8 lg:pt-28 lg:pb-16">
					<div className="flex justify-center items-center py-32">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
					</div>
				</div>
			</MainContentWrapper>
		);
	}

	if (error || !article) {
		return (
			<MainContentWrapper>
				<div className="max-w-screen-xl mx-auto px-4 pt-20 pb-12 sm:px-6 lg:px-8 lg:pt-28 lg:pb-16">
					<div className="text-center p-12 bg-red-50 rounded-lg">
						<h2 className="text-2xl font-bold text-red-800 mb-4">
							{error || "Article not found"}
						</h2>
						<p className="text-red-600 mb-6">
							{!error && "The article you're looking for could not be found."}
						</p>
						<Link
							href="/blog"
							className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Back to Blog
						</Link>
					</div>
				</div>
			</MainContentWrapper>
		);
	}

	return (
		<MainContentWrapper>
			<article className="max-w-screen-xl mt-8 mx-auto px-4 pt-20 pb-12 sm:px-6 lg:px-8 lg:pt-28 lg:pb-16">
				{/* Breadcrumbs */}
				<nav className="mb-8 text-sm">
					<ol className="flex items-center space-x-2">
						<li>
							<Link href="/" className="text-gray-500 hover:text-gray-700">
								Home
							</Link>
						</li>
						<li>
							<span className="text-gray-400 mx-2">/</span>
						</li>
						<li>
							<Link href="/blog" className="text-gray-500 hover:text-gray-700">
								Blog
							</Link>
						</li>
						<li>
							<span className="text-gray-400 mx-2">/</span>
						</li>
						<li className="text-gray-900 font-medium truncate">{article.title}</li>
					</ol>
				</nav>

				{/* Article Header */}
				<header className="mb-12">
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
						{article.title}
					</h1>

					<div className="flex items-center text-gray-600 mb-8">
						{article.publishedAt && (
							<time dateTime={article.publishedAt}>
								{formatDate(article.publishedAt)}
							</time>
						)}
						{article.author?.name && (
							<>
								<span className="mx-3">•</span>
								<span>Twotaks</span>
							</>
						)}
					</div>

					{article.tags && article.tags.length > 0 && (
						<div className="flex flex-wrap gap-2 mb-8">
							{article.tags.map((tag) => (
								<span
									key={tag}
									className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
								>
									{tag}
								</span>
							))}
						</div>
					)}
				</header>

				{/* Article Content */}
				<div className="prose prose-lg max-w-none">
					{article.contentHtml ? (
						<div
							id="blog"
							dangerouslySetInnerHTML={{ __html: article.contentHtml }}
						/>
					) : (
						<p className="text-gray-600 whitespace-pre-line">{article.content}</p>
					)}
				</div>

				{/* Article Footer */}
				<footer className="mt-16 pt-8 border-t border-gray-200">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
						<div className="mb-6 sm:mb-0">
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Share this article
							</h3>
							<div className="flex space-x-4">
								<a
									href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-500 hover:text-gray-700"
									aria-label="Share on Twitter"
								>
									<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
										<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
									</svg>
								</a>
								<a
									href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-500 hover:text-gray-700"
									aria-label="Share on Facebook"
								>
									<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
										<path
											fillRule="evenodd"
											d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
								<a
									href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&title=${encodeURIComponent(article.title)}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-500 hover:text-gray-700"
									aria-label="Share on LinkedIn"
								>
									<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
										<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
									</svg>
								</a>
							</div>
						</div>
						<Link
							href="/blog"
							className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-500"
						>
							<svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
								<path
									fillRule="evenodd"
									d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
									clipRule="evenodd"
								/>
							</svg>
							Back to Blog
						</Link>
					</div>
				</footer>
			</article>
		</MainContentWrapper>
	);
}
