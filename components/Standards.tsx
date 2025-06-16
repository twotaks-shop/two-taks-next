"use client";

import Image from "next/image";
import { standardsData } from "../confg/standards";
import { useRef } from "react";

type StandardItemProps = {
	icon: string;
	title: string;
};

const StandardItem = ({ icon, title }: StandardItemProps) => {
	return (
		<div className="flex flex-col items-center">
			<div className="w-37 h-37 sm:w-48 sm:h-48 relative mb-4 transition-transform duration-300 hover:scale-105">
				<Image
					src={icon}
					alt={title}
					fill
					sizes="(max-width: 640px) 160px, 176px"
					className="object-contain"
				/>
			</div>
			<p className="text-gray-500 text-lg sm:text-xl font-normal font-brand">
				{title}
			</p>
		</div>
	);
};

export function Standards() {
	const video1Ref = useRef<HTMLVideoElement>(null);
	const video2Ref = useRef<HTMLVideoElement>(null);

	return (
		<section className="py-16 md:py-24 px-4 bg-gray-50">
			<div className="container mx-auto max-w-6xl">
				<div className="text-center mb-12 md:mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-4 font-brand tracking-tight text-gray-900">
						Built Clean for Peak Performance
					</h2>
					<p className="text-2xl md:text-3xl text-gray-600 font-light">
						Superhuman standards only.
					</p>
					<p className="text-xl md:text-2xl text-gray-600 font-light mt-2">
						Clean. Powerful. Purposeful.
					</p>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-16 md:mb-20">
					{standardsData.map((standard) => (
						<StandardItem
							key={standard.id}
							icon={standard.icon}
							title={standard.title}
						/>
					))}
				</div>

				<div className="mt-16 text-center">
					<h3 className="text-2xl md:text-3xl font-heading-bold mb-4">
						Learn More About Our Process
					</h3>
					<p className="text-gray-600 max-w-2xl mx-auto mb-6">
						Watch these videos to discover how we create our high-quality products
					</p>

					<div className="mt-8">
						<div className="mt-10 grid md:grid-cols-2 gap-8">
							<div className="rounded-lg overflow-hidden">
								<div className="relative">
									<div className="w-full aspect-video bg-gray-200 relative overflow-hidden">
										<video
											ref={video1Ref}
											className="w-full aspect-video"
											controls
											playsInline
											poster="https://images.unsplash.com/photo-1581091877018-dac6a371d50f?q=80&w=2574&auto=format&fit=crop"
										>
											<source
												src="https://cdn.shopify.com/videos/c/o/v/51890e344c7247a6b4145afe1f1027ba.mov"
												type="video/mp4"
											/>
											Your browser does not support the video tag.
										</video>
									</div>
								</div>
								<div className="p-4 bg-white">
									<h3 className="text-xl font-semibold text-gray-900">
										Manufacturing Process
									</h3>
									<p className="text-gray-600 mt-2">
										See how our products are crafted with precision and care
									</p>
								</div>
							</div>

							<div className="rounded-lg overflow-hidden">
								<div className="relative">
									<div className="w-full aspect-video bg-gray-200 relative overflow-hidden">
										<video
											ref={video2Ref}
											className="w-full aspect-video"
											controls
											playsInline
											poster="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2670&auto=format&fit=crop"
										>
											<source
												src="https://cdn.shopify.com/videos/c/o/v/5441b095b0f54d83994e7b4f9e8df7b1.mov"
												type="video/mp4"
											/>
											Your browser does not support the video tag.
										</video>
									</div>
								</div>
								<div className="p-4 bg-white">
									<h3 className="text-xl font-semibold text-gray-900">
										Quality Ingredients
									</h3>
									<p className="text-gray-600 mt-2">
										Discover the premium ingredients that make our products exceptional
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Standards;
