"use client";

import { useRef } from "react";
import useViewport from "../hooks/useViewport";

export default function HeroBanner() {
	const deviceType = useViewport();
	const isMobile = deviceType === "mobile";
	const videoRef = useRef<HTMLVideoElement>(null);

	return (
		<div
			className={`relative w-full overflow-hidden ${
				isMobile ? "h-[42vh] sm:h-[37vh] md:h-[32vh]" : "h-screen max-h-[900px]"
			}`}
		>
			<video
				ref={videoRef}
				className="absolute top-0 left-0 w-full h-full object-cover object-center"
				autoPlay
				muted
				loop
				playsInline
				controls={isMobile}
			>
				<source src="/banner/TwoTaks-Racional-V3_1.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<div
				className={`absolute top-0 left-0 w-full h-full ${isMobile ? "bg-black/5" : "bg-black/10"} z-10`}
			></div>
		</div>
	);
}
