"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAuthModalStore } from "../../lib/auth-modal-store";

export default function AuthModalWrapper() {
	const { isOpen, mode, closeModal, setMode } = useAuthModalStore();

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	const handleSuccess = () => {
		closeModal();
	};

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			closeModal();
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	if (typeof window === "undefined") return null;

	return createPortal(
		<AnimatePresence>
			{isOpen && (
				<div
					className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
					style={{
						backdropFilter: "blur(8px)",
						WebkitBackdropFilter: "blur(8px)",
						backgroundColor: "rgba(255, 255, 255, 0.1)",
					}}
					onClick={handleBackdropClick}
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={closeModal}
							className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-full transition-all duration-200 z-10"
							aria-label="Close modal"
						>
							<svg
								className="w-5 h-5"
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

						<div className="p-8">
							<AnimatePresence mode="wait">
								{mode === "login" ? (
									<motion.div
										key="login"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: 20 }}
										transition={{ duration: 0.2 }}
									>
										<LoginForm
											onSuccess={handleSuccess}
											onSwitchToRegister={() => setMode("register")}
										/>
									</motion.div>
								) : (
									<motion.div
										key="register"
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ duration: 0.2 }}
									>
										<RegisterForm
											onSuccess={handleSuccess}
											onSwitchToLogin={() => setMode("login")}
										/>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>,
		document.body,
	);
}
