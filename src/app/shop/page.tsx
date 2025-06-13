import { Metadata } from "next";
import { getCollections, shopifyClient } from "../../../lib/shopify";
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
		const allProducts = await shopifyClient.product.fetchAll(pageSize);

		interface RawShopifyImage {
			id: string;
			src: string;
			altText: string | null;
		}

		interface RawShopifyVariant {
			id: string;
			title: string;
			price: {
				amount: string;
			};
			availableForSale: boolean;
		}

		interface RawShopifyProduct {
			id: string;
			title: string;
			handle: string;
			description: string;
			descriptionHtml: string;
			images: RawShopifyImage[];
			variants: RawShopifyVariant[];
		}

		products = (allProducts as unknown as RawShopifyProduct[]).map((product) => ({
			id: product.id,
			title: product.title,
			handle: product.handle,
			description: product.description || "",
			descriptionHtml: product.descriptionHtml || "",
			images: product.images.map((image) => ({
				id: image.id || "",
				src: image.src,
				altText: image.altText || null,
			})),
			variants: product.variants.map((variant) => ({
				id: variant.id,
				title: variant.title,
				price: variant.price?.amount || "0",
				available: variant.availableForSale || false,
			})),
		}));

		pageInfo = {
			hasNextPage: products.length === pageSize,
			hasPreviousPage: false,
			startCursor: "",
			endCursor: "",
		};
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
