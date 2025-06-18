"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getBlogArticles, ShopifyArticle } from "../../../lib/shopify-blog";
import MainContentWrapper from "../../../components/MainContentWrapper";

export default function BlogPage() {
	const [articles, setArticles] = useState<ShopifyArticle[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [hasMore, setHasMore] = useState<boolean>(false);
	const [endCursor, setEndCursor] = useState<string | null>(null);

	const blogHandle = "news";

	const loadArticles = async (cursor: string | null = null) => {
		setLoading(true);
		try {
			const response = await getBlogArticles(blogHandle, 10, cursor);
			if (cursor) {
				setArticles((prev) => [...prev, ...response.articles]);
			} else {
				setArticles(response.articles);
			}
			setHasMore(response.pageInfo.hasNextPage);
			setEndCursor(response.pageInfo.endCursor);
			setError(null);
		} catch (err) {
			console.error("Error fetching blog articles:", err);
			setError("Failed to load blog articles. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadArticles();
	}, []);

	const handleLoadMore = () => {
		if (hasMore && !loading) {
			loadArticles(endCursor);
		}
	};

	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		return new Date(dateString).toLocaleDateString("en-US", options);
	};

	return (
		<MainContentWrapper>
			<div className="max-w-screen-xl mx-auto mt-10  px-4 pt-20 pb-12 sm:px-6 lg:px-8 lg:pt-28 lg:pb-16">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
						Our Blog
					</h1>
					<p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
						Insights, updates, and stories about our products and community
					</p>
				</div>

				{error && (
					<div className="text-center p-8 bg-red-50 rounded-lg mb-8">
						<p className="text-red-600">{error}</p>
						<button
							onClick={() => loadArticles()}
							className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
						>
							Try Again
						</button>
					</div>
				)}

				{!error && (
					<>
						{loading && articles.length === 0 ? (
							<div className="flex justify-center items-center py-20">
								<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
							</div>
						) : (
							<>
								{articles.length === 0 ? (
									<div className="text-center p-12">
										<p className="text-lg text-gray-600">No articles found.</p>
									</div>
								) : (
									<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
										{articles.map((article) => (
											<article
												key={article.id}
												className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md"
											>
												<Link
													href={`/blog/${article.handle}`}
													className="block flex-shrink-0"
												>
													<div className="relative h-48 w-full">
														{article.image ? (
															<Image
																src={article.image.url}
																alt={article.image.altText || article.title}
																fill
																className="object-cover"
															/>
														) : (
															<div className="w-full h-full bg-gray-200 flex items-center justify-center">
																<span className="text-gray-400">No image</span>
															</div>
														)}
													</div>
												</Link>

												<div className="p-6 flex-grow flex flex-col">
													<div className="flex-grow">
														<p className="text-sm text-gray-500 mb-2">
															{formatDate(article.publishedAt)}
															{article.author?.name && ` • Twotaks `}
														</p>

														<Link href={`/blog/${article.handle}`} className="block">
															<h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600">
																{article.title}
															</h2>
														</Link>

														{article.excerpt && (
															<p className="text-gray-600 mb-4 line-clamp-3">
																{article.excerpt}
															</p>
														)}
													</div>

													{article.tags && article.tags.length > 0 && (
														<div className="mt-4 flex flex-wrap gap-2">
															{article.tags.slice(0, 3).map((tag) => (
																<span
																	key={tag}
																	className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
																>
																	{tag}
																</span>
															))}
															{article.tags.length > 3 && (
																<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
																	+{article.tags.length - 3}
																</span>
															)}
														</div>
													)}

													<div className="mt-4">
														<Link
															href={`/blog/${article.handle}`}
															className="text-indigo-600 font-medium hover:text-indigo-500 flex items-center"
														>
															Read more
															<svg
																className="ml-1 w-4 h-4"
																fill="currentColor"
																viewBox="0 0 20 20"
															>
																<path
																	fillRule="evenodd"
																	d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
																	clipRule="evenodd"
																/>
															</svg>
														</Link>
													</div>
												</div>
											</article>
										))}
									</div>
								)}

								{hasMore && (
									<div className="mt-12 text-center">
										<button
											onClick={handleLoadMore}
											disabled={loading}
											className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
										>
											{loading ? (
												<>
													<svg
														className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
													>
														<circle
															className="opacity-25"
															cx="12"
															cy="12"
															r="10"
															stroke="currentColor"
															strokeWidth="4"
														></circle>
														<path
															className="opacity-75"
															fill="currentColor"
															d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
														></path>
													</svg>
													Loading...
												</>
											) : (
												"Load More Articles"
											)}
										</button>
									</div>
								)}
							</>
						)}
					</>
				)}
			</div>
		</MainContentWrapper>
	);
}
