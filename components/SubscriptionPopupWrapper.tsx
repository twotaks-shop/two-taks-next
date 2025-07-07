"use client";

import { useState, useEffect } from "react";
import SubscriptionPopup from "./SubscriptionPopup";

export default function SubscriptionPopupWrapper() {
	const [isSubscriptionPopupOpen, setIsSubscriptionPopupOpen] = useState(false);

	useEffect(() => {
		const hasSeenPopup = localStorage.getItem("hasSeenSubscriptionPopup");

		if (!hasSeenPopup) {
			const timer = setTimeout(() => {
				setIsSubscriptionPopupOpen(true);
				localStorage.setItem("hasSeenSubscriptionPopup", "true");
			}, 2000);

			return () => clearTimeout(timer);
		}
	}, []);

	return (
		<SubscriptionPopup
			isOpen={isSubscriptionPopupOpen}
			onClose={() => setIsSubscriptionPopupOpen(false)}
		/>
	);
}
