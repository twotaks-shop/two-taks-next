"use client";

import Image from "next/image";
import Link from "next/link";
import { ShopifyProduct } from "../../lib/types";
import { PLACEHOLDER_IMAGE_URL } from "../../lib/const";

interface ProductCardProps {
	product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
	const firstImage = product.images[0];
	const imageUrl = firstImage ? firstImage.url : PLACEHOLDER_IMAGE_URL;
	const imageAlt = firstImage?.altText || product.title;

	// Get the first available variant
	const variant = product.variants?.[0];
	const price = variant?.price ? parseFloat(variant.price) : 0;
	const compareAtPrice = variant?.compareAtPrice
		? parseFloat(variant.compareAtPrice)
		: 0;
	const hasDiscount = compareAtPrice > 0 && compareAtPrice > price;

	const formattedPrice = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	}).format(price);

	const formattedCompareAtPrice = hasDiscount
		? new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
				minimumFractionDigits: 2,
			}).format(compareAtPrice)
		: null;

	const hasSubscription =
		product.sellingPlanGroups && product.sellingPlanGroups.length > 0;
	const subscriptionDiscount =
		hasSubscription &&
		product.sellingPlanGroups?.[0]?.sellingPlans?.[0]?.priceAdjustments?.[0]
			?.adjustmentValue?.percentage;

	return (
		<div className="group transition-all duration-300 hover:translate-y-[-4px]">
			<Link href={`/shop/products/${product.handle}`} className="block">
				<div className="relative aspect-[3/4] overflow-hidden bg-neutral-50 rounded-lg mb-4">
					<Image
						src={imageUrl}
						alt={imageAlt}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover transition-all duration-500 group-hover:scale-105"
					/>
				</div>

				<h3 className="text-base font-medium text-neutral-900 mb-2 group-hover:text-black">
					{product.title}
				</h3>

				<div className="space-y-1">
					<div className="flex items-center space-x-2">
						<p className="text-md text-neutral-900">{formattedPrice}</p>
						{hasDiscount && (
							<p className="text-sm text-neutral-500 line-through">
								{formattedCompareAtPrice}
							</p>
						)}
						{hasDiscount && (
							<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
								{Math.round((1 - price / compareAtPrice) * 100)}% OFF
							</span>
						)}
					</div>
					{hasSubscription && subscriptionDiscount && (
						<div className="flex items-center space-x-2">
							<span className="text-sm text-green-600 font-medium">
								Subscribe & Save {Math.round(subscriptionDiscount)}%
							</span>
							<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
								{new Intl.NumberFormat("en-US", {
									style: "currency",
									currency: "USD",
								}).format(price * (1 - subscriptionDiscount / 100))}
							</span>
						</div>
					)}
				</div>
			</Link>
		</div>
	);
}
