import { Metadata } from "next";
import { getCollections, getProductsInCollection } from "../../../lib/shopify";
import { ShopifyProduct, PaginationInfo } from "../../../lib/types";
import CollectionsSidebar from "../../../components/shop/CollectionsSidebar";
import ProductGrid from "../../../components/shop/ProductGrid";

export const metadata: Metadata = {
	title: "Shop | Two Taks",
	description:
		"Browse our premium wellness products designed for optimal health and performance.",
};

interface ShopPageProps {
	searchParams: Promise<{
		page?: string;
		cursor?: string;
	}>;
}

async function fetchData() {
	const collections = await getCollections();

	const pageSize = 12;

	let products: ShopifyProduct[] = [];
	let pageInfo: PaginationInfo = {
		hasNextPage: false,
		hasPreviousPage: false,
		startCursor: "",
		endCursor: "",
	};

	try {
		if (collections.length > 0) {
			const result = await getProductsInCollection(
				collections[0].handle,
				pageSize,
			);
			products = result.products;
			pageInfo = result.pageInfo;
		}
	} catch (error) {
		console.error("Error fetching all products:", error);
	}

	return {
		collections,
		products,
		pageInfo,
	};
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
	const { collections, products, pageInfo } = await fetchData();
	const { page: pageParam } = await searchParams;

	const page = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;
	const currentPage = isNaN(page) ? 1 : page;

	return (
		<main className="container mx-auto px-6 pt-32 pb-24">
			<div className="text-center mb-16">
				<h1 className="text-4xl md:text-5xl font-heading-medium mb-4 text-neutral-900">
					Shop
				</h1>
				<p className="text-lg text-neutral-600 max-w-2xl mx-auto">
					Discover our premium wellness products designed for optimal health and
					performance
				</p>
			</div>

			<div className="flex flex-col lg:flex-row gap-12">
				<CollectionsSidebar collections={collections} activeCollection={null} />

				<div className="flex-1">
					<ProductGrid
						products={products}
						pageInfo={pageInfo}
						basePath="/shop"
						currentPage={currentPage}
						title="All Products"
					/>
				</div>
			</div>
		</main>
	);
}
