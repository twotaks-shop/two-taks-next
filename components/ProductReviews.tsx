import { REVIEWS } from '../const/reviews';

interface ReviewsProps {
	handle: string;
}

export function ProductReviews({ handle }: ReviewsProps) {
	const productReviews = REVIEWS.find((entry) => entry.handle === handle);

	if (!productReviews) {
		return null;
	}

	return (
		<section className="mt-20 container mx-auto px-6">
			<h2 className="text-3xl font-semibold mb-8 text-neutral-900">
				Customer Reviews
			</h2>
			<div className="space-y-8">
				{productReviews.reviews.map((review, index) => (
					<article
						key={index}
						className="p-6 border border-gray-200 rounded-md shadow-sm bg-white"
					>
						<h3 className="text-xl font-medium mb-2">{review.title}</h3>
						<p className="text-neutral-700 mb-4">{review.content}</p>
						<footer className="text-sm text-neutral-500">
							— {review.author}, {review.age}, {review.occupation}, {review.location}
						</footer>
					</article>
				))}
			</div>
		</section>
	);
}
