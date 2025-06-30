"use client";

import Image from "next/image";
import Link from "next/link";
import { bundleShowcase } from "../confg/bundleShowcase";

export default function BundleShowcase({ className }: { className?: string }) {
	const product = bundleShowcase[0];

	return (
		<section
			className={`flex flex-col items-center justify-center w-full max-w-screen-xl mx-auto px-4 sm:px-6 ${className} mb-24`}
		>
			<div className="w-full flex flex-col items-center lg:flex-row lg:items-center lg:justify-center lg:gap-12 xl:gap-16">
				<div className="relative h-64 w-64 mx-auto overflow-hidden mt-8 mb-4 bg-white sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 xl:h-[450px] xl:w-[450px] lg:mb-0 lg:mt-0">
					<Image
						src={product.imageUrl}
						alt={product.name}
						fill
						sizes="(max-width: 768px) 100vw, 50vw"
						className="object-cover"
						priority
					/>
				</div>

				<div className="flex flex-col items-center sm:max-w-md md:max-w-lg lg:items-start lg:flex-1 lg:max-w-[40%] lg:justify-center">
					<div className="w-full">
						<div className="flex justify-center lg:justify-start">
							<p className="text-2xl tracking-[0.15em] font-semibold uppercase font-brand sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl text-gray-900">
								{product.name}
							</p>
						</div>
					</div>

					<div className="w-full mt-4">
						<div className="flex flex-col justify-center lg:justify-start">
							<p className="text-brand text-sm text-center max-w-[65ch] text-balance font-normal leading-7 sm:text-base md:text-base lg:text-lg xl:text-xl sm:max-w-[70ch] md:max-w-[75ch] lg:max-w-full lg:text-left text-gray-500 whitespace-pre-line">
								{product.description}
							</p>
						</div>
					</div>

					<div className="mt-4 md:mt-6">
						<div className="flex justify-center w-full lg:justify-start">
							<Link
								href={product.productUrl}
								className="font-brand uppercase tracking-[0.25em] text-sm bg-black text-white hover:bg-gray-800 py-3 px-10 md:py-4 md:px-12 cursor-pointer transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
							>
								Try it now
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
