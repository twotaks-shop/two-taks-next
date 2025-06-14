"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../../lib/cart-store";
import { createCheckout } from "../../lib/shopify";
import { PLACEHOLDER_IMAGE_URL } from "../../lib/const";

export default function CartSidebar() {
	const {
		items,
		isOpen,
		closeCart,
		removeItem,
		updateQuantity,
		getTotalPrice,
		getTotalItems,
		clearCart,
	} = useCartStore();

	const [isCheckingOut, setIsCheckingOut] = useState(false);

	const totalPrice = getTotalPrice();
	const totalItems = getTotalItems();

	const formattedTotal = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	}).format(totalPrice);

	if (!isOpen) return null;

	return (
		<>
			<div className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white z-50 shadow-2xl">
				<div className="flex flex-col h-full">
					<div className="flex items-center justify-between p-6 border-b border-neutral-200">
						<h2 className="text-lg font-heading-medium">Cart ({totalItems})</h2>
						<button
							onClick={closeCart}
							className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
							aria-label="Close cart"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</button>
					</div>

					{/* Cart Items */}
					<div className="flex-1 overflow-y-auto p-6">
						{items.length === 0 ? (
							<div className="text-center py-12">
								<p className="text-neutral-600 mb-6">Your cart is empty</p>
								<Link
									href="/shop"
									onClick={closeCart}
									className="inline-block bg-black text-white py-2 px-6 font-heading-medium transition-all duration-200 hover:bg-neutral-800"
								>
									Continue Shopping
								</Link>
							</div>
						) : (
							<div className="space-y-6">
								{items.map((item) => (
									<div
										key={`${item.variantId}-${item.sellingPlanId || "one-time"}`}
										className="flex gap-4"
									>
										<div className="relative w-20 h-20 bg-neutral-50 flex-shrink-0">
											<Image
												src={item.image || PLACEHOLDER_IMAGE_URL}
												alt={item.title}
												fill
												sizes="80px"
												className="object-cover"
											/>
										</div>

										<div className="flex-1 min-w-0">
											<Link
												href={`/shop/products/${item.handle}`}
												onClick={closeCart}
												className="block font-heading-medium text-sm hover:text-neutral-600 transition-colors"
											>
												{item.title}
											</Link>
											{item.variantTitle && (
												<p className="text-xs text-neutral-500 mt-1">{item.variantTitle}</p>
											)}

											{item.isSubscription && item.sellingPlanName && (
												<div className="flex items-center mt-1">
													<svg
														className="w-3 h-3 text-green-600 mr-1"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
													</svg>
													<span className="text-xs text-green-600 font-medium">
														{item.sellingPlanName}
													</span>
												</div>
											)}

											<p className="text-sm text-neutral-600 mt-1">
												{new Intl.NumberFormat("en-US", {
													style: "currency",
													currency: "USD",
													minimumFractionDigits: 2,
												}).format(item.price)}
												{item.isSubscription && (
													<span className="text-xs text-green-600 ml-1">
														(subscription price)
													</span>
												)}
											</p>

											<div className="flex items-center gap-3 mt-3">
												<button
													onClick={() =>
														updateQuantity(
															item.variantId,
															item.quantity - 1,
															item.sellingPlanId,
														)
													}
													className="w-8 h-8 flex items-center justify-center border border-neutral-300 hover:bg-neutral-50 transition-colors"
													disabled={item.quantity <= 1}
												>
													-
												</button>

												<span className="text-sm font-heading-medium w-8 text-center">
													{item.quantity}
												</span>

												<button
													onClick={() =>
														updateQuantity(
															item.variantId,
															item.quantity + 1,
															item.sellingPlanId,
														)
													}
													className="w-8 h-8 flex items-center justify-center border border-neutral-300 hover:bg-neutral-50 transition-colors"
												>
													+
												</button>

												<button
													onClick={() => removeItem(item.variantId, item.sellingPlanId)}
													className="ml-auto text-sm text-neutral-500 hover:text-red-600 transition-colors"
												>
													Remove
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					{items.length > 0 && (
						<div className="border-t border-neutral-200 p-4 sm:p-6 bg-white">
							<div className="flex justify-between items-center mb-4">
								<span className="font-heading-medium text-black">Total</span>
								<span className="text-lg font-heading-medium text-black">
									{formattedTotal}
								</span>
							</div>

							<button
								className="w-full bg-black text-white py-4 px-6 font-heading-medium transition-all duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-base"
								onClick={async () => {
									setIsCheckingOut(true);
									try {
										const checkoutItems = items.map((item) => ({
											variantId: item.variantId,
											quantity: item.quantity,
											...(item.sellingPlanId && { sellingPlanId: item.sellingPlanId }),
										}));

										const checkoutUrl = await createCheckout(checkoutItems);

										clearCart();

										window.location.href = checkoutUrl;
									} catch (error) {
										console.error("Checkout error:", error);
										alert(
											"Sorry, there was an error processing your checkout. Please try again.",
										);
									} finally {
										setIsCheckingOut(false);
									}
								}}
								disabled={isCheckingOut}
							>
								{isCheckingOut ? "Processing..." : "Checkout"}
							</button>

							<button
								onClick={closeCart}
								className="w-full mt-3 py-3 px-6 text-base text-neutral-700 hover:text-black transition-colors bg-neutral-100 hover:bg-neutral-200 font-heading-medium"
							>
								Continue Shopping
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
