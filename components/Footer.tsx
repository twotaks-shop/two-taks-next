"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer({ className = "" }: { className?: string }) {
	return (
		<footer className={`w-full pt-12 sm:pt-16 pb-8 px-4 ${className}`}>
			<div className="max-w-screen-xl mx-auto">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
					<div className="mb-8 md:mb-0 w-full md:w-auto">
						<h2 className="text-3xl sm:text-4xl font-brand font-bold text-gray-900 mb-2">
							Stay tuned!
						</h2>
						<p className="text-3xl sm:text-4xl font-brand font-bold text-gray-900 mb-6 sm:mb-8">
							Join our community
						</p>

						<div className="flex flex-col sm:flex-row gap-4">
							<Link
								href="/contact"
								className="flex items-center justify-center space-x-2 px-5 py-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-300"
							>
								<span>Email</span>
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
								href="/contact"
								className="flex items-center justify-center space-x-2 px-5 py-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-300"
							>
								<span>Call us</span>
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

					<div className="flex flex-row md:flex-col justify-between w-full md:w-auto md:items-end md:space-y-4">
						<div className="flex space-x-6 md:space-x-4">
							<Link
								href="https://instagram.com"
								aria-label="Instagram"
								className="hover:opacity-80 transition-opacity"
							>
								<svg
									className="w-6 h-6"
									viewBox="0 0 24 24"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
								</svg>
							</Link>

							<Link
								href="https://tiktok.com"
								aria-label="TikTok"
								className="hover:opacity-80 transition-opacity"
							>
								<svg
									className="w-6 h-6"
									viewBox="0 0 24 24"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M12.53.02C13.84 0 15.14.01 16.44.02c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
								</svg>
							</Link>
						</div>

						<div className="flex flex-col items-center md:items-end mt-4 md:mt-2">
							<Image
								src="/twotaks-logo.png"
								alt="Twotaks Logo"
								width={150}
								height={50}
								className="object-contain"
							/>
						</div>
					</div>
				</div>

				<div className="w-full h-px bg-gray-300 mb-6"></div>

				<div className="flex flex-col sm:flex-row justify-between items-center">
					<div className="flex space-x-6 mb-4 sm:mb-0">
						<Link
							href="/privacy-policy"
							className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
						>
							Privacy Policy
						</Link>
						<Link
							href="/terms"
							className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
						>
							Terms and Conditions
						</Link>
					</div>

					<div className="text-sm text-gray-600">2024 / All rights reserved</div>
				</div>
			</div>
		</footer>
	);
}
