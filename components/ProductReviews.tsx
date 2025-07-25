import { useState } from "react";
import { REVIEWS } from "../const/reviews";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

interface ReviewsProps {
	handle: string;
}

export function ProductReviews({ handle }: ReviewsProps) {
	const [visibleReviews, setVisibleReviews] = useState(5);
	const productReviews = REVIEWS.find((entry) => entry.handle === handle);

	if (!productReviews) {
		return null;
	}

	const loadMore = () => {
		setVisibleReviews((prev) =>
			Math.min(prev + 4, productReviews.reviews.length),
		);
	};

	const renderStars = (index: number) => {
		const rating = (index % 4) + 4;
		return (
			<div className="flex mb-2">
				{[...Array(5)].map((_, i) => (
					<FaStar
						key={i}
						className={`${i < rating ? "text-amber-400" : "text-gray-100"} text-lg mr-0.5`}
					/>
				))}
			</div>
		);
	};

	return (
		<section className="container mx-auto px-6 md:mt-20">
			<h2 className="text-2xl md:text-3xl font-heading-bold mb-8 text-center">
				See Why Customers Call Us a Superhuman Experience
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
				{productReviews.reviews.slice(0, visibleReviews).map((review, index) => (
					<article
						key={index}
						className="p-7 bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] transition-shadow overflow-hidden relative"
					>
						<div className="mb-4">
							<div className="flex items-center mb-2">
								<span className="text-sm font-medium text-neutral-900">
									{review.author}
								</span>
							</div>
							{renderStars(index)}
						</div>

						{review?.image && (
							<div className="mb-4 w-full h-[200px]">
								<Image
									src={review.image}
									alt={review.title}
									width={100}
									height={100}
									className="rounded-lg object-fill object-center"
								/>
							</div>
						)}

						<h3 className="text-xl font-medium mb-3 text-neutral-900">
							{review.title}
						</h3>

						<p className="text-neutral-600 mb-12 leading-relaxed text-[15px]">
							{review.content}
						</p>

						<footer className="text-sm text-neutral-400 absolute bottom-7 left-7">
							{review.age}, {review.occupation}, {review.location}
						</footer>
					</article>
				))}
			</div>

			{visibleReviews < productReviews.reviews.length && (
				<div className="flex justify-center mt-12">
					<button
						onClick={loadMore}
						className="px-10 py-3 bg-neutral-800 text-white rounded-full hover:bg-neutral-900 transition-all duration-300 font-medium"
					>
						Load More Reviews
					</button>
				</div>
			)}
		</section>
	);
}
