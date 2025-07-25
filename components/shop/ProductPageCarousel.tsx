import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface ProductImage {
	id: string;
	url: string;
	alt: string;
}

interface ProductPageCarouselProps {
	images: ProductImage[];
	aspect?: string;
	autoPlay?: boolean;
	interval?: number;
}

export default function ProductPageCarousel({
	images,
	aspect = "4/5",
	autoPlay = true,
	interval = 5000,
}: ProductPageCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isHovering, setIsHovering] = useState(false);

	useEffect(() => {
		if (!autoPlay || isHovering || images.length <= 1) return;

		const timer = setTimeout(() => {
			handleNext();
		}, interval);

		return () => clearTimeout(timer);
	}, [currentIndex, autoPlay, interval, isHovering, images.length]);

	const handlePrev = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1,
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1,
		);
	};

	if (!images || images.length === 0) {
		return (
			<div className="relative w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
				<span className="text-gray-500">No images available</span>
			</div>
		);
	}

	const aspectClasses: Record<string, string> = {
		"4/5": "aspect-[4/5]",
		"9/16": "aspect-[9/16]",
		"1/1": "aspect-square",
	};

	const aspectClass = aspectClasses[aspect] || "aspect-[4/5]";

	return (
		<div
			className="relative w-full overflow-hidden rounded-lg"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			{/* Main carousel */}
			<div className="relative w-full flex justify-center items-center overflow-hidden rounded-lg">
				<div className="relative w-full flex justify-center items-center min-h-[70vh] md:min-h-[700px]">
					<div className="absolute inset-0 w-full h-full overflow-hidden">
						{images.map((img, index) => (
							<motion.div
								key={img.id}
								initial={{ opacity: 0 }}
								animate={{
									opacity: index === currentIndex ? 1 : 0,
									zIndex: index === currentIndex ? 1 : 0,
								}}
								transition={{ duration: 0.5 }}
								className="absolute inset-0 w-full h-full flex justify-center items-center"
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
								}}
							>
								<div
									className={`relative w-full max-w-[500px] ${aspectClass} overflow-hidden rounded-lg bg-white flex justify-center items-center`}
								>
									<Image
										src={img.url}
										alt={img.alt}
										fill
										sizes="(max-width: 768px) 100vw, 80vw"
										className="object-covers object-center rounded-lg"
										priority={index === 0}
										quality={90}
									/>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>

			{images.length > 1 && (
				<>
					<button
						onClick={handlePrev}
						className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all z-10"
						aria-label="Previous image"
					>
						<FaChevronLeft size={20} />
					</button>
					<button
						onClick={handleNext}
						className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all z-10"
						aria-label="Next image"
					>
						<FaChevronRight size={20} />
					</button>
				</>
			)}
		</div>
	);
}
