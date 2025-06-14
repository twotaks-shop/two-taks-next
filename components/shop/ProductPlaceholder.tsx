"use client";

interface ProductPlaceholderProps {
	className?: string;
}

export default function ProductPlaceholder({
	className = "",
}: ProductPlaceholderProps) {
	return (
		<div
			className={`flex items-center justify-center bg-neutral-100 w-full h-full ${className}`}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="40"
				height="40"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="text-neutral-300"
			>
				<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
				<circle cx="9" cy="9" r="2" />
				<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
			</svg>
		</div>
	);
}
