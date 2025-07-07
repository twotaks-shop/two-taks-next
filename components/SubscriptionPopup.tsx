"use client";

import { useState } from "react";

interface SubscriptionPopupProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function SubscriptionPopup({
	isOpen,
	onClose,
}: SubscriptionPopupProps) {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
		"idle",
	);
	const [errorMessage, setErrorMessage] = useState("");

	if (!isOpen) return null;

	const subscribeToEmailMarketing = async (email: string) => {
		const response = await fetch("/api/subscribe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});

		if (!response.ok) {
			throw new Error("Failed to subscribe");
		}

		return await response.json();
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("loading");
		setErrorMessage("");

		try {
			const result = await subscribeToEmailMarketing(email);

			if (result?.error) {
				setStatus("error");
				setErrorMessage(result.error.message || "Subscription failed");
				return;
			}

			setStatus("success");
			setTimeout(() => {
				onClose();
				setStatus("idle");
				setEmail("");
			}, 2000);
		} catch (error: any) {
			setStatus("error");
			setErrorMessage(
				error?.message || "Something went wrong. Please try again later.",
			);
		}
	};

	return (
		<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
				<div className="flex justify-between items-start mb-4">
					<h2 className="text-2xl font-league-spartan font-bold">
						Join Our Newsletter
					</h2>
					<button onClick={onClose} className="text-gray-500 hover:text-gray-700">
						<span className="sr-only">Close</span>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<p className="text-gray-600 mb-6">
					Subscribe to receive updates about our latest products and special offers!
				</p>

				<form onSubmit={handleSubmit}>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
						required
					/>

					<button
						type="submit"
						disabled={status === "loading"}
						className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
					>
						{status === "loading"
							? "Subscribing..."
							: status === "success"
								? "Subscribed!"
								: "Subscribe"}
					</button>

					{status === "error" && (
						<p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
					)}
				</form>
			</div>
		</div>
	);
}
