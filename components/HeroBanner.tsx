"use client";

import { useRef } from "react";
import useViewport from "../hooks/useViewport";
import Link from "next/link";

export default function HeroBanner() {
	const deviceType = useViewport();
	const isMobile = deviceType === "mobile";
	const videoRef = useRef<HTMLVideoElement>(null);

	return (
		<div className="relative w-full overflow-visible pt-16">
			<video
				ref={videoRef}
				className={`w-full ${isMobile ? "h-[100vh] object-cover" : "object-contain"} object-center`}
				autoPlay
				muted
				loop
				playsInline
				controls={false}
			>
				<source src="https://cdn.shopify.com/videos/c/o/v/3f4eec8e604a4cc48196b53bfca1ddfc.mov" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 w-[90%] md:w-[80%] lg:w-[70%]">
				<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 md:mb-4 shadow-text">
					We Don&apos;t Make Supplements.
					<br />
					We Make Superhumans.
				</h1>
				<p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white shadow-text mb-3 md:mb-6 px-2 md:px-6">
					What if the only thing standing between you and your superhuman potential…
					was you? Fuel your mind and body with natural supplements that power your
					focus, energy, immunity, and sleep.
				</p>
				<Link href="/shop/collections/all-products" className="bg-white hover:bg-gray-100 text-gray-800 text-sm sm:text-base font-semibold py-2 px-4 md:py-3 md:px-6 cursor-pointer shadow-md transition-all">
					Start Your Mission
				</Link>
			</div>
			{!isMobile && (
				<div className="absolute bottom-4 left-0 right-0 flex justify-center animate-bounce">
					<svg
						className="w-3.5 h-3.5 text-white"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
					</svg>
				</div>
			)}
		</div>
	);
}
