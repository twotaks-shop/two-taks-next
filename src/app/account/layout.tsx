"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCustomerStore } from "../../../lib/customer-store";
import { useAuthModalStore } from "../../../lib/auth-modal-store";

const accountNavItems = [
	{
		href: "/account",
		label: "Profile",
		icon: (
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
					d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
				/>
			</svg>
		),
	},
	{
		href: "/account/orders",
		label: "Orders",
		icon: (
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
					d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
				/>
			</svg>
		),
	},
];

export default function AccountLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const { customer, isAuthenticated, logout } = useCustomerStore();
	const { openLogin } = useAuthModalStore();

	const handleLogout = async () => {
		await logout();
	};

	if (!isAuthenticated()) {
		return (
			<>
				<div className="min-h-screen bg-white">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
						<div className="max-w-md mx-auto text-center">
							<div className="mb-8">
								<svg
									className="mx-auto h-24 w-24 text-neutral-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1}
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									/>
								</svg>
							</div>

							<h1 className="text-3xl font-heading-bold text-neutral-900 mb-4">
								Sign in to your account
							</h1>
							<p className="text-neutral-600 mb-8">
								Access your order history, track shipments, and manage your profile.
							</p>

							<button
								onClick={openLogin}
								className="w-full bg-black text-white py-3 px-6 rounded-lg font-league-spartan font-medium transition-all duration-200 hover:bg-neutral-800"
							>
								Sign in or Create Account
							</button>

							<div className="mt-8">
								<Link
									href="/shop"
									className="text-neutral-600 hover:text-black transition-colors duration-200"
								>
									← Continue shopping
								</Link>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mt-10">
				<div className="lg:grid lg:grid-cols-4 lg:gap-8">
					<div className="lg:col-span-1">
						<div className="bg-white border border-neutral-200 rounded-lg p-6 sticky top-24">
							<div className="mb-6 pb-6 border-b border-neutral-200">
								<div className="flex items-center">
									<div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center">
										<svg
											className="w-6 h-6 text-neutral-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
											/>
										</svg>
									</div>
									<div className="ml-3">
										<h3 className="text-sm font-medium text-neutral-900">
											{customer?.firstName} {customer?.lastName}
										</h3>
										<p className="text-sm text-neutral-600">{customer?.email}</p>
									</div>
								</div>
							</div>

							<nav className="space-y-1">
								{accountNavItems.map((item) => {
									const isActive = pathname === item.href;
									return (
										<Link
											key={item.href}
											href={item.href}
											className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
												isActive
													? "bg-neutral-100 text-neutral-900"
													: "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
											}`}
										>
											{item.icon}
											<span className="ml-3">{item.label}</span>
										</Link>
									);
								})}
							</nav>

							<div className="mt-6 pt-6 border-t border-neutral-200">
								<button
									onClick={handleLogout}
									className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200"
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
											d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
										/>
									</svg>
									<span className="ml-3">Sign out</span>
								</button>
							</div>
						</div>
					</div>

					<div className="mt-8 lg:mt-0 lg:col-span-3">
						<div className="bg-white border border-neutral-200 rounded-lg p-6">
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
