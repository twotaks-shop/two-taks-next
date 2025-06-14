"use client";

import { useCartStore } from "../../lib/cart-store";
import { PLACEHOLDER_IMAGE_URL } from "../../lib/const";

interface AddToCartButtonProps {
	product: {
		id: string;
		title: string;
		handle: string;
		images: Array<{
			id: string;
			src: string;
			altText: string | null;
		}>;
		variants: Array<{
			id: string;
			title: string;
			price: string;
			available: boolean;
		}>;
	};
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
	const { addItem } = useCartStore();

	const handleAddToCart = () => {
		const variant = product.variants && product.variants[0];
		const price = variant && variant.price ? parseFloat(variant.price) : 0;
		const primaryImage = product.images[0];
		const imageUrl = primaryImage?.src || PLACEHOLDER_IMAGE_URL;

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
		<button
			onClick={handleAddToCart}
			className="w-full bg-black text-white py-3 px-6 font-heading-medium rounded-md transition-all duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
		>
			Add to Cart
		</button>
	);
}
