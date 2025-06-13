"use client";

import React from "react";
import Image from "next/image";

export default function AboutUs({ className = "" }: { className?: string }) {
	return (
		<section
			className={`w-full bg-white py-16 sm:py-20 md:py-24 px-4 overflow-hidden ${className}`}
		>
			<div className="max-w-screen-xl mx-auto">
				<div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-16 relative">
					<div className="w-full lg:w-1/2 mb-8 lg:mb-0">
						<div className="relative rounded-xl overflow-hidden shadow-lg">
							<div className="absolute -inset-2 bg-gray-50 rounded-full opacity-30 blur-xl"></div>
							<div className="aspect-w-4 aspect-h-3 relative w-full h-[350px] sm:h-[450px] lg:h-[500px]">
								<Image
									src="/about-us/Two Taks Launch IMG 0958.jpg"
									alt="Two Taks team"
									fill
									sizes="(max-width: 768px) 100vw, 50vw"
									className="object-cover relative z-10"
									priority
								/>
							</div>
						</div>
					</div>

					<div className="w-full lg:w-1/2 text-center lg:text-left relative z-10">
						<h2 className="text-4xl sm:text-5xl md:text-6xl font-brand font-bold mb-6 tracking-tight text-gray-900 leading-none">
							About us
						</h2>
						<div className="space-y-4">
							<p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl lg:max-w-none mx-auto lg:mx-0">
								Step into a world where ordinary conversations spark extraordinary
								transformations. Discover how a simple question—Why not create our own
								path to peak performance?—led to the creation of Twotaks. With no
								compromises and only the finest ingredients, they crafted Super Brain to
								conquer their own challenges, unleashing pure power, real focus, and
								unmatched energy.
							</p>
							<p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl lg:max-w-none mx-auto lg:mx-0">
								But the journey didn't stop there. Realizing this was meant for
								everyone, they transformed their personal pursuit into a mission for all
								to experience. Dive into the origin of Twotaks and explore how you too
								can unleash your potential to BECOME A SUPER HUMAN.
							</p>
						</div>

						<div className="mt-8">
							<button className="font-brand uppercase tracking-[0.25em] text-sm bg-black text-white hover:bg-gray-800 py-3 px-10 md:py-4 md:px-12 cursor-pointer transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
								OUR STORY
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
