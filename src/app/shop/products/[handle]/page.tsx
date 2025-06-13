import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProduct, shopifyClient } from "../../../../../lib/shopify";
import { ShopifyProduct } from "../../../../../lib/types";
import ProductCard from "../../../../../components/shop/ProductCard";
import AddToCartButton from "../../../../../components/shop/AddToCartButton";

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

async function fetchData(handle: string) {
	const product = await getProduct(handle);

	let relatedProducts: ShopifyProduct[] = [];
	try {
		const allProducts = await shopifyClient.product.fetchAll(8);

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

		relatedProducts = (allProducts as unknown as RawShopifyProduct[])
			.filter((p) => p.handle !== handle)
			.slice(0, 4)
			.map((product) => ({
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
	} catch (error) {
		console.error("Error fetching related products:", error);
	}

	return {
		product,
		relatedProducts,
	};
}

export default async function ProductPage({ params }: ProductPageParams) {
	const { handle } = await params;
	const { product, relatedProducts } = await fetchData(handle);

	if (!product) {
		notFound();
	}

	const variant = product.variants && product.variants[0];
	const price = variant && variant.price ? parseFloat(variant.price) : 0;
	const formattedPrice = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	}).format(price);

	const primaryImage = product.images[0];
	const imageSrc = primaryImage?.src || "/product-placeholder.jpg";
	const imageAlt = primaryImage?.altText || product.title;

	const additionalImages = product.images.slice(1);

	return (
		<main className="container mx-auto px-6 pt-32 pb-24">
			<div className="mb-8">
				<Link
					href="/shop"
					className="text-sm text-neutral-600 hover:text-black transition-colors font-heading-regular"
				>
					← Back to shop
				</Link>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
				<div className="space-y-4">
					<div className="relative aspect-square bg-neutral-50 rounded-lg overflow-hidden">
						<Image
							src={imageSrc}
							alt={imageAlt}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className="object-cover"
							priority
						/>
					</div>

					{additionalImages.length > 0 && (
						<div className="grid grid-cols-4 gap-2">
							{additionalImages.map((image, index) => (
								<div
									key={image.id || index}
									className="relative aspect-square bg-neutral-50 rounded-md overflow-hidden"
								>
									<Image
										src={image.src}
										alt={image.altText || `${product.title} view ${index + 2}`}
										fill
										sizes="(max-width: 768px) 25vw, 20vw"
										className="object-cover"
									/>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="flex flex-col">
					<h1 className="text-3xl lg:text-4xl font-heading-medium mb-6 text-neutral-900">
						{product.title}
					</h1>

					<div className="text-2xl font-heading-medium mb-8 text-neutral-900">
						{formattedPrice}
					</div>

					{product.descriptionHtml && (
						<div
							className="prose prose-neutral prose-sm max-w-none mb-8 text-neutral-700 leading-relaxed"
							dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
						/>
					)}

					<div className="mt-auto space-y-4">
						<AddToCartButton product={product} />

						<div className="text-sm text-neutral-500 space-y-2">
							<p>• Free shipping on orders over $75</p>
							<p>• 30-day satisfaction guarantee</p>
							<p>• Secure checkout</p>
						</div>
					</div>
				</div>
			</div>

			{relatedProducts.length > 0 && (
				<div className="mt-24 pt-12 border-t border-neutral-200">
					<h2 className="text-2xl font-heading-medium mb-8 text-neutral-900">
						You might also like
					</h2>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{relatedProducts.map((relatedProduct) => (
							<ProductCard key={relatedProduct.id} product={relatedProduct} />
						))}
					</div>
				</div>
			)}
		</main>
	);
}
