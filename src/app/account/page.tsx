"use client";

import React from "react";
import Link from "next/link";
import { useCustomerStore } from "../../../lib/customer-store";

export default function AccountPage() {
	const { customer } = useCustomerStore();

	if (!customer) {
		return (
			<div className="animate-pulse">
				<div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
				<div className="space-y-6">
					<div className="h-4 bg-gray-200 rounded w-1/3"></div>
					<div className="h-4 bg-gray-200 rounded w-1/2"></div>
					<div className="h-4 bg-gray-200 rounded w-1/4"></div>
				</div>
			</div>
		);
	}

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<div>
			<div className="mb-8">
				<h1 className="text-2xl font-heading-bold text-neutral-900 mb-2">
					Account Profile
				</h1>
				<p className="text-neutral-600">
					Manage your personal information and preferences
				</p>
			</div>

			<div className="space-y-8">
				<div>
					<h2 className="text-lg font-heading-medium text-neutral-900 mb-4">
						Personal Information
					</h2>
					<div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-sm font-medium text-neutral-700 mb-1">
									First Name
								</label>
								<div className="px-3 py-2 bg-white border border-neutral-300 rounded-md">
									<span className="text-neutral-900">{customer.firstName}</span>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-neutral-700 mb-1">
									Last Name
								</label>
								<div className="px-3 py-2 bg-white border border-neutral-300 rounded-md">
									<span className="text-neutral-900">{customer.lastName}</span>
								</div>
							</div>
							<div className="md:col-span-2">
								<label className="block text-sm font-medium text-neutral-700 mb-1">
									Email Address
								</label>
								<div className="px-3 py-2 bg-white border border-neutral-300 rounded-md">
									<span className="text-neutral-900">{customer.email}</span>
								</div>
							</div>
							{customer.phone && (
								<div className="md:col-span-2">
									<label className="block text-sm font-medium text-neutral-700 mb-1">
										Phone Number
									</label>
									<div className="px-3 py-2 bg-white border border-neutral-300 rounded-md">
										<span className="text-neutral-900">{customer.phone}</span>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				<div>
					<h2 className="text-lg font-heading-medium text-neutral-900 mb-4">
						Account Information
					</h2>
					<div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<span className="text-sm font-medium text-neutral-700">
									Account Created
								</span>
								<span className="text-neutral-900">
									{formatDate(customer.createdAt)}
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm font-medium text-neutral-700">
									Last Updated
								</span>
								<span className="text-neutral-900">
									{formatDate(customer.updatedAt)}
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm font-medium text-neutral-700">
									Marketing Emails
								</span>
								<span
									className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
										customer.acceptsMarketing
											? "bg-green-100 text-green-800"
											: "bg-gray-100 text-gray-800"
									}`}
								>
									{customer.acceptsMarketing ? "Subscribed" : "Not subscribed"}
								</span>
							</div>
						</div>
					</div>
				</div>

				{customer.addresses && customer.addresses.length > 0 && (
					<div>
						<h2 className="text-lg font-heading-medium text-neutral-900 mb-4">
							Saved Addresses
						</h2>
						<div className="space-y-4">
							{customer.addresses.map((address) => (
								<div
									key={address.id}
									className="bg-neutral-50 border border-neutral-200 rounded-lg p-6"
								>
									<div className="flex justify-between items-start mb-4">
										<h3 className="font-medium text-neutral-900">
											{address.firstName} {address.lastName}
										</h3>
									</div>
									<div className="text-sm text-neutral-700 space-y-1">
										{address.company && <p>{address.company}</p>}
										<p>{address.address1}</p>
										{address.address2 && <p>{address.address2}</p>}
										<p>
											{address.city}, {address.province} {address.zip}
										</p>
										<p>{address.country}</p>
										{address.phone && <p>{address.phone}</p>}
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				<div>
					<h2 className="text-lg font-heading-medium text-neutral-900 mb-4">
						Quick Actions
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Link
							href="/account/orders"
							className="block bg-neutral-50 border border-neutral-200 rounded-lg p-6 hover:bg-neutral-100 transition-colors duration-200"
						>
							<div className="flex items-center">
								<svg
									className="w-8 h-8 text-neutral-600 mr-4"
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
								<div>
									<h3 className="font-medium text-neutral-900">View Orders</h3>
									<p className="text-sm text-neutral-600">
										Track your order history and status
									</p>
								</div>
							</div>
						</Link>
						<Link
							href="/shop"
							className="block bg-neutral-50 border border-neutral-200 rounded-lg p-6 hover:bg-neutral-100 transition-colors duration-200"
						>
							<div className="flex items-center">
								<svg
									className="w-8 h-8 text-neutral-600 mr-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H17M7 13v8a2 2 0 002 2h8a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01"
									/>
								</svg>
								<div>
									<h3 className="font-medium text-neutral-900">Continue Shopping</h3>
									<p className="text-sm text-neutral-600">Browse our latest products</p>
								</div>
							</div>
						</Link>
					</div>
				</div>

				<div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
					<div className="flex items-start">
						<svg
							className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<div>
							<h3 className="text-lg font-medium text-blue-900 mb-2">Need Help?</h3>
							<p className="text-sm text-blue-700 mb-4">
								If you need to update your account information or have questions about
								your orders, we&aposre here to help.
							</p>
							<div className="space-y-2">
								<p className="text-sm text-blue-700">
									<strong>Email:</strong> support@twotaks.com
								</p>
								<p className="text-sm text-blue-700">
									<strong>Phone:</strong> 1-800-TWOTAKS
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
