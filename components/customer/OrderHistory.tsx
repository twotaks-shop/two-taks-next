"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCustomerStore } from "../../lib/customer-store";
import { getCustomerOrders } from "../../lib/shopify";
import { ShopifyOrder } from "../../lib/types";

interface OrderHistoryProps {
	pageSize?: number;
}

export default function OrderHistory({ pageSize = 10 }: OrderHistoryProps) {
	const { accessToken, isAuthenticated } = useCustomerStore();
	const [orders, setOrders] = useState<ShopifyOrder[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [hasNextPage, setHasNextPage] = useState(false);
	const [endCursor, setEndCursor] = useState<string | null>(null);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const loadOrders = useCallback(
		async (cursor?: string, append = false) => {
			if (!accessToken || !isAuthenticated()) return;

			if (!append) {
				setIsLoading(true);
			} else {
				setIsLoadingMore(true);
			}
			setError(null);

			try {
				const result = await getCustomerOrders(
					accessToken.accessToken,
					pageSize,
					cursor,
				);

				if (append) {
					setOrders((prev) => [...prev, ...result.orders]);
				} else {
					setOrders(result.orders);
				}

				setHasNextPage(result.pageInfo.hasNextPage);
				setEndCursor(result.pageInfo.endCursor);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load orders");
			} finally {
				setIsLoading(false);
				setIsLoadingMore(false);
			}
		},
		[accessToken, isAuthenticated, pageSize],
	);

	useEffect(() => {
		if (isAuthenticated()) {
			loadOrders();
		}
	}, [isAuthenticated, loadOrders]);

	const loadMoreOrders = () => {
		if (hasNextPage && endCursor && !isLoadingMore) {
			loadOrders(endCursor, true);
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const formatPrice = (amount: string, currencyCode: string) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currencyCode,
		}).format(parseFloat(amount));
	};

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case "paid":
			case "fulfilled":
				return "bg-green-100 text-green-800";
			case "pending":
			case "unfulfilled":
				return "bg-yellow-100 text-yellow-800";
			case "cancelled":
			case "refunded":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	if (!isAuthenticated()) {
		return (
			<div className="text-center py-12">
				<svg
					className="mx-auto h-12 w-12 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
					/>
				</svg>
				<h3 className="mt-2 text-sm font-medium text-gray-900">
					Please sign in to view your order history
				</h3>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="space-y-6">
				{[...Array(3)].map((_, i) => (
					<div
						key={i}
						className="border border-neutral-200 rounded-lg p-6 animate-pulse"
					>
						<div className="flex justify-between items-start mb-4">
							<div className="space-y-2">
								<div className="h-4 bg-gray-200 rounded w-24"></div>
								<div className="h-3 bg-gray-200 rounded w-32"></div>
							</div>
							<div className="h-6 bg-gray-200 rounded w-20"></div>
						</div>
						<div className="space-y-3">
							<div className="flex items-center space-x-4">
								<div className="h-16 w-16 bg-gray-200 rounded"></div>
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-gray-200 rounded w-3/4"></div>
									<div className="h-3 bg-gray-200 rounded w-1/2"></div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<div className="bg-red-50 border border-red-200 rounded-lg p-6">
					<svg
						className="mx-auto h-12 w-12 text-red-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
						/>
					</svg>
					<h3 className="mt-2 text-sm font-medium text-red-900">
						Error loading orders
					</h3>
					<p className="mt-1 text-sm text-red-700">{error}</p>
					<button
						onClick={() => loadOrders()}
						className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 transition-colors duration-200"
					>
						Try again
					</button>
				</div>
			</div>
		);
	}

	if (orders.length === 0) {
		return (
			<div className="text-center py-12">
				<svg
					className="mx-auto h-12 w-12 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
					/>
				</svg>
				<h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
				<p className="mt-1 text-sm text-gray-500">
					When you place your first order, it will appear here.
				</p>
				<div className="mt-6">
					<Link
						href="/shop"
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-neutral-800 transition-colors duration-200"
					>
						Start shopping
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-heading-bold text-neutral-900">
					Order History
				</h2>
				<p className="text-sm text-neutral-600">
					{orders.length} order{orders.length !== 1 ? "s" : ""}
				</p>
			</div>

			<div className="space-y-6">
				{orders.map((order) => (
					<div
						key={order.id}
						className="border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
					>
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
							<div className="mb-2 sm:mb-0">
								<h3 className="text-lg font-heading-medium text-neutral-900">
									Order #{order.orderNumber}
								</h3>
								<p className="text-sm text-neutral-600">
									Placed on {formatDate(order.processedAt)}
								</p>
							</div>
							<div className="flex flex-col sm:items-end space-y-2">
								<div className="flex space-x-2">
									<span
										className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
											order.financialStatus,
										)}`}
									>
										{order.financialStatus}
									</span>
									<span
										className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
											order.fulfillmentStatus || "unfulfilled",
										)}`}
									>
										{order.fulfillmentStatus || "Unfulfilled"}
									</span>
								</div>
								<p className="text-lg font-heading-medium text-neutral-900">
									{formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}
								</p>
							</div>
						</div>

						<div className="space-y-4">
							{order.lineItems.map((item, index) => (
								<div key={index} className="flex items-center space-x-4">
									<div className="flex-shrink-0">
										<div className="h-16 w-16 rounded-lg overflow-hidden bg-neutral-100">
											{item.variant.product.images.length > 0 ? (
												<Image
													src={item.variant.product.images[0].url}
													alt={item.variant.product.images[0].altText || item.title}
													width={64}
													height={64}
													className="h-full w-full object-cover"
												/>
											) : (
												<div className="h-full w-full flex items-center justify-center">
													<svg
														className="h-8 w-8 text-neutral-400"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
														/>
													</svg>
												</div>
											)}
										</div>
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between">
											<div>
												<h4 className="text-sm font-medium text-neutral-900 truncate">
													{item.title}
												</h4>
												{item.variant.title !== "Default Title" && (
													<p className="text-sm text-neutral-600">{item.variant.title}</p>
												)}
												<p className="text-sm text-neutral-600">Qty: {item.quantity}</p>
											</div>
											<div className="text-right">
												<p className="text-sm font-medium text-neutral-900">
													{formatPrice(
														item.variant.price.amount,
														item.variant.price.currencyCode,
													)}
												</p>
												{item.quantity > 1 && (
													<p className="text-xs text-neutral-500">
														{formatPrice(
															(
																parseFloat(item.variant.price.amount) * item.quantity
															).toString(),
															item.variant.price.currencyCode,
														)}{" "}
														total
													</p>
												)}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="mt-6 pt-4 border-t border-neutral-200">
							<div className="flex justify-between text-sm">
								<span className="text-neutral-600">Subtotal</span>
								<span className="text-neutral-900">
									{formatPrice(
										order.subtotalPrice.amount,
										order.subtotalPrice.currencyCode,
									)}
								</span>
							</div>
							{parseFloat(order.totalShippingPrice.amount) > 0 && (
								<div className="flex justify-between text-sm mt-1">
									<span className="text-neutral-600">Shipping</span>
									<span className="text-neutral-900">
										{formatPrice(
											order.totalShippingPrice.amount,
											order.totalShippingPrice.currencyCode,
										)}
									</span>
								</div>
							)}
							{parseFloat(order.totalTax.amount) > 0 && (
								<div className="flex justify-between text-sm mt-1">
									<span className="text-neutral-600">Tax</span>
									<span className="text-neutral-900">
										{formatPrice(order.totalTax.amount, order.totalTax.currencyCode)}
									</span>
								</div>
							)}
							<div className="flex justify-between text-base font-medium mt-2 pt-2 border-t border-neutral-100">
								<span className="text-neutral-900">Total</span>
								<span className="text-neutral-900">
									{formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>

			{hasNextPage && (
				<div className="text-center pt-6">
					<button
						onClick={loadMoreOrders}
						disabled={isLoadingMore}
						className="inline-flex items-center px-6 py-3 border border-neutral-300 text-sm font-medium rounded-lg text-neutral-700 bg-white hover:bg-neutral-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoadingMore ? (
							<>
								<svg
									className="animate-spin -ml-1 mr-3 h-4 w-4"
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
								Loading more...
							</>
						) : (
							"Load more orders"
						)}
					</button>
				</div>
			)}
		</div>
	);
}
