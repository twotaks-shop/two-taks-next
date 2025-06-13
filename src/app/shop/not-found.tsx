"use client";

import Link from "next/link";

export default function NotFound() {
	return (
		<main className="container mx-auto px-4 py-32 flex flex-col items-center justify-center min-h-[60vh]">
			<h1 className="text-4xl md:text-5xl font-heading-medium mb-6 text-center">
				Product Not Found
			</h1>

			<p className="text-lg text-neutral-600 mb-12 text-center max-w-xl">
				We couldn&apos;t find the product or collection you&apos;re looking for. It
				might have been removed or is temporarily unavailable.
			</p>

			<Link
				href="/shop"
				className="bg-black text-white py-3 px-8 font-heading-medium transition-all duration-200 hover:bg-neutral-800"
			>
				Return to Shop
			</Link>
		</main>
	);
}
