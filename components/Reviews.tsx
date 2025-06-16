"use client";

import { useState, useEffect, useRef } from "react";

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
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const carouselRef = useRef<HTMLDivElement>(null);
	const autoplayRef = useRef<NodeJS.Timeout | null>(null);

	const reviews: Review[] = [
		{
			id: 1,
			author: "Jenna L.",
			role: "30, remote project manager",
			rating: 5,
			text:
				"I stopped doomscrolling at work thanks to Super Brain. I used to open my laptop and lose myself in random tabs. After adding this to my routine, I can sit, focus, and actually finish things without forcing it. It feels good to be in control again.",
			avatarUrl:
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23D1D5DB'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08a7.2 7.2 0 0 1-6 3.22z'/%3E%3C/svg%3E",
			product: "Super Brain",
		},
		{
			id: 2,
			author: "Brian S.",
			role: "35, architect",
			rating: 5,
			text:
				"Finally, peace at bedtime with Super Sleep. I used to overthink every night and wake up drained. Super Sleep helps me wind down naturally — now bedtime feels like peace, not a battle.",
			avatarUrl:
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23A1A1AA'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08a7.2 7.2 0 0 1-6 3.22z'/%3E%3C/svg%3E",
			product: "Super Sleep",
		},
		{
			id: 3,
			author: "Melissa H.",
			role: "38, HR manager & mom of two",
			rating: 5,
			text:
				"Staying healthy around sick kids? Super Immune helped. With two kids and constant germs, I was bracing for the worst. But since I started Super Immune, I stayed healthy the whole season. Total lifesaver.",
			avatarUrl:
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23C7D2FE'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08a7.2 7.2 0 0 1-6 3.22z'/%3E%3C/svg%3E",
			product: "Super Immune",
		},
		{
			id: 4,
			author: "Aiden M.",
			role: "41, filmmaker",
			rating: 5,
			text:
				"Super Bundle helped me feel like myself again. I was stuck on autopilot — tired, unfocused, drained. Super Bundle gave me real energy, deep sleep, and mental clarity. Now I move through the day like me again.",
			avatarUrl:
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23E5E7EB'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08a7.2 7.2 0 0 1-6 3.22z'/%3E%3C/svg%3E",
			product: "Super Bundle",
		},
		{
			id: 5,
			author: "Chris D.",
			role: "29, marketing analyst & weekend hiker",
			rating: 5,
			text:
				"I actually enjoy my mornings now. Before Super Morning, I was the guy who needed two alarms, a triple shot of espresso, and still felt foggy. Now I wake up, take it, and 20 minutes later I'm walking the dog with a podcast on, already planning my day. It's a simple switch, but it changed the whole tone of my mornings.",
			avatarUrl:
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23D1D5DB'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08a7.2 7.2 0 0 1-6 3.22z'/%3E%3C/svg%3E",
			product: "Super Morning",
		},
		{
			id: 6,
			author: "Carlos M.",
			role: "32, digital marketer",
			rating: 5,
			text:
				"Work feels easier with Super Brain in my routine. I used to waste hours jumping between tabs. Now I sit, focus, and knock things out like a machine. This nootropic really sharpened my mind.",
			avatarUrl:
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23A1A1AA'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08a7.2 7.2 0 0 1-6 3.22z'/%3E%3C/svg%3E",
			product: "Super Brain",
		},
		{
			id: 7,
			author: "Emily P.",
			role: "34, therapist & night owl",
			rating: 5,
			text:
				"Super Sleep helped me finally rest, not just lie down. For years I struggled with racing thoughts at bedtime. I'd scroll, overthink, and wake up groggy. With Super Sleep, I'm finally enjoying deep, uninterrupted rest. I wake up clear-headed, not cranky. This changed everything.",
			avatarUrl:
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23C7D2FE'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08a7.2 7.2 0 0 1-6 3.22z'/%3E%3C/svg%3E",
			product: "Super Sleep",
		},
		{
			id: 8,
			author: "Trevor B.",
			role: "35, personal trainer",
			rating: 5,
			text:
				"Getting out of bed doesn't suck anymore. Waking up used to feel like a battle. Now, I'm alert within minutes and don't even need three cups of coffee.",
			avatarUrl:
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23E5E7EB'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08a7.2 7.2 0 0 1-6 3.22z'/%3E%3C/svg%3E",
			product: "Super Morning",
		},
		{
			id: 9,
			author: "Danielle K.",
			role: "37, kindergarten teacher",
			rating: 5,
			text:
				"I've stayed healthy all season — no joke. Flu season hit hard at the office, but I stayed healthy and strong. I didn't expect to feel this resilient, but it's been months and I haven't looked back.",
			avatarUrl:
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23D1D5DB'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08a7.2 7.2 0 0 1-6 3.22z'/%3E%3C/svg%3E",
			product: "Super Immune",
		},
		{
			id: 10,
			author: "Ryan C.",
			role: "34, dad of 2 & consultant",
			rating: 5,
			text:
				"I didn't expect Super Bundle to change so much. No joke, I've never felt more in sync. My energy, focus, sleep, and even mood are on another level. Using the full Super Bundle felt like hitting reset on my body — but in the best, most sustainable way.",
			avatarUrl:
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23A1A1AA'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08a7.2 7.2 0 0 1-6 3.22z'/%3E%3C/svg%3E",
			product: "Super Bundle",
		},
		{
			id: 11,
			author: "Maya T.",
			role: "25, law student",
			rating: 5,
			text:
				"I'm surviving finals without losing my mind. Studying used to wreck my brain — I couldn't concentrate and ended up doomscrolling. Now I lock in, retain more, and actually feel confident.",
			avatarUrl:
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23C7D2FE'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08a7.2 7.2 0 0 1-6 3.22z'/%3E%3C/svg%3E",
			product: "Super Brain",
		},
		{
			id: 12,
			author: "Tasha M.",
			role: "42, nurse + mom",
			rating: 5,
			text:
				"Super Sleep gave me the rest I forgot was possible. I thought decent sleep was impossible with three kids. But now I get actual rest, and it shows — in my mood, my patience, my day.",
			avatarUrl:
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23E5E7EB'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08a7.2 7.2 0 0 1-6 3.22z'/%3E%3C/svg%3E",
			product: "Super Sleep",
		},
		{
			id: 13,
			author: "Jessie W.",
			role: "33, travel photographer",
			rating: 5,
			text:
				"I don't get sick after flying anymore. I used to get sick after every flight. Since I started packing Super Immune, my trips are smoother and my body feels protected. Even after long flights and bad sleep, I stay strong.",
			avatarUrl:
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23D1D5DB'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08a7.2 7.2 0 0 1-6 3.22z'/%3E%3C/svg%3E",
			product: "Super Immune",
		},
		{
			id: 14,
			author: "Eli J.",
			role: "29, barista & grad student",
			rating: 5,
			text:
				"I stay sharp all day now — no crashes. By 3PM, I'd usually crash hard — brain fog, no focus, zero motivation. Super Brain keeps me alert and productive all day. I can work smarter, not harder.",
			avatarUrl:
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23A1A1AA'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08a7.2 7.2 0 0 1-6 3.22z'/%3E%3C/svg%3E",
			product: "Super Brain",
		},
		{
			id: 15,
			author: "Marissa J.",
			role: "35, freelance designer",
			rating: 5,
			text:
				"Bedtime is actually something I look forward to now. I'd lie awake overthinking every night. Now, I fall asleep easily and wake up refreshed. It changed everything.",
			avatarUrl:
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23C7D2FE'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08a7.2 7.2 0 0 1-6 3.22z'/%3E%3C/svg%3E",
			product: "Super Sleep",
		},
	];

	const reviewsPerSlide = 3;
	const numSlides = Math.ceil(reviews.length / reviewsPerSlide);

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

	const goToSlide = (slideIndex: number) => {
		if (isAnimating) return;
		setIsAnimating(true);
		setCurrentSlide(slideIndex);
		resetAutoplayTimer();
	};

	const nextSlide = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setCurrentSlide((prev) => (prev === numSlides - 1 ? 0 : prev + 1));
		resetAutoplayTimer();
	};

	const resetAutoplayTimer = () => {
		if (autoplayRef.current) {
			clearTimeout(autoplayRef.current);
		}
		autoplayRef.current = setTimeout(() => {
			nextSlide();
		}, 8000);
	};

	useEffect(() => {
		resetAutoplayTimer();
		return () => {
			if (autoplayRef.current) {
				clearTimeout(autoplayRef.current);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const handleTransitionEnd = () => {
			setIsAnimating(false);
		};

		const carouselElement = carouselRef.current;
		if (carouselElement) {
			carouselElement.addEventListener("transitionend", handleTransitionEnd);
		}

		return () => {
			if (carouselElement) {
				carouselElement.removeEventListener("transitionend", handleTransitionEnd);
			}
		};
	}, []);

	const renderReviewCard = (review: Review) => (
		<div key={review.id} className="h-full">
			<div className="bg-white h-full p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300">
				<div className="flex items-center mb-4">
					<div>
						<p className="font-semibold text-gray-900">{review.author}</p>
						<p className="text-sm text-gray-500">{review.role}</p>
					</div>
					<div className="ml-auto">
						<p className="text-xs text-gray-500 italic">
							using <span className="font-medium">{review.product}</span>
						</p>
					</div>
				</div>

				<div className="flex mb-4">{renderStars(review.rating)}</div>

				<p className="text-gray-600 leading-relaxed">{review.text}</p>
			</div>
		</div>
	);

	return (
		<section
			className={`w-full bg-gray-50 py-16 sm:py-20 md:py-24 px-4 overflow-hidden ${className}`}
		>
			<div className="max-w-screen-xl mx-auto">
				<div className="text-center mb-12 relative">
					<div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gray-200 rounded-full"></div>
					<h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-gray-900">
						What Our Customers Say
					</h2>
					<p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
						Real stories from people who have incorporated our formulas into their
						daily routines.
					</p>
				</div>

				<div className="relative max-w-screen-xl mx-auto">
					<div className="overflow-hidden">
						<div
							ref={carouselRef}
							className="flex transition-transform duration-500 ease-in-out"
							style={{
								transform: `translateX(-${currentSlide * 100}%)`,
							}}
						>
							{Array.from({ length: numSlides }).map((_, slideIndex) => (
								<div key={slideIndex} className="w-full flex-shrink-0 px-4">
									<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
										{reviews
											.slice(
												slideIndex * reviewsPerSlide,
												(slideIndex + 1) * reviewsPerSlide,
											)
											.map((review) => renderReviewCard(review))}
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="flex justify-center mt-10 space-x-2">
						{Array.from({ length: numSlides }).map((_, index) => (
							<button
								key={index}
								onClick={() => goToSlide(index)}
								className={`w-4 h-4 rounded-full transition-all duration-200 ${
									currentSlide === index
										? "bg-gray-800 w-8"
										: "bg-gray-300 hover:bg-gray-400"
								}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
