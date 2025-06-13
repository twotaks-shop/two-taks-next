"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "../../lib/cart-store";

export default function CartIcon() {
	const { toggleCart, getTotalItems } = useCartStore();
	const [totalItems, setTotalItems] = useState(0);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		setTotalItems(getTotalItems());
	}, [getTotalItems]);

	const items = useCartStore((state) => state.items);

	useEffect(() => {
		if (mounted) {
			setTotalItems(getTotalItems());
		}
	}, [items, mounted, getTotalItems]);

	if (!mounted) {
		return (
			<button
				className="flex items-center justify-center h-10 w-10 transition-colors duration-200 hover:bg-neutral-100 rounded-full relative"
				aria-label="Shopping cart"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="8" cy="21" r="1" />
					<circle cx="19" cy="21" r="1" />
					<path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
				</svg>
			</button>
		);
	}

	return (
		<button
			onClick={toggleCart}
			className="flex items-center justify-center h-10 w-10 transition-colors duration-200 hover:bg-neutral-100 rounded-full relative"
			aria-label="Shopping cart"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="8" cy="21" r="1" />
				<circle cx="19" cy="21" r="1" />
				<path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
			</svg>
			{totalItems > 0 && (
				<span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-heading-medium">
					{totalItems}
				</span>
			)}
		</button>
	);
}
