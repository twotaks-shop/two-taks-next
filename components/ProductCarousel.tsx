"use client"

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { productCarouselConfig } from "../confg/productCarousel";

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	category: string;
	productUrl: string;
}

export function ProductCarousel({
	className = "",
}: {
	className?: string;
} = {}) {
	const products = productCarouselConfig;
	const [activeIndex, setActiveIndex] = useState(0);
	const [prevIndex, setPrevIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleDotClick = (index: number) => {
		if (isAnimating || index === activeIndex) return;

		setPrevIndex(activeIndex);
		setIsAnimating(true);
		setActiveIndex(index);

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			setIsAnimating(false);
		}, 350);
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const handleProductChange = (category: string) => {
		if (isAnimating) return;

		const selectedIndex = products.findIndex(
			(product) => product.category === category,
		);

		if (selectedIndex !== activeIndex && selectedIndex >= 0) {
			setPrevIndex(activeIndex);
			setIsAnimating(true);
			setActiveIndex(selectedIndex);

			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				setIsAnimating(false);
			}, 350);
		}
	};

	return (
		<section
			className={`flex flex-col items-center justify-center w-full max-w-screen-xl mx-auto px-4 sm:px-6 ${className}`}
		>
			<div className="flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
				{products.map((product, index) => (
					<div key={product.id}>
						<button
							className={`font-brand text-sm cursor-pointer font-medium tracking-[0.2em] ${activeIndex === index ? "text-gray-900" : "text-gray-300"} transition-colors duration-300 sm:text-sm md:text-base lg:text-lg hover:text-gray-600`}
							onClick={() => handleProductChange(product.category)}
							disabled={isAnimating}
						>
							{product.category}
						</button>
					</div>
				))}
			</div>

			<div className="w-full flex flex-col items-center md:mt-4 lg:flex-row lg:items-center lg:justify-center lg:gap-12 xl:gap-16 lg:mt-8">
				<div className="relative h-64 w-64 mx-auto overflow-hidden mt-8 mb-4 bg-white sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 xl:h-[450px] xl:w-[450px] lg:mb-0 lg:mt-0">
					{products.map((product, index) => (
						<div
							key={product.id}
							className={`absolute inset-0 w-full h-full ${
								index === activeIndex
									? `opacity-100 z-10 ${isAnimating ? "animate-cross-fade-in" : ""}`
									: index === prevIndex && isAnimating
										? `opacity-0 z-0 animate-cross-fade-out`
										: "opacity-0 z-0"
							}`}
						>
							<Image
								src={product.imageUrl}
								alt={product.name}
								fill
								sizes="(max-width: 768px) 100vw, 50vw"
								className="object-cover"
								priority={index === activeIndex}
							/>
						</div>
					))}
				</div>

				{/* Content container - right side on desktop */}
				<div className="flex flex-col items-center sm:max-w-md md:max-w-lg lg:items-start lg:flex-1 lg:max-w-[40%] lg:justify-center">
					<div className="flex justify-center space-x-2 mb-4 sm:space-x-2.5 md:space-x-3 md:mb-6 lg:justify-start">
						{products.map((product, index) => (
							<button
								key={product.id}
								onClick={() => handleDotClick(index)}
								className={`w-2 h-2 rounded-full transition-all duration-300 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 ${
									activeIndex === index
										? "bg-gray-900 w-4 sm:w-5 md:w-6"
										: "bg-gray-200 hover:bg-gray-300"
								}`}
								aria-label={`Go to slide ${index + 1}`}
								disabled={isAnimating}
							/>
						))}
					</div>

					<div className="w-full">
						<div className="flex justify-center lg:justify-start">
							<p className="text-2xl tracking-[0.15em] font-semibold uppercase font-brand sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl text-gray-900">
								{products[activeIndex].name}
							</p>
						</div>
					</div>

					<div className="w-full mt-4">
						<div className="flex flex-col justify-center lg:justify-start">
							<p className="text-brand text-sm text-center max-w-[65ch] text-balance font-normal leading-7 sm:text-base md:text-base lg:text-lg xl:text-xl sm:max-w-[70ch] md:max-w-[75ch] lg:max-w-full lg:text-left text-gray-500">
								{products[activeIndex].description}
							</p>
						</div>
					</div>

					<div className="mt-4 md:mt-6 lg:mt-8">
						<button className="font-brand uppercase tracking-[0.25em] text-sm bg-transparent text-gray-900 hover:bg-gray-900 hover:text-white py-3.5 px-10 cursor-pointer sm:py-3.5 sm:px-12 md:py-4 md:px-14 lg:py-4 lg:px-16 xl:py-4 xl:px-20 sm:text-sm lg:text-base transition-all duration-500 font-medium border border-gray-200">
							Experience
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
