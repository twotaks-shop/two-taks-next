"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { getProduct } from "../../../../../lib/shopify";
import { fetchRelatedProducts } from "../../../../../lib/fetch-related-products";
import { ShopifyProduct } from "../../../../../lib/types";
import ProductCard from "../../../../../components/shop/ProductCard";
import SubscriptionOptions from "../../../../../components/customer/SubscriptionOptions";
import { useCartStore } from "../../../../../lib/cart-store";
import { PLACEHOLDER_IMAGE_URL } from "../../../../../lib/const";
import { ProductReviews } from "../../../../../components/ProductReviews";
import ProductPageCarousel, {
	ProductImage,
} from "../../../../../components/shop/ProductPageCarousel";
import useViewport from "../../../../../hooks/useViewport";
import { FaStar } from "react-icons/fa6";

import { tabs } from "../../../../../confg/ingredients";
import FAQ from "../../../../../components/FAQ";

interface ProductPageClientProps {
	handle: string;
}

const mainProductsCarousel: { [key: string]: ProductImage[] } = {
	"super-morning": [
		{
			id: "1",
			url: "https://cdn.shopify.com/s/files/1/0767/4242/6880/files/Carrusel-Super-morning.jpg?v=1753810273",
			alt: "super morning",
		},
		{
			id: "2",
			url: "https://cdn.shopify.com/s/files/1/0767/4242/6880/files/Carrusel_Super_morning-02.jpg?v=1753462914",
			alt: "super morning",
		},
		{
			id: "3",
			url: "https://cdn.shopify.com/s/files/1/0767/4242/6880/files/Carrusel_Super_morning-03.jpg?v=1753462914",
			alt: "super morning",
		},
	],
	"super-immune": [
		{
			id: "1",
			url: "https://cdn.shopify.com/s/files/1/0767/4242/6880/files/Carrusel-Super-immune.jpg?v=1753810274",
			alt: "super immune",
		},
		{
			id: "2",
			url: "https://cdn.shopify.com/s/files/1/0767/4242/6880/files/Carrusel_Super_immune-02.jpg?v=1753462914",
			alt: "super immune",
		},
		{
			id: "3",
			url: "https://cdn.shopify.com/s/files/1/0767/4242/6880/files/Carrusel_Super_immune-03.jpg?v=1753462914",
			alt: "super immune",
		},
	],
	"super-sleep": [
		{
			id: "1",
			url: "https://cdn.shopify.com/s/files/1/0767/4242/6880/files/Carrusel-Super-sleep-pag-web.jpg?v=1753810273",
			alt: "super sleep",
		},
		{
			id: "2",
			url: "https://cdn.shopify.com/s/files/1/0767/4242/6880/files/Carrusel_Super_sleep-02.jpg?v=1753462914",
			alt: "super sleep",
		},
		{
			id: "3",
			url: "https://cdn.shopify.com/s/files/1/0767/4242/6880/files/Carrusel_Super_sleep-03.jpg?v=1753462913",
			alt: "super sleep",
		},
	],
	"super-brain": [
		{
			id: "1",
			url: "https://cdn.shopify.com/s/files/1/0767/4242/6880/files/Carrusel-super-brain.jpg?v=1753810274",
			alt: "super brain",
		},
		{
			id: "2",
			url: "https://cdn.shopify.com/s/files/1/0767/4242/6880/files/Carrusel_super_brain-02.jpg?v=1753462914",
			alt: "super brain",
		},
		{
			id: "3",
			url: "https://cdn.shopify.com/s/files/1/0767/4242/6880/files/Carrusel_super_brain-03.jpg?v=1753462915",
			alt: "super brain",
		},
	],
	"super-bundle": [
		{
			id: "1",
			url: "https://cdn.shopify.com/s/files/1/0767/4242/6880/files/Carrusel_bundle_Mesa_de_trabajo_1.jpg?v=1753462909",
			alt: "super bundle",
		},
		{
			id: "2",
			url: "https://cdn.shopify.com/s/files/1/0767/4242/6880/files/Carrusel_bundle-02.jpg?v=1753462914",
			alt: "super bundle",
		},
		{
			id: "3",
			url: "https://cdn.shopify.com/s/files/1/0767/4242/6880/files/Carrusel_bundle-03.jpg?v=1753462913",
			alt: "super bundle",
		},
		{
			id: "4",
			url: "https://cdn.shopify.com/s/files/1/0767/4242/6880/files/Carrusel_bundle-04.jpg?v=1753462915",
			alt: "super bundle",
		},
		{
			id: "5",
			url: "https://cdn.shopify.com/s/files/1/0767/4242/6880/files/Carrusel_bundle-05.jpg?v=1753462915",
			alt: "super bundle",
		},
		{
			id: "6",
			url: "https://cdn.shopify.com/s/files/1/0767/4242/6880/files/Carrusel_bundle-06.jpg?v=1753462910",
			alt: "super bundle",
		},
	],
};

async function fetchData(handle: string) {
	const product = await getProduct(handle);

	let relatedProducts: ShopifyProduct[] = [];
	try {
		if (product) {
			relatedProducts = await fetchRelatedProducts(product.id, 4);
		}
	} catch (error) {
		console.error("Error fetching related products:", error);
	}

	return {
		product,
		relatedProducts,
	};
}

// Helper function to extract the key function from ingredient descriptions
function extractKeyFunction(description: string): string {
	// Look for phrases that typically describe function
	const functionPhrases = [
		"helps",
		"supports",
		"enhances",
		"improves",
		"boosts",
		"stimulates",
		"reduces",
		"increases",
		"activates",
		"balances",
		"promotes",
		"regulates",
		"assists",
		"strengthens",
		"calms",
		"delivers",
	];

	// Get first sentence
	const firstSentence = description.split(".")[0] + ".";

	// Look for a shorter statement with a function phrase
	for (const phrase of functionPhrases) {
		const regex = new RegExp(`(\\w+\\s+${phrase}[^,;.]{3,40})`, "i");
		const match = description.match(regex);
		if (match && match[1]) {
			return match[1].trim().charAt(0).toUpperCase() + match[1].trim().slice(1);
		}
	}

	// Fallback to first sentence if it's short enough
	if (firstSentence.length < 100) {
		return firstSentence;
	}

	// Last resort: just the first 70 chars with ellipsis
	return description.substring(0, 70) + "...";
}

export default function ProductPageClient({ handle }: ProductPageClientProps) {
	const [product, setProduct] = useState<ShopifyProduct | null>(null);
	const [relatedProducts, setRelatedProducts] = useState<ShopifyProduct[]>([]);
	const [selectedVariantId, setSelectedVariantId] = useState<string>("");
	const [selectedSubscription, setSelectedSubscription] = useState<
		string | null
	>(null);
	const [quantity, setQuantity] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [productIngredients, setProductIngredients] = useState<any[]>([]);
	const [showDragHint, setShowDragHint] = useState(true);
	const { addItem, toggleCart } = useCartStore();

	const video1Ref = useRef<HTMLVideoElement>(null);
	const video2Ref = useRef<HTMLVideoElement>(null);

	const viewport = useViewport();

	useEffect(() => {
		async function loadData() {
			const data = await fetchData(handle);

			if (!data.product) {
				return;
			}

			setProduct(data.product);
			setRelatedProducts(data.relatedProducts);
			if (data.product.variants && data.product.variants.length > 0) {
				setSelectedVariantId(data.product.variants[0].id);
			}

			// Find product category and ingredients
			let productCategory = "";
			if (handle.includes("super-morning")) {
				productCategory = "Super Morning";
			} else if (handle.includes("super-immune")) {
				productCategory = "Super Immune";
			} else if (handle.includes("super-sleep")) {
				productCategory = "Super Sleep";
			} else if (handle.includes("super-brain")) {
				productCategory = "Super Brain";
			}

			if (productCategory) {
				const categoryTab = tabs.find((tab) => tab.category === productCategory);
				if (categoryTab) {
					const shuffledIngredients = [...categoryTab.ingredients]
						.sort(() => 0.5 - Math.random())
						.slice(0, Math.min(5, categoryTab.ingredients.length))
						.map((ingredient) => {
							const keyFunction = extractKeyFunction(ingredient.description);

							return {
								...ingredient,
								keyFunction,
							};
						});
					setProductIngredients(shuffledIngredients);
				}
			}

			setTimeout(() => {
				setShowDragHint(false);
			}, 5000);

			setIsLoading(false);
		}

		loadData();
	}, [handle]);

	useEffect(() => {
		if (
			product &&
			product.variants &&
			product.variants.length > 0 &&
			!selectedVariantId
		) {
			setSelectedVariantId(product.variants[0].id);
		}
	}, [product, selectedVariantId]);

	if (isLoading) {
		return (
			<main className="container mx-auto px-6 pt-32 pb-24">
				<div className="animate-pulse">
					<div className="h-4 bg-gray-200 rounded w-24 mb-8"></div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						<div className="space-y-4">
							<div className="aspect-square bg-gray-200 rounded-lg"></div>
							<div className="grid grid-cols-4 gap-2">
								{[...Array(4)].map((_, i) => (
									<div key={i} className="aspect-square bg-gray-200 rounded-md"></div>
								))}
							</div>
						</div>
						<div className="space-y-6">
							<div className="h-8 bg-gray-200 rounded w-3/4"></div>
							<div className="h-6 bg-gray-200 rounded w-1/4"></div>
							<div className="h-4 bg-gray-200 rounded w-full"></div>
							<div className="h-4 bg-gray-200 rounded w-2/3"></div>
						</div>
					</div>
				</div>
			</main>
		);
	}

	if (!product) {
		return (
			<main className="container mx-auto px-6 pt-32 pb-24">
				<div className="text-center">
					<h1 className="text-2xl font-heading-bold text-neutral-900 mb-4">
						Product Not Found
					</h1>
					<p className="text-neutral-600 mb-8">
						The product you&apos;re looking for doesn&apos;t exist or has been
						removed.
					</p>
					<Link
						href="/shop"
						className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-neutral-800 transition-colors duration-200"
					>
						← Back to Shop
					</Link>
				</div>
			</main>
		);
	}

	const activeVariant = selectedVariantId
		? product.variants.find((v) => v.id === selectedVariantId) ||
			product.variants[0]
		: product.variants[0];

	const price = activeVariant?.price ? parseFloat(activeVariant.price) : 0;
	const compareAtPrice = activeVariant?.compareAtPrice
		? parseFloat(activeVariant.compareAtPrice)
		: 0;
	const hasDiscount = compareAtPrice > 0 && compareAtPrice > price;

	const formattedPrice = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	}).format(price);

	const formattedCompareAtPrice = hasDiscount
		? new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
				minimumFractionDigits: 2,
			}).format(compareAtPrice)
		: null;

	const primaryImage = product.images[0];
	const imageSrc = primaryImage?.url || PLACEHOLDER_IMAGE_URL;
	const imageAlt = primaryImage?.altText || product.title;

	const additionalImages = product.images.slice(1);

	const handleQuantityChange = (newQuantity: number) => {
		if (newQuantity >= 1) {
			setQuantity(newQuantity);
		}
	};

	const handleAddToCart = () => {
		if (!activeVariant) return;

		const imageUrl = primaryImage?.url || PLACEHOLDER_IMAGE_URL;

		let finalPrice = price;
		let sellingPlanName: string | undefined = undefined;
		let isSubscription = false;

		if (selectedSubscription && product.sellingPlanGroups) {
			const sellingPlan = product.sellingPlanGroups
				.flatMap((group) => group.sellingPlans)
				.find((plan) => plan.id === selectedSubscription);

			if (sellingPlan && sellingPlan.priceAdjustments.length > 0) {
				const adjustment = sellingPlan.priceAdjustments[0];
				if (adjustment.adjustmentValue.percentage) {
					finalPrice = price * (1 - adjustment.adjustmentValue.percentage / 100);
				} else if (adjustment.adjustmentValue.fixedAmount) {
					finalPrice =
						price - parseFloat(adjustment.adjustmentValue.fixedAmount.amount);
				}

				sellingPlanName = sellingPlan.name;
				isSubscription = true;
			}
		}

		for (let i = 0; i < quantity; i++) {
			addItem({
				id: product.id,
				variantId: activeVariant.id,
				productId: product.id,
				title: product.title,
				variantTitle:
					activeVariant.title !== "Default Title" ? activeVariant.title : undefined,
				price: finalPrice,
				image: imageUrl,
				handle: product.handle,
				sellingPlanId: selectedSubscription || undefined,
				sellingPlanName,
				isSubscription,
			});
		}
		toggleCart();
	};

	return (
		<main className="container mx-auto px-6 pt-32 pb-24">
			<div className="mb-8">
				<Link
					href="/shop"
					className="text-sm text-neutral-600 hover:text-black transition-colors font-heading-regular"
				>
					← Back to shop
				</Link>
			</div>
			{mainProductsCarousel.hasOwnProperty(product.handle) &&
				mainProductsCarousel[product.handle]?.length > 0 &&
				viewport === "mobile" &&
				mainProductsCarousel.hasOwnProperty(product.handle) && (
					<ProductPageCarousel
						autoPlay={false}
						showStars={false}
						aspect="9/15"
						images={mainProductsCarousel[product.handle]}
					/>
				)}

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
				<div className="space-y-4">
					<div className="relative aspect-square bg-neutral-50 rounded-lg overflow-hidden">
						<Image
							src={imageSrc}
							alt={imageAlt}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className="object-cover"
							priority
						/>
					</div>

					{additionalImages.length > 0 && (
						<div className="grid grid-cols-4 gap-2">
							{additionalImages.map((image, index) => (
								<div
									key={image.id || index}
									className="relative aspect-square bg-neutral-50 rounded-md overflow-hidden"
								>
									<Image
										src={image.url || PLACEHOLDER_IMAGE_URL}
										alt={image.altText || `${product.title} view ${index + 2}`}
										fill
										sizes="(max-width: 768px) 25vw, 20vw"
										className="object-cover"
									/>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="flex flex-col">
					<div className="flex mb-8">
						<div className="flex items-center gap-1 mb-2">
							{[...Array(5)].map((_, i) => (
								<FaStar key={i} className="text-amber-400 text-lg" />
							))}
						</div>
						<span className="text-gray-400 text-md ml-4 font-semibold">
							50k+ five-star-reviews
						</span>
					</div>
					<h1 className="text-3xl lg:text-4xl font-heading-medium mb-6 text-neutral-900">
						{product.title}
					</h1>

					<div className="flex items-center mb-8">
						<span className="text-2xl text-neutral-900">{formattedPrice}</span>
						{hasDiscount && (
							<>
								<span className="ml-2 text-lg text-neutral-500 line-through">
									{formattedCompareAtPrice}
								</span>
								<span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
									{Math.round((1 - price / compareAtPrice) * 100)}% OFF
								</span>
							</>
						)}
					</div>

					{product.descriptionHtml && (
						<div
							className="prose prose-neutral prose-sm max-w-none mb-8 text-neutral-700 leading-relaxed"
							dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
						/>
					)}

					{product.variants && product.variants.length > 1 && (
						<div className="mb-6">
							<h3 className="text-sm font-medium text-neutral-900 mb-3">Variant</h3>
							<div className="flex flex-wrap gap-2">
								{product.variants.map((variant) => (
									<button
										key={variant.id}
										onClick={() => setSelectedVariantId(variant.id)}
										className={`px-4 py-2 border rounded-md text-sm font-medium transition-all duration-200 ${
											selectedVariantId === variant.id
												? "border-black bg-black text-white"
												: !variant.available
													? "border-gray-200 text-gray-400 cursor-not-allowed"
													: "border-neutral-300 text-neutral-700 hover:border-neutral-400"
										}`}
										disabled={!variant.available}
									>
										{variant.title}
										{!variant.available && " (Out of Stock)"}
									</button>
								))}
							</div>
						</div>
					)}

					{product.sellingPlanGroups && product.sellingPlanGroups.length > 0 && (
						<SubscriptionOptions
							product={product}
							selectedVariantId={activeVariant?.id || ""}
							onSubscriptionChange={setSelectedSubscription}
							selectedSubscription={selectedSubscription}
						/>
					)}

					<div className="mt-4 mb-6">
						<h3 className="text-sm font-medium text-neutral-900 mb-3">Quantity</h3>
						<div className="flex items-center space-x-3">
							<button
								onClick={() => handleQuantityChange(quantity - 1)}
								disabled={quantity <= 1}
								className="w-10 h-10 flex items-center justify-center border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								-
							</button>
							<span className="text-lg font-medium w-12 text-center">{quantity}</span>
							<button
								onClick={() => handleQuantityChange(quantity + 1)}
								className="w-10 h-10 flex items-center justify-center border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors duration-200"
							>
								+
							</button>
						</div>
					</div>

					<div className="mt-auto space-y-4">
						<button
							onClick={handleAddToCart}
							disabled={!activeVariant || !activeVariant.available}
							className="w-full bg-black text-white py-3 px-6 font-heading-medium rounded-md transition-all duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:bg-neutral-300 disabled:cursor-not-allowed"
						>
							{!activeVariant?.available
								? "Out of Stock"
								: selectedSubscription
									? "Subscribe Now"
									: "Add to Cart"}
						</button>

						<div className="text-sm text-neutral-500 space-y-2">
							<div className="flex items-center text-sm text-gray-700 space-x-1 mt-2">
								<Image
									src="/klarna.png"
									alt="Klarna"
									className="w-12"
									width={100}
									height={100}
								/>
								<Image
									src="/shop.png"
									alt="Shop"
									className="w-12"
									width={100}
									height={100}
								/>
								<Image
									src="/afterpay.png"
									alt="afterpay"
									className="w-12"
									width={100}
									height={100}
								/>
								<span>Pay in 4 interest-free installments</span>
							</div>
							<p>Secure checkout</p>
							{selectedSubscription && <p>• Cancel or modify subscription anytime</p>}
						</div>
					</div>
				</div>
			</div>

			<div className="mb-10">
				<h2 className="text-2xl font-heading-bold text-neutral-900">
					We’re Here to Redefine Human Potential
				</h2>
				<p>
					What if feeling <span className="font-semibold">Superhuman</span> wasn’t
					just a dream &mdash; but a daily decision?
				</p>
				<p>
					That’s the question that sparked{" "}
					<span className="font-semibold">twotaks</span>. We set out to create
					something different: four formulas that actually work — powered by the
					highest quality ingredients and backed by science.
				</p>
				<p>
					We combined ancient wisdom and modern performance science to design a full
					system for your mind and body:
				</p>
				<ul className="list-disc list-inside space-y-1">
					<li>
						<span className="font-medium">Energy</span> to rise strong.
					</li>
					<li>
						<span className="font-medium">Focus</span> to lead with clarity.
					</li>
					<li>
						<span className="font-medium">Immunity</span> to stay resilient.
					</li>
					<li>
						<span className="font-medium">Rest</span> to recover deeply.
					</li>
				</ul>
				<p>
					From that vision, <span className="font-semibold">Super Morning</span>,{" "}
					<span className="font-semibold">Super Brain</span>,{" "}
					<span className="font-semibold">Super Immune</span>, and{" "}
					<span className="font-semibold">Super Sleep</span> were born.
				</p>
				<p>
					Today, we’re not just building supplements. We’re building a movement —
					powered by people who believe that being superhuman isn’t fiction.
				</p>
				<p>Ready for your next step?</p>
			</div>

			{mainProductsCarousel.hasOwnProperty(product.handle) &&
				mainProductsCarousel[product.handle]?.length > 0 &&
				viewport === "desktop" &&
				mainProductsCarousel.hasOwnProperty(product.handle) && (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 mb-20">
						{mainProductsCarousel[product.handle].map((image, index) => (
							<Image
								key={index}
								src={image.url}
								alt={image.alt}
								className="w-full h-auto rounded-lg"
								width={1000}
								height={1000}
							/>
						))}
					</div>
				)}

			<div className="bg-gray-100 py-10 px-6 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen mt-24">
				<div className="max-w-5xl mx-auto md:text-right text-neutral-800 space-y-4">
					<h3 className="text-lg font-semibold">Checkout with confidence</h3>
					<ul className="space-y-3">
						{[
							{
								text: "Backed by our ",
								link: { href: "/guarantee", label: "Love-It Guarantee" },
							},
							{ text: "Easy and convenient", bold: true },
							{
								text: "Great support by phone, chat, or email",
								highlight: "Great support",
							},
							{ text: "Secure & encrypted checkout", highlight: "Secure & encrypted" },
						].map((item, idx) => (
							<li
								key={idx}
								className="flex items-start justify-start md:justify-end text-sm"
							>
								<svg
									className="w-4 h-4 mt-1 mr-2 text-green-600 shrink-0"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								<span>
									{item.link ? (
										<>
											{item.text}
											<a
												href={item.link.href}
												className="underline hover:text-neutral-600"
											>
												{item.link.label}
											</a>
										</>
									) : item.highlight ? (
										<>
											<span className="font-semibold">{item.highlight}</span>
											{item.text.replace(item.highlight, "")}
										</>
									) : item.bold ? (
										<span className="font-semibold">{item.text}</span>
									) : (
										item.text
									)}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>

			{product && <ProductReviews handle={product.handle} />}

			{productIngredients.length > 0 && (
				<div className="my-16">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
						<div>
							<h2 className="text-2xl font-heading-bold text-neutral-900">
								Unleash Your Superhuman Self
							</h2>
							<p className="text-sm font-medium text-neutral-900 px-4 py-2">
								Every capsule is a tool and every formula is a system. So, every day is
								a chance to feel unstoppable. At twotaks, we blend cutting-edge science
								with ancient wisdom to deliver real results — without shortcuts. These
								are the 28 ingredients behind your superhuman upgrade.
							</p>
						</div>

						<Link
							href="/ingredients"
							className="text-sm font-medium text-neutral-900 border border-neutral-300 rounded-full px-4 py-2 hover:bg-neutral-50 transition-colors"
						>
							View all ingredients
						</Link>
					</div>

					{showDragHint && (
						<div className="flex items-center justify-center gap-2 mb-4 text-neutral-500 text-sm bg-neutral-50 py-2 px-3 rounded-lg shadow-sm">
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8 13H16M5 7H19M8 17H16"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<span>Drag horizontally to explore ingredients</span>
							<svg
								className="ml-1 animate-drag-hint"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M17 8L21 12M21 12L17 16M21 12H3"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					)}

					<div className="relative">
						<div
							id="ingredients-carousel"
							className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide cursor-grab select-none"
							onTouchStart={(e) => {
								// Store the initial touch position
								const touchDownAt = e.touches[0].clientX;
								const carousel = e.currentTarget;
								carousel.dataset.touchStartX = touchDownAt.toString();
							}}
							onTouchEnd={(e) => {
								// Get the final touch position
								const carousel = e.currentTarget;
								const touchStartX = parseInt(carousel.dataset.touchStartX || "0");
								const touchEndX = e.changedTouches[0].clientX;
								const diff = touchStartX - touchEndX;

								// If the swipe was significant, scroll the carousel
								if (Math.abs(diff) > 50) {
									carousel.scrollBy({
										left: diff > 0 ? 200 : -200,
										behavior: "smooth",
									});
								}
							}}
							onMouseDown={(e) => {
								const carousel = e.currentTarget;
								carousel.dataset.isDown = "true";
								carousel.dataset.startX = e.pageX.toString();
								carousel.dataset.scrollLeft = carousel.scrollLeft.toString();
								carousel.classList.add("cursor-grabbing");
								setShowDragHint(false);
							}}
							onMouseLeave={(e) => {
								const carousel = e.currentTarget;
								carousel.dataset.isDown = "false";
								carousel.classList.remove("cursor-grabbing");
							}}
							onMouseUp={(e) => {
								const carousel = e.currentTarget;
								carousel.dataset.isDown = "false";
								carousel.classList.remove("cursor-grabbing");
							}}
							onMouseMove={(e) => {
								const carousel = e.currentTarget;
								if (carousel.dataset.isDown !== "true") return;
								e.preventDefault();

								const startX = parseInt(carousel.dataset.startX || "0");
								const scrollLeft = parseInt(carousel.dataset.scrollLeft || "0");
								const x = e.pageX;
								const walk = (x - startX) * 1.5; // Reduced scroll speed multiplier for more precise control
								carousel.scrollLeft = scrollLeft - walk;
							}}
						>
							<div className="flex space-x-6 min-w-max">
								{productIngredients.map((ingredient) => (
									<div
										key={ingredient.id}
										className="w-72 md:w-80 flex-shrink-0 bg-neutral-50 rounded-lg p-3 md:p-4 ingredient-card relative"
										id={ingredient.id}
									>
										<div className="aspect-square relative overflow-hidden bg-white rounded-lg mb-4">
											<Image
												src={ingredient.image}
												alt={ingredient.name}
												fill
												className="object-cover transition-transform hover:scale-105 duration-500 rounded-md pointer-events-none"
												sizes="(max-width: 768px) 100vw, 256px"
											/>
										</div>
										<h3 className="text-lg font-medium font-heading-medium text-neutral-900 mb-1 line-clamp-2">
											{ingredient.name}
										</h3>
										<div className="border-t border-neutral-200 pt-3 mt-2">
											<div className="text-xs text-neutral-600 font-medium uppercase mb-1">
												Key Function
											</div>
											<div className="text-neutral-900 text-sm line-clamp-2 min-h-[2.5rem]">
												{ingredient.keyFunction ||
													ingredient.description.substring(
														0,
														ingredient.description.indexOf(".") + 1,
													)}
												<div className="mt-1 text-xs text-neutral-500">
													Found in {ingredient.category}
												</div>
											</div>
										</div>
										<div className="flex justify-end">
											<Link
												href={`/ingredients#${ingredient.id}`}
												className="mt-3 flex items-center justify-center w-8 h-8 rounded-full border border-neutral-300 text-neutral-600 hover:bg-white hover:shadow-sm transition-all hover:scale-110"
												aria-label={`Learn more about ${ingredient.name}`}
											>
												<span className="sr-only">Learn more about {ingredient.name}</span>
												<svg
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M12 4V20M4 12H20"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</Link>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}

			{viewport == "desktop" ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
					<Image
						src="/1.jpg"
						alt="Formulas for superhumans"
						className="w-full h-auto rounded-lg"
						width={1000}
						height={1000}
					/>
					<Image
						src="/2.jpg"
						alt="How to take TwoTaks"
						className="w-full h-auto rounded-lg"
						width={1000}
						height={1000}
					/>
					<Image
						src="/3.jpg"
						alt="Superhuman standards only"
						className="w-full h-auto rounded-lg"
						width={1000}
						height={1000}
					/>
				</div>
			) : (
				<div className="mt-10">
					<ProductPageCarousel
						autoPlay={false}
						showStars={false}
						aspect="9/16"
						images={[
							{
								id: "/1.jpg",
								url: "/1.jpg",
								alt: "Formulas for superhumans",
							},
							{
								id: "/2.jpg",
								url: "/2.jpg",
								alt: "How to take TwoTaks",
							},
							{
								id: "/3.jpg",
								url: "/3.jpg",
								alt: "Superhuman standards only",
							},
						]}
					/>
				</div>
			)}

			<div className="mt-16 text-center">
				<h3 className="text-2xl md:text-3xl font-heading-bold mb-4">
					How We Build Superhuman Quality
				</h3>
				<p className="text-gray-600 max-w-2xl mx-auto mb-6">
					Inside every capsule: science, care, and clean power.
				</p>
				<p className="text-gray-600 max-w-2xl mx-auto mb-6">
					Go behind the scenes to discover how we guarantee the quality of every
					product—from rigorous testing to the premium ingredients we choose.
				</p>

				<div className="mt-8">
					<div className="mt-10 grid md:grid-cols-2 gap-8">
						<div className="rounded-lg overflow-hidden">
							<div className="relative">
								<div className="w-full aspect-video bg-gray-100 relative overflow-hidden">
									<video
										ref={video1Ref}
										className="w-full aspect-video"
										controls
										playsInline
										poster="/images/prev-2.png"
									>
										<source
											src="https://cdn.shopify.com/videos/c/o/v/5441b095b0f54d83994e7b4f9e8df7b1.mov"
											type="video/mp4"
										/>
										Your browser does not support the video tag.
									</video>
								</div>
							</div>
							<div className="p-4 bg-white">
								<h3 className="text-xl font-semibold text-gray-900">
									Quality Control Process
								</h3>
								<p className="text-gray-600 mt-2">
									Discover how we ensure every capsule meets the highest standards—safe,
									effective, and consistent.
								</p>
							</div>
						</div>

						<div className="rounded-lg overflow-hidden">
							<div className="relative">
								<div className="w-full aspect-video bg-gray-100 relative overflow-hidden">
									<video
										ref={video2Ref}
										className="w-full aspect-video"
										controls
										playsInline
										poster="/images/prev-1.png"
									>
										<source
											src="https://cdn.shopify.com/videos/c/o/v/51890e344c7247a6b4145afe1f1027ba.mov"
											type="video/mp4"
										/>
										Your browser does not support the video tag.
									</video>
								</div>
							</div>
							<div className="p-4 bg-white">
								<h3 className="text-xl font-semibold text-gray-900">
									Premium Ingredients
								</h3>
								<p className="text-gray-600 mt-2">
									Take a closer look at the ingredients behind our formulas—and why only
									the best make it into your routine.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{relatedProducts.length > 0 && (
				<div className="mt-24 pt-12 border-t border-neutral-200">
					<h2 className="text-2xl font-heading-medium mb-8 text-neutral-900">
						You might also like
					</h2>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{relatedProducts.map((relatedProduct) => (
							<ProductCard key={relatedProduct.id} product={relatedProduct} />
						))}
					</div>
				</div>
			)}
			<FAQ className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gray-50 mt-24" />
		</main>
	);
}
