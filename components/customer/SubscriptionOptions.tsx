"use client";

import React, { useState } from "react";
import { ShopifyProduct, SubscriptionOption } from "../../lib/types";

interface SubscriptionOptionsProps {
	product: ShopifyProduct;
	selectedVariantId: string;
	onSubscriptionChange: (subscriptionId: string | null) => void;
	selectedSubscription: string | null;
}

export default function SubscriptionOptions({
	product,
	selectedVariantId,
	onSubscriptionChange,
	selectedSubscription,
}: SubscriptionOptionsProps) {
	const [selectedOption, setSelectedOption] = useState<string | null>(
		selectedSubscription,
	);

	const subscriptionOptions: SubscriptionOption[] =
		product.sellingPlanGroups?.flatMap((group) =>
			group.sellingPlans.map((plan) => ({
				id: plan.id,
				name: plan.name,
				description: plan.description,
				discount: {
					type: plan.priceAdjustments[0]?.adjustmentValue.percentage
						? "percentage"
						: "fixed",
					value:
						plan.priceAdjustments[0]?.adjustmentValue.percentage ||
						parseFloat(
							plan.priceAdjustments[0]?.adjustmentValue.fixedAmount?.amount || "0",
						),
				},
				frequency: plan.name.toLowerCase().includes("month")
					? "monthly"
					: plan.name.toLowerCase().includes("week")
						? "weekly"
						: "monthly",
			})),
		) || [];

	const selectedVariant = product.variants.find(
		(v) => v.id === selectedVariantId,
	);
	const basePrice = selectedVariant ? parseFloat(selectedVariant.price) : 0;

	const handleOptionChange = (optionId: string | null) => {
		setSelectedOption(optionId);
		onSubscriptionChange(optionId);
	};

	const calculateDiscountedPrice = (option: SubscriptionOption) => {
		if (option.discount.type === "percentage") {
			return basePrice * (1 - option.discount.value / 100);
		} else {
			return basePrice - option.discount.value;
		}
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(price);
	};

	const getFrequencyIcon = (frequency: string) => {
		switch (frequency) {
			case "weekly":
				return (
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
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				);
			case "monthly":
			default:
				return (
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
							d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
						/>
					</svg>
				);
		}
	};

	if (!subscriptionOptions.length) {
		return null;
	}

	return (
		<div className="mt-6">
			<h3 className="text-lg font-heading-medium text-neutral-900 mb-4">
				Purchase Options
			</h3>

			<div className="space-y-3">
				<label className="relative flex flex-col sm:flex-row sm:items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-neutral-300">
					<input
						type="radio"
						name="purchase-option"
						value=""
						checked={selectedOption === null}
						onChange={() => handleOptionChange(null)}
						className="mt-1 h-4 w-4 text-black focus:ring-black border-neutral-300"
					/>
					<div className="ml-3 sm:ml-3 mt-2 sm:mt-0 flex-1">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
							<div>
								<p className="text-sm font-medium text-neutral-900">
									One-time purchase
								</p>
								<p className="text-xs text-neutral-600">
									No commitment, cancel anytime
								</p>
							</div>
							<div className="text-left sm:text-right">
								<p className="text-lg font-heading-medium text-neutral-900">
									{formatPrice(basePrice)}
								</p>
							</div>
						</div>
					</div>
				</label>

				{subscriptionOptions.map((option) => {
					const discountedPrice = calculateDiscountedPrice(option);
					const savings = basePrice - discountedPrice;
					const savingsPercentage = Math.round((savings / basePrice) * 100);

					return (
						<label
							key={option.id}
							className={`relative flex flex-col sm:flex-row sm:items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-neutral-300 ${
								selectedOption === option.id
									? "border-black bg-neutral-50"
									: "border-neutral-200"
							}`}
						>
							<input
								type="radio"
								name="purchase-option"
								value={option.id}
								checked={selectedOption === option.id}
								onChange={() => handleOptionChange(option.id)}
								className="mt-1 h-4 w-4 text-black focus:ring-black border-neutral-300"
							/>
							<div className="ml-3 sm:ml-3 mt-2 sm:mt-0 flex-1">
								<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
									<div className="flex-1">
										<div className="flex flex-wrap items-center gap-2 mb-2">
											{getFrequencyIcon(option.frequency)}
											<p className="text-sm font-medium text-neutral-900">
												Subscribe & Save
											</p>
											{savingsPercentage > 0 && (
												<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
													Save {savingsPercentage}%
												</span>
											)}
										</div>
										<p className="text-xs text-neutral-600 mb-2">
											{option.description ||
												`Delivered every ${option.frequency === "weekly" ? "week" : "month"}`}
										</p>
										<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500">
											<span className="flex items-center">
												<svg
													className="w-3 h-3 mr-1"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fillRule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
												Cancel anytime
											</span>
											<span className="flex items-center">
												<svg
													className="w-3 h-3 mr-1"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fillRule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
												Pause or skip
											</span>
										</div>
									</div>
									<div className="text-right sm:ml-4">
										<div className="flex flex-col items-end">
											<p className="text-lg font-heading-medium text-neutral-900">
												{formatPrice(discountedPrice)}
											</p>
											{savings > 0 && (
												<div className="flex items-center space-x-1">
													<span className="text-xs text-neutral-500 line-through">
														{formatPrice(basePrice)}
													</span>
													<span className="text-xs text-green-600 font-medium">
														Save {formatPrice(savings)}
													</span>
												</div>
											)}
											<p className="text-xs text-neutral-500 mt-1">
												per {option.frequency === "weekly" ? "week" : "month"}
											</p>
										</div>
									</div>
								</div>
							</div>
						</label>
					);
				})}
			</div>

			{selectedOption && (
				<div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
					<div className="flex items-start">
						<svg
							className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clipRule="evenodd"
							/>
						</svg>
						<div>
							<h4 className="text-sm font-medium text-blue-900">
								Subscription Benefits
							</h4>
							<ul className="text-sm text-blue-700 mt-1 space-y-1">
								<li>• Automatic delivery - never run out</li>
								<li>• Exclusive subscriber discounts</li>
								<li>• Manage your subscription online</li>
								<li>• Cancel or modify anytime</li>
							</ul>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
