"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShopifyProduct } from "../../lib/types";
import { useCartStore } from "../../lib/cart-store";

interface ProductCardProps {
	product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
	const { addItem } = useCartStore();

	const firstImage = product.images[0];
	const imageUrl = firstImage ? firstImage.src : "/product-placeholder.jpg";
	const imageAlt = firstImage?.altText || product.title;

	const variant = product.variants && product.variants[0];
	const price = variant && variant.price ? parseFloat(variant.price) : 0;
	const formattedPrice = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	}).format(price);

	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (variant) {
			addItem({
				id: product.id,
				variantId: variant.id,
				productId: product.id,
				title: product.title,
				price: price,
				image: imageUrl,
				handle: product.handle,
			});
		}
	};

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

					<button
						onClick={handleAddToCart}
						className="absolute top-3 right-3 w-6 h-6 bg-black bg-opacity-80 text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
						aria-label="Add to cart"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="12" y1="5" x2="12" y2="19" />
							<line x1="5" y1="12" x2="19" y2="12" />
						</svg>
					</button>
				</div>

				<h3 className="text-base font-medium text-neutral-900 mb-2 group-hover:text-black">
					{product.title}
				</h3>

				<p className="text-md  text-neutral-900">
					{formattedPrice}
				</p>
			</Link>
		</div>
	);
}
