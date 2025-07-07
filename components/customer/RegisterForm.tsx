"use client";

import { useState, useCallback } from "react";
import { useCustomerStore } from "../../lib/customer-store";
import { CustomerCreateInput } from "../../lib/types";

interface RegisterFormProps {
	onSuccess?: () => void;
	onSwitchToLogin?: () => void;
}

export default function RegisterForm({
	onSuccess,
	onSwitchToLogin,
}: RegisterFormProps) {
	const { register, isLoading, error, clearError } = useCustomerStore();
	const [result, setResult] = useState<{
		success: boolean;
		error?: string;
	} | null>(null);
	const [formData, setFormData] = useState<CustomerCreateInput>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		acceptsMarketing: false,
	});
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [formHidden, setFormHidden] = useState(false); 
	
	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value, type, checked } = e.target;

			if (name === "confirmPassword") {
				setConfirmPassword(value);
			} else {
				setFormData((prev) => ({
					...prev,
					[name]: type === "checkbox" ? checked : value,
				}));
			}

			if (error) {
				clearError();
			}
		},
		[error, clearError],
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!formData.firstName.trim() ||
			!formData.lastName.trim() ||
			!formData.email.trim() ||
			!formData.password.trim()
		) {
			return;
		}

		if (formData.password !== confirmPassword) {
			return;
		}

		if (formData.password.length < 8) {
			return;
		}

		const result = await register(formData);

		if (result.customerUserErrors && result.customerUserErrors.length > 0) {
			const disabledError = result.customerUserErrors.find(
				(err) => err.code === "CUSTOMER_DISABLED",
			);

			if (disabledError) {
				setResult({
					success: true,
					error: `Registro recibido. Por favor, revisa tu correo (${formData.email}) y haz clic en el enlace para verificar tu cuenta.`,
				});
				setFormHidden(true); // Ocultamos el formulario
				return;
			}

			setResult({
				success: false,
				error: result.customerUserErrors[0].message,
			});

			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				acceptsMarketing: false,
			});

			return;
		}

		setResult(result);

		if (result.success && !result.error) {
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				acceptsMarketing: false,
			});
			setConfirmPassword("");
			onSuccess?.();
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	const passwordsMatch = formData.password === confirmPassword;
	const isPasswordValid = formData.password.length >= 8;

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="mb-8 text-center">
				<h2 className="text-2xl font-heading-bold text-neutral-900 mb-2">
					Create account
				</h2>
				<p className="text-neutral-600">
					Join us to track your orders and enjoy a personalized shopping experience
				</p>
			</div>

			{result && (
				<div
					className={`border rounded-lg p-4 ${
						result.success
							? "bg-green-50 border-green-200"
							: "bg-red-50 border-red-200"
					}`}
				>
					<div className="flex">
						{result.success ? (
							<svg
								className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clipRule="evenodd"
								/>
							</svg>
						) : (
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
						)}
						<div>
							<h3
								className={`text-sm font-medium ${
									result.success ? "text-green-800" : "text-red-800"
								}`}
							>
								{result.success ? "Registration Successful" : "Registration Info"}
							</h3>
							<p
								className={`text-sm mt-1 ${
									result.success ? "text-green-700" : "text-red-700"
								}`}
							>
								{result.error}
							</p>
						</div>
					</div>
				</div>
			)}

			{!formHidden && (
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* formulario entero aquí igual que antes */}
					{/* --- Primer nombre y Apellido --- */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label
								htmlFor="firstName"
								className="block text-sm font-medium text-neutral-700 mb-2"
							>
								First name
							</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								value={formData.firstName}
								onChange={handleInputChange}
								required
								className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 font-montserrat"
								placeholder="First name"
								disabled={isLoading}
							/>
						</div>

						<div>
							<label
								htmlFor="lastName"
								className="block text-sm font-medium text-neutral-700 mb-2"
							>
								Last name
							</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								value={formData.lastName}
								onChange={handleInputChange}
								required
								className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 font-montserrat"
								placeholder="Last name"
								disabled={isLoading}
							/>
						</div>
					</div>

					{/* Email */}
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

					{/* Password */}
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
								className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 font-montserrat ${
									formData.password && !isPasswordValid
										? "border-red-300 focus:ring-red-500"
										: "border-neutral-300"
								}`}
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
						{formData.password && !isPasswordValid && (
							<p className="text-sm text-red-600 mt-1">
								Password must be at least 8 characters long
							</p>
						)}
					</div>

					{/* Confirm password */}
					<div>
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-neutral-700 mb-2"
						>
							Confirm password
						</label>
						<div className="relative">
							<input
								type={showConfirmPassword ? "text" : "password"}
								id="confirmPassword"
								name="confirmPassword"
								value={confirmPassword}
								onChange={handleInputChange}
								required
								className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 font-montserrat ${
									confirmPassword && !passwordsMatch
										? "border-red-300 focus:ring-red-500"
										: "border-neutral-300"
								}`}
								placeholder="Confirm your password"
								disabled={isLoading}
							/>
							<button
								type="button"
								onClick={toggleConfirmPasswordVisibility}
								className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
								disabled={isLoading}
							>
								{showConfirmPassword ? (
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
						{confirmPassword && !passwordsMatch && (
							<p className="text-sm text-red-600 mt-1">Passwords do not match</p>
						)}
					</div>

					{/* Marketing checkbox */}
					<div className="flex items-start">
						<input
							type="checkbox"
							id="acceptsMarketing"
							name="acceptsMarketing"
							checked={formData.acceptsMarketing}
							onChange={handleInputChange}
							className="mt-1 h-4 w-4 text-black focus:ring-black border-neutral-300 rounded"
							disabled={isLoading}
						/>
						<label
							htmlFor="acceptsMarketing"
							className="ml-3 text-sm text-neutral-600"
						>
							I would like to receive marketing emails about new products, promotions,
							and exclusive offers
						</label>
					</div>

					{/* Submit button */}
					<button
						type="submit"
						disabled={
							isLoading ||
							!formData.firstName.trim() ||
							!formData.lastName.trim() ||
							!formData.email.trim() ||
							!formData.password.trim() ||
							!confirmPassword.trim() ||
							!passwordsMatch ||
							!isPasswordValid
						}
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
								<span>Loading...</span>
							</div>
						) : (
							"Create account"
						)}
					</button>

					{/* Switch to login */}
					{onSwitchToLogin && (
						<div className="text-center pt-4 text-neutral-600">
							<span>Already have an account? </span>
							<button
								type="button"
								onClick={onSwitchToLogin}
								className="underline hover:no-underline"
							>
								Log in
							</button>
						</div>
					)}
				</form>
			)}
		</div>
	);
}
