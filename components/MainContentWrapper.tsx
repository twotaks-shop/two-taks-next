"use client";

import { ReactNode } from "react";
import { useCartStore } from "../lib/cart-store";

interface MainContentWrapperProps {
	children: ReactNode;
}

export default function MainContentWrapper({
	children,
}: MainContentWrapperProps) {
	const { isOpen } = useCartStore();

	return (
		<div className={`transition-all duration-300 ${isOpen ? "blur-sm" : ""}`}>
			{children}
		</div>
	);
}
