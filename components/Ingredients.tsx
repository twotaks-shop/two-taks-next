"use client";

import Image from "next/image";

export default function Ingredients({
	className = "",
}: {
	className?: string;
}) {
	const ingredientImages = [
		"/ingredients/Coenzima-Q-10.png",
		"/ingredients/Extracto-de-Rhodiola.png",
		"/ingredients/Hongo-Reishi.png",
		"/ingredients/Mask-group.png",
		"/ingredients/nw_Extracto-de-Bacopa.webp",
		"/ingredients/nw_Glicinato-de-Magnesio.webp",
	];

	const fallbackImage = "/ingredients/ingredients_fallback.webp";

	const imagePositions = [
		{ top: "5%", left: "10%", size: 80 },
		{ top: "15%", right: "12%", size: 100 },
		{ top: "30%", left: "5%", size: 90 },
		{ bottom: "20%", left: "15%", size: 70 },
		{ bottom: "10%", right: "10%", size: 110 },
		{ bottom: "30%", right: "15%", size: 85 },
	];

	return (
		<section
			className={`relative w-full pb-20 py-2 p-4 overflow-hidden ${className}`}
		>
			<div className="md:hidden mb-8 w-full max-w-xs mx-auto">
				<div className="relative w-full h-78">
					<Image
						src={fallbackImage}
						alt="Ingredients"
						fill
						sizes="(max-width: 768px) 100vw"
						className="object-fill"
					/>
				</div>
			</div>

			<div className="hidden md:block">
				{ingredientImages.map((src, index) => {
					const position = imagePositions[index % imagePositions.length];
					return (
						<div
							key={index}
							className="absolute pointer-events-none"
							style={{
								...position,
								zIndex: 1,
							}}
						>
							<div
								className="relative rounded-full overflow-hidden shadow-lg"
								style={{
									width: position.size,
									height: position.size,
								}}
							>
								<Image
									src={src}
									alt={`Ingredient ${index + 1}`}
									fill
									sizes="(max-width: 768px) 33vw, 20vw"
									className="object-cover"
								/>
							</div>
						</div>
					);
				})}
			</div>

			<div className="relative z-10 max-w-3xl mx-auto text-center">
				<h2 className="text-3xl sm:text-4xl lg:text-5xl font-brand font-bold mb-4 tracking-tight text-gray-900">
					The Science of Feeling Superhuman
				</h2>

				<p className="text-xl sm:text-2xl font-brand font-medium text-gray-700 mb-6">
					Backed by nature. Verified by science. Built for unstoppable humans.
				</p>

				<p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
						At Twotaks, every ingredient is hand-picked to deliver real, measurable impact.
	We don&apos;t just throw powerful extracts into a capsule — we design formulas where each component works better together.
				</p>
				<ul className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto  pl-6 list-none">
					<li>•⁠ Adaptogens like Rhodiola and Cordyceps</li>
					<li>•⁠ Focus boosters like TeaCrine and Alpha GPC</li>
					<li>•⁠ Cellular protectors like Astaxanthin and PQQ</li>
				</ul>
				<p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
					This synergy is what makes our supplements next-level. You&apos;ll feel the difference.
				</p>

				<button className="font-brand uppercase tracking-[0.25em] text-sm bg-transparent text-gray-900 hover:bg-gray-900 hover:text-white py-3.5 px-10 cursor-pointer sm:py-3.5 sm:px-12 md:py-4 md:px-14 lg:py-4 lg:px-16 xl:py-4 xl:px-20 sm:text-sm lg:text-base transition-all duration-500 font-medium border border-gray-200">
					Meet our ingredients
				</button>
			</div>
		</section>
	);
}
