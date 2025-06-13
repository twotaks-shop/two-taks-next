"use client";

import React from "react";
import { ShopifyProduct, PaginationInfo } from "../../lib/types";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

interface ProductGridProps {
	products: ShopifyProduct[];
	pageInfo: PaginationInfo;
	basePath: string;
	currentPage: number;
	title?: string;
}

export default function ProductGrid({
	products,
	pageInfo,
	basePath,
	currentPage,
	title,
}: ProductGridProps) {
	if (products.length === 0) {
		return (
			<div className="w-full py-20 text-center">
				<div className="max-w-md mx-auto">
					<svg
						className="mx-auto h-12 w-12 text-neutral-400 mb-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4H8v1"
						/>
					</svg>
					<h3 className="text-lg font-heading-medium text-neutral-900 mb-2">
						No products found
					</h3>
					<p className="text-neutral-600">
						No products found in this collection. Check back soon for new items.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full">
			{title && (
				<div className="mb-8">
					<h2 className="text-2xl font-heading-medium text-neutral-900 mb-2">
						{title}
					</h2>
					<p className="text-neutral-600">
						{products.length} product{products.length !== 1 ? "s" : ""} found
					</p>
				</div>
			)}

			<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-12">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>

			<Pagination
				pageInfo={pageInfo}
				basePath={basePath}
				currentPage={currentPage}
			/>
		</div>
	);
}
