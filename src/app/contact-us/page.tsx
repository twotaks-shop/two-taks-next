import Image from "next/image";
import Link from "next/link";

export default function ContactUsPage() {
	return (
		<div className="max-w-screen-xl mx-auto mt-6 px-4 pt-20 pb-12 sm:px-6 lg:px-8 lg:pt-28 lg:pb-16">
			<h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
				Tell us what’s on your mind — We’ll actually reply
			</h1>
			
			<div className="aspect-video relative rounded-lg bg-neutral-100 overflow-hidden mt-10">
				<Image
					src="/contact-us.png"
					alt="Contact Us. Two Taks Team"
					fill
					className="object-cover transition-transform duration-500 group-hover:scale-105"
					quality={100}
				/>
			</div>

			<div className="mt-10">
				<p className="text-2xl">
					Questions, brilliant ideas, love notes, or even existential confusion…
				</p>
				<p className="text-2xl">
					We love hearing from you (and yes, we actually reply).
				</p>
				<p className="text-2xl">We can’t read minds yet…</p>
				<p className="text-2xl">but we do answer emails.</p>
			</div>

			<div className="mt-4">
				<p>
					<span className="font-semibold">Email:</span> costumerservice@twotaks.com
				</p>
				<p>
					<span className="font-semibold">Call us:</span> +1 305 398 9294
				</p>

				<div className="flex gap-5 mt-10">
					<Link
						href="mailto:info@twotaks.com"
						className="flex items-center justify-center space-x-2 px-5 py-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-300"
					>
						<span>Send a cool email</span>
						<svg
							className="w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
							<polyline points="22,6 12,13 2,6"></polyline>
						</svg>
					</Link>

					<Link
						href="tel:%20+1%20305%20399%209294%20"
						className="flex items-center justify-center space-x-2 px-5 py-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-300"
					>
						<span>Text us with no fear</span>
						<svg
							className="w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
						</svg>
					</Link>
				</div>
			</div>
		</div>
	);
}
