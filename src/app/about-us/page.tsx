"use client";

import React from "react";
import Image from "next/image";
import MainContentWrapper from "../../../components/MainContentWrapper";
import Link from "next/link";

export default function AboutUsPage() {
	return (
		<MainContentWrapper>
			<div className="pt-32 pb-24 mt-5">
				<div className="container mx-auto px-4 md:px-6">
					<div className="text-center mb-16">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading-bold">
							About us
						</h1>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading-bold">
							Two Founders. One Mission. Zero Compromises.
						</h1>
						<div className="w-24 h-1 bg-black mx-auto mb-8"></div>
						<p className="text-xl md:text-2xl text-neutral-700 max-w-3xl mx-auto font-heading-regular">
							We believe in creating supplements that unlock your superhuman potential.
						</p>
					</div>

					{/* Founders Images Section */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
						<div className="relative rounded-lg overflow-hidden group transition-all duration-300 shadow-lg hover:shadow-xl">
							<div className="aspect-[4/5] relative bg-neutral-100 overflow-hidden">
								{/* Replace with actual image of Jorge */}
								<Image
									src="/about-us/about-us-2.webp"
									alt="Twotaks"
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-105"
									sizes="(max-width: 768px) 100vw, 50vw"
								/>
							</div>
						</div>
						<div className="relative rounded-lg overflow-hidden group transition-all duration-300 shadow-lg hover:shadow-xl">
							<div className="aspect-[4/5] relative bg-neutral-100 overflow-hidden">
								<Image
									src="/about-us/about-us-1.jpg"
									alt="Twotaks"
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-105"
									sizes="(max-width: 768px) 100vw, 50vw"
								/>
							</div>
						</div>
					</div>

					{/* Story Section */}
					<div className="max-w-4xl mx-auto">
						<div className="prose prose-lg mx-auto">
							<p className="text-xl text-neutral-800 leading-relaxed mb-8">
								Jorge and Nicolás were working around the clock — building businesses,
								chasing goals, running on fumes. That&apos;s when they met a
								biochemist—someone who quickly became a close friend.
							</p>

							<p className="text-xl text-neutral-800 leading-relaxed mb-8">
								One day, over a casual conversation, they told him: &quot;Some days we feel
								exhausted. We need something that&apos;ll help us feel 100%.&quot;
							</p>

							<p className="text-xl text-neutral-800 leading-relaxed mb-8">
								He looked at them and said,{" "}
								<span className="italic">
									&quot;Why don&apos;t you just make your own supplements?&quot;
								</span>
							</p>

							<div className="my-16 text-center">
								<h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading-medium">
									So they did.
								</h2>
								<div className="w-16 h-1 bg-black mx-auto"></div>
							</div>

							<p className="text-xl text-neutral-800 leading-relaxed mb-8">
								They created Super Brain—not to sell, but to survive their own grind. No
								budget limits. No shortcuts. Just the best ingredients, because that&apos;s
								what they wanted in their own bodies.
							</p>

							<p className="text-xl text-neutral-800 leading-relaxed mb-8">
								The result?{" "}
								<span className="font-semibold">
									Pure power. Real focus. Unmatched energy.
								</span>
							</p>

							<p className="text-xl text-neutral-800 leading-relaxed mb-8">
								Soon they realized this shouldn&apos;t be just for them. It should be for
								everyone.
							</p>

							<div className="my-16 text-center">
								<h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading-medium">
									That&apos;s when Twotaks was born.
								</h2>
								<div className="w-16 h-1 bg-black mx-auto"></div>
							</div>

							<p className="text-2xl md:text-3xl font-bold text-center my-16">
								Because everyone deserves to BECOME A SUPER HUMAN.
							</p>
						</div>
					</div>

					{/* CTA Section */}
					<div className="mt-24 text-center bg-neutral-900 text-white py-16 px-4 rounded-xl">
						<h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading-medium">
							Ready to unlock your potential?
						</h2>
						<p className="text-xl mb-8 max-w-2xl mx-auto">
							Experience the difference that premium, science-backed supplements can
							make in your daily performance.
						</p>
						<Link
							href="/shop/collections/all-products"
							className="inline-block bg-white text-black py-3 px-8 rounded-full font-semibold text-lg hover:bg-neutral-100 transition-colors duration-200"
						>
							Shop Our Products
						</Link>
					</div>
				</div>
			</div>
		</MainContentWrapper>
	);
}
