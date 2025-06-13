import Image from "next/image";

interface BenefitItemProps {
	text: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ text }) => (
	<div className="flex items-center mb-2">
		<div className="text-black mr-2 flex-shrink-0">
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
		<p className="text-gray-700 font-medium text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
			{text}
		</p>
	</div>
);

export default function ProductShowcase({ className = "" }) {
	const benefits = [
		"Cognitive Nootropics",
		"Cellular Activators",
		"Super Mushrooms",
		"Legendary Adaptogens",
		"Sleep Inducers",
		"Super Antioxidants",
		"Hormone Regulators",
		"Energy Boosters",
	];

	return (
		<section
			className={`w-full bg-white py-7 px-4 sm:px-6 md:px-8 lg:py-24 overflow-hidden ${className}`}
		>
			<div className="max-w-screen-xl mx-auto">
				<div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-16 relative">
					<div className="w-full lg:w-1/2 xl:w-7/12 max-w-xl lg:max-w-none mx-auto px-4 sm:px-8 md:px-12 lg:px-0">
						<div className="flex items-center justify-center lg:justify-end relative">
							<div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-20 rounded-3xl"></div>
							<div className="absolute -inset-4 bg-gray-50 rounded-full opacity-30 blur-xl"></div>
							<Image
								src="/showcase/product-bottles.webp"
								alt="twotaks wellness products"
								className="w-full h-auto max-h-[450px] lg:max-h-[600px] xl:max-h-[850px] 2xl:max-h-[950px] object-contain relative z-10 drop-shadow-xl"
								width={900}
								height={900}
								priority
							/>
						</div>
					</div>
					<div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 opacity-20 pointer-events-none"></div>
					<div className="w-full lg:w-5/12 xl:w-4/12 mb-16 lg:mb-0 text-center lg:text-left relative z-10">
						<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-brand font-black tracking-tight text-gray-900 mb-6 leading-none">
							Unlock Your Potential
						</h2>

						<p className="text-lg md:text-xl text-gray-800 mb-6 font-medium max-w-2xl lg:max-w-none lg:mx-0 tracking-wide">
							Premium wellness for peak performance
						</p>

						<p className="text-base text-gray-600 mb-8 max-w-2xl lg:max-w-none lg:mx-0 leading-relaxed">
							Advanced formulas with adaptogens, antioxidants, and nootropics to
							enhance focus, energy, and balance.
						</p>

						<div className="mt-6 mb-8">
							<h3 className="text-lg font-brand font-bold mb-4 tracking-wide lg:text-left">
								What We Offer
							</h3>
							<div className="grid grid-cols-2 sm:grid-cols-2 gap-x-6 gap-y-1">
								{benefits.map((benefit, index) => (
									<BenefitItem key={index} text={benefit} />
								))}
							</div>
						</div>

						<button className="font-brand uppercase tracking-[0.25em] text-sm bg-black text-white hover:bg-gray-800 py-3 px-10 md:py-4 md:px-12 cursor-pointer transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
							Try it now
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
