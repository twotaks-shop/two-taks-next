import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
	getCollections,
	getCollection,
	getProductsInCollection,
} from "../../../../../lib/shopify";

import CollectionsSidebar from "../../../../../components/shop/CollectionsSidebar";
import ProductGrid from "../../../../../components/shop/ProductGrid";

interface CollectionPageParams {
	params: Promise<{
		handle: string;
	}>;
	searchParams: Promise<{
		page?: string;
		cursor?: string;
	}>;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ handle: string }>;
}): Promise<Metadata> {
	const { handle } = await params;
	const collection = await getCollection(handle);

	if (!collection) {
		return {
			title: "Collection Not Found | Two Taks",
			description: "The collection you are looking for could not be found.",
		};
	}

	return {
		title: `${collection.title} | Two Taks`,
		description:
			collection.description ||
			"Browse our premium wellness products designed for optimal health and performance.",
	};
}

async function fetchData(handle: string, cursor: string | null) {
	const collections = await getCollections();

	const collection = await getCollection(handle);

	if (!collection) {
		return {
			collections,
			collection: null,
			products: [],
			pageInfo: {
				hasNextPage: false,
				hasPreviousPage: false,
				startCursor: "",
				endCursor: "",
			},
		};
	}

	const pageSize = 12;

	const { products, pageInfo } = await getProductsInCollection(
		handle,
		pageSize,
		cursor,
	);

	return {
		collections,
		collection,
		products,
		pageInfo,
	};
}

export default async function CollectionPage({
	params,
	searchParams,
}: CollectionPageParams) {
	const { handle } = await params;
	const resolvedSearchParams = await searchParams;

	const cursor =
		typeof resolvedSearchParams.cursor === "string"
			? resolvedSearchParams.cursor
			: null;
	const page =
		typeof resolvedSearchParams.page === "string"
			? parseInt(resolvedSearchParams.page, 10)
			: 1;
	const currentPage = isNaN(page) ? 1 : page;

	const { collections, collection, products, pageInfo } = await fetchData(
		handle,
		cursor,
	);

	if (!collection) {
		notFound();
	}

	return (
		<main className="container mx-auto px-6 pt-32 pb-24">
			<div className="text-center mb-16">
				<h1 className="text-4xl md:text-5xl font-heading-medium mb-4 text-neutral-900">
					{collection.title}
				</h1>
				{collection.description && (
					<p className="text-lg text-neutral-600 max-w-2xl mx-auto">
						{collection.description}
					</p>
				)}
			</div>

			<div className="flex flex-col lg:flex-row gap-12">
				<CollectionsSidebar collections={collections} activeCollection={handle} />

				<div className="flex-1">
					<ProductGrid
						products={products}
						pageInfo={pageInfo}
						basePath={`/shop/collections/${handle}`}
						currentPage={currentPage}
					/>
				</div>
			</div>
		</main>
	);
}
