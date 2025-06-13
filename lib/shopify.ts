import Client from "shopify-buy";

const domain =
	process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "your-store.myshopify.com";
const storefrontAccessToken =
	process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
	"your-storefront-access-token";

export const shopifyClient = Client.buildClient({
	domain,
	storefrontAccessToken,
	apiVersion: "2025-01",
});

interface RawShopifyImage {
	id: string;
	src: string;
	altText: string | null;
}

interface RawShopifyVariant {
	id: string;
	title: string;
	price: {
		amount: string;
	};
	availableForSale: boolean;
}

interface RawShopifyProduct {
	id: string;
	title: string;
	handle: string;
	description: string;
	descriptionHtml: string;
	images: RawShopifyImage[];
	variants: RawShopifyVariant[];
}

export interface ShopifyProduct {
	id: string;
	title: string;
	handle: string;
	description: string;
	descriptionHtml: string;
	images: Array<{
		id: string;
		src: string;
		altText: string | null;
	}>;
	variants: Array<{
		id: string;
		title: string;
		price: string;
		available: boolean;
	}>;
}

export interface ShopifyCollection {
	id: string;
	title: string;
	handle: string;
	description: string;
	descriptionHtml: string;
	image: {
		src: string;
		altText: string | null;
	} | null;
}

export interface PaginationInfo {
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	startCursor: string;
	endCursor: string;
}

export async function getCollections(): Promise<ShopifyCollection[]> {
	try {
		const collections = await shopifyClient.collection.fetchAll();

		return JSON.parse(JSON.stringify(collections));
	} catch (error) {
		console.error("Error fetching collections:", error);
		return [];
	}
}

export async function getCollection(
	handle: string,
): Promise<ShopifyCollection | null> {
	try {
		const collection = await shopifyClient.collection.fetchByHandle(handle);

		if (!collection) return null;

		return JSON.parse(JSON.stringify(collection));
	} catch (error) {
		console.error(`Error fetching collection with handle ${handle}:`, error);
		return null;
	}
}

export async function getProductsInCollection(
	collectionId: string,
	pageSize: number = 12,
	cursor: string | null = null,
): Promise<{
	products: ShopifyProduct[];
	pageInfo: PaginationInfo;
}> {
	try {
		const collection =
			await shopifyClient.collection.fetchWithProducts(collectionId);

		const transformedProducts: ShopifyProduct[] = (
			collection.products as unknown as RawShopifyProduct[]
		).map((product) => ({
			id: product.id,
			title: product.title,
			handle: product.handle,
			description: product.description || "",
			descriptionHtml: product.descriptionHtml || "",
			images: product.images.map((image) => ({
				id: image.id || "",
				src: image.src,
				altText: image.altText || null,
			})),
			variants: product.variants.map((variant) => ({
				id: variant.id,
				title: variant.title,
				price: variant.price?.amount || "0",
				available: variant.availableForSale || false,
			})),
		}));

		const pageInfo: PaginationInfo = {
			hasNextPage: transformedProducts.length === pageSize, 
			hasPreviousPage: cursor !== null,
			startCursor: "", 
			endCursor: "",
		};

		return {
			products: transformedProducts,
			pageInfo,
		};
	} catch (error) {
		console.error(
			`Error fetching products for collection ${collectionId}:`,
			error,
		);
		return {
			products: [],
			pageInfo: {
				hasNextPage: false,
				hasPreviousPage: false,
				startCursor: "",
				endCursor: "",
			},
		};
	}
}

export async function getProduct(
	handle: string,
): Promise<ShopifyProduct | null> {
	try {
		const product = await shopifyClient.product.fetchByHandle(handle);

		const rawProduct = product as unknown as RawShopifyProduct;
		const transformedProduct: ShopifyProduct = {
			id: rawProduct.id,
			title: rawProduct.title,
			handle: rawProduct.handle,
			description: rawProduct.description || "",
			descriptionHtml: rawProduct.descriptionHtml || "",
			images: rawProduct.images.map((image) => ({
				id: image.id || "",
				src: image.src,
				altText: image.altText || null,
			})),
			variants: rawProduct.variants.map((variant) => ({
				id: variant.id,
				title: variant.title,
				price: variant.price?.amount || "0",
				available: variant.availableForSale || false,
			})),
		};

		return transformedProduct;
	} catch (error) {
		console.error(`Error fetching product with handle ${handle}:`, error);
		return null;
	}
}

export async function createCheckout(
	items: Array<{ variantId: string; quantity: number }>,
) {
	try {
		const lineItems = items.map((item) => ({
			variantId: item.variantId,
			quantity: item.quantity,
		}));

		const checkout = await shopifyClient.checkout.create();
		const checkoutWithItems = await shopifyClient.checkout.addLineItems(
			checkout.id,
			lineItems,
		);

		return checkoutWithItems.webUrl;
	} catch (error) {
		console.error("Error creating checkout:", error);
		throw error;
	}
}
