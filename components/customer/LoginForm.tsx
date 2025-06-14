"use client";

import { useState, useCallback } from "react";
import { useCustomerStore } from "../../lib/customer-store";
import { CustomerLoginInput } from "../../lib/types";

interface LoginFormProps {
	onSuccess?: () => void;
	onSwitchToRegister?: () => void;
}

export default function LoginForm({
	onSuccess,
	onSwitchToRegister,
}: LoginFormProps) {
	const { login, isLoading, error, clearError } = useCustomerStore();
	const [formData, setFormData] = useState<CustomerLoginInput>({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));

			// Clear error when user starts typing
			if (error) {
				clearError();
			}
		},
		[error, clearError],
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.email.trim() || !formData.password.trim()) {
			return;
		}

		const result = await login(formData);

		if (result.success) {
			setFormData({ email: "", password: "" });
			onSuccess?.();
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="mb-8 text-center">
				<h2 className="text-2xl font-heading-bold text-neutral-900 mb-2">
					Welcome back
				</h2>
				<p className="text-neutral-600">
					Sign in to your account to view your orders and manage your profile
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				{error && (
					<div className="bg-red-50 border border-red-200 rounded-lg p-4">
						<div className="flex">
							<svg
								className="w-5 h-5 text-red-400 mr-2 mt-0.5 flex-shrink-0"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clipRule="evenodd"
								/>
							</svg>
							<div>
								<h3 className="text-sm font-medium text-red-800">Sign in Failed</h3>
								<p className="text-sm text-red-700 mt-1">{error}</p>
							</div>
						</div>
					</div>
				)}

				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-neutral-700 mb-2"
					>
						Email address
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						required
						className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 font-montserrat"
						placeholder="Enter your email"
						disabled={isLoading}
					/>
				</div>

				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-neutral-700 mb-2"
					>
						Password
					</label>
					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							required
							className="w-full px-4 py-3 pr-12 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 font-montserrat"
							placeholder="Enter your password"
							disabled={isLoading}
						/>
						<button
							type="button"
							onClick={togglePasswordVisibility}
							className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
							disabled={isLoading}
						>
							{showPassword ? (
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
										d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
									/>
								</svg>
							) : (
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
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>

				<button
					type="submit"
					disabled={isLoading || !formData.email.trim() || !formData.password.trim()}
					className="w-full bg-black text-white py-3 px-6 rounded-lg font-league-spartan font-medium transition-all duration-200 hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed"
				>
					{isLoading ? (
						<div className="flex items-center justify-center">
							<svg
								className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Signing in...
						</div>
					) : (
						"Sign in"
					)}
				</button>
			</form>

			{onSwitchToRegister && (
				<div className="mt-6 text-center">
					<p className="text-neutral-600">
						Don&apost have an account?{" "}
						<button
							onClick={onSwitchToRegister}
							className="text-black font-medium hover:underline transition-all duration-200"
							disabled={isLoading}
						>
							Create account
						</button>
					</p>
				</div>
			)}
		</div>
	);
}
