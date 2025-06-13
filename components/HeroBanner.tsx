"use client";

import { useRef } from "react";
import useViewport from "../hooks/useViewport";

export default function HeroBanner() {
	const deviceType = useViewport();
	const isMobile = deviceType === "mobile";
	const videoRef = useRef<HTMLVideoElement>(null);

	return (
		<div className="relative w-full overflow-visible pt-16">
			<video
				ref={videoRef}
				className="w-full object-contain object-center"
				autoPlay
				muted
				loop
				playsInline
				controls={false}
			>
				<source src="/banner/TwoTaks-Racional-V3_1.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			{!isMobile && (
				<div className="absolute bottom-4 left-0 right-0 flex justify-center animate-bounce">
					<svg
						className="w-3.5 h-3.5 text-white"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
					</svg>
				</div>
			)}
		</div>
	);
}
