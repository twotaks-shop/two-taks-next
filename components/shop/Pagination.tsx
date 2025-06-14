"use client";

import Link from "next/link";
import { PaginationInfo } from "../../lib/types";

interface PaginationProps {
	pageInfo: PaginationInfo;
	basePath: string;
	currentPage: number;
}

export default function Pagination({
	pageInfo,
	basePath,
	currentPage,
}: PaginationProps) {
	const { hasNextPage, hasPreviousPage } = pageInfo;

	const createPageUrl = (page: number) => {
		const url = new URL(basePath, "http://localhost");
		url.searchParams.set("page", page.toString());

		return `${url.pathname}${url.search}`;
	};

	if (!hasNextPage && !hasPreviousPage) {
		return null;
	}

	return (
		<div className="mt-16 flex justify-center items-center gap-6">
			{hasPreviousPage ? (
				<Link
					href={createPageUrl(currentPage - 1)}
					className="flex items-center gap-2 px-6 py-3 bg-white border border-neutral-300 rounded-lg text-sm font-heading-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200"
				>
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					Previous
				</Link>
			) : (
				<div className="px-6 py-3 text-sm text-neutral-400">
					<svg
						className="w-4 h-4 inline mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					Previous
				</div>
			)}

			<span className="px-4 py-2 bg-black text-white rounded-lg text-sm font-heading-medium">
				Page {currentPage}
			</span>

			{hasNextPage ? (
				<Link
					href={createPageUrl(currentPage + 1)}
					className="flex items-center gap-2 px-6 py-3 bg-white border border-neutral-300 rounded-lg text-sm font-heading-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200"
				>
					Next
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</Link>
			) : (
				<div className="px-6 py-3 text-sm text-neutral-400">
					Next
					<svg
						className="w-4 h-4 inline ml-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</div>
			)}
		</div>
	);
}
