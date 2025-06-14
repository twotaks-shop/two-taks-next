import { Metadata } from "next";
import { getProduct } from "../../../../../lib/shopify";
import ProductPageClient from "./ProductPageClient";

interface ProductPageParams {
	params: Promise<{
		handle: string;
	}>;
}

export async function generateMetadata({
	params,
}: ProductPageParams): Promise<Metadata> {
	const { handle } = await params;
	const product = await getProduct(handle);

	if (!product) {
		return {
			title: "Product Not Found | Two Taks",
			description: "The product you are looking for could not be found.",
		};
	}

	return {
		title: `${product.title} | Two Taks`,
		description: product.description || "Premium wellness product by Two Taks",
	};
}

export default async function ProductPage({ params }: ProductPageParams) {
	const { handle } = await params;

	return <ProductPageClient handle={handle} />;
}
