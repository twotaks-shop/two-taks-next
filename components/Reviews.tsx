"use client";

import Image from "next/image";

type Review = {
	id: number;
	author: string;
	role: string;
	rating: number;
	text: string;
	avatarUrl: string;
	product: string;
};

export default function Reviews({ className = "" }: { className?: string }) {
	const reviews: Review[] = [
		{
			id: 1,
			author: "Sarah J.",
			role: "Fitness Instructor",
			rating: 5,
			text:
				"I've tried numerous wellness products over the years, but this is the first one that genuinely improved my energy levels without the crash. I feel more focused during my workouts and throughout the day.",
			avatarUrl:
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23D1D5DB'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08a7.2 7.2 0 0 1-6 3.22z'/%3E%3C/svg%3E",
			product: "Super Brain",
		},
		{
			id: 2,
			author: "Michael C.",
			role: "Software Engineer",
			rating: 5,
			text:
				"The cognitive benefits are real. I notice a significant difference in my ability to focus during long coding sessions. My productivity has increased and I don't feel mentally drained at the end of the day.",
			avatarUrl:
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23A1A1AA'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08a7.2 7.2 0 0 1-6 3.22z'/%3E%3C/svg%3E",
			product: "Super Brain",
		},
		{
			id: 3,
			author: "Emma R.",
			role: "Healthcare Professional",
			rating: 5,
			text:
				"As someone who works night shifts, getting quality sleep has always been a challenge. This has been a game-changer for my sleep schedule. I fall asleep faster and wake up feeling refreshed.",
			avatarUrl:
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23C7D2FE'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08a7.2 7.2 0 0 1-6 3.22z'/%3E%3C/svg%3E",
			product: "Super Sleep",
		},
		{
			id: 4,
			author: "David P.",
			role: "Marketing Executive",
			rating: 5,
			text:
				"This has been incredible for my overall well-being. I travel frequently for work and used to constantly feel run down. Since I started taking this, I've noticed a significant improvement in how I feel day to day.",
			avatarUrl:
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23E5E7EB'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08a7.2 7.2 0 0 1-6 3.22z'/%3E%3C/svg%3E",
			product: "Super Immune",
		},
	];

	const renderStars = (rating: number) => {
		return Array(5)
			.fill(0)
			.map((_, i) => (
				<svg
					key={i}
					className={`w-4 h-4 ${i < rating ? "text-gray-900" : "text-gray-300"}`}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
						clipRule="evenodd"
					/>
				</svg>
			));
	};

	return (
		<section
			className={`w-full bg-gray-50 py-16 sm:py-20 md:py-24 px-4 overflow-hidden ${className}`}
		>
			<div className="max-w-screen-xl mx-auto">
				<div className="text-center mb-12 relative">
					<div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gray-200 rounded-full"></div>
					<h2 className="text-3xl sm:text-4xl font-brand font-bold mb-4 tracking-tight text-gray-900">
						What Our Customers Say
					</h2>
					<p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
						Real stories from people who have incorporated our formulas into their
						daily routines.
					</p>
				</div>

				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 xl:grid-cols-4">
						{reviews.map((review) => (
							<div key={review.id} className="w-full">
								<div className="bg-white p-6 sm:p-8 h-full shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300">
									<div className="flex items-center mb-6">
										<div className="relative w-10 h-10 rounded-full overflow-hidden mr-4 border border-gray-100">
											{review.avatarUrl.startsWith("data:") ? (
												<div
													className="w-full h-full bg-gray-100"
													style={{
														backgroundImage: `url("${review.avatarUrl}")`,
														backgroundSize: "cover",
														backgroundPosition: "center",
													}}
												/>
											) : (
												<Image
													src={review.avatarUrl}
													alt={review.author}
													fill
													sizes="48px"
													className="object-cover"
												/>
											)}
										</div>
										<div>
											<p className="font-brand font-semibold text-gray-900">
												{review.author}
											</p>
											<p className="text-sm text-gray-500">{review.role}</p>
										</div>
										<div className="ml-auto">
											<p className="text-xs text-gray-500 italic">
												using <span className="font-medium">{review.product}</span>
											</p>
										</div>
									</div>

									<div className="flex mb-4">{renderStars(review.rating)}</div>

									<p className="text-gray-600 leading-relaxed text-balance">
										"{review.text}"
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
