export interface ShopifyProduct {
	id: string;
	title: string;
	handle: string;
	description: string;
	descriptionHtml: string;
	availableForSale: boolean;
	images: Array<{
		id: string;
		url: string;
		altText: string | null;
	}>;
	variants: Array<{
		id: string;
		title: string;
		price: string;
		compareAtPrice?: string;
		available: boolean;
	}>;
	sellingPlanGroups?: Array<{
		id: string;
		name: string;
		sellingPlans: Array<{
			id: string;
			name: string;
			description: string;
			priceAdjustments: Array<{
				adjustmentType: string;
				adjustmentValue: {
					percentage?: number;
					fixedAmount?: {
						amount: string;
						currencyCode: string;
					};
				};
			}>;
		}>;
	}>;
}

export interface ShopifyCollection {
	id: string;
	title: string;
	handle: string;
	description: string;
	descriptionHtml: string;
	image: {
		url: string;
		altText: string | null;
	} | null;
	products?: ShopifyProduct[];
}

export interface PaginationInfo {
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	startCursor: string;
	endCursor: string;
}

export interface ProductsResponse {
	products: ShopifyProduct[];
	pageInfo: PaginationInfo;
}

export interface CollectionsResponse {
	collections: ShopifyCollection[];
}

export interface ProductPageProps {
	product: ShopifyProduct | null;
}

export interface CollectionPageProps {
	collection: ShopifyCollection | null;
	products: ShopifyProduct[];
	pageInfo: PaginationInfo;
}

export interface ShopPageProps {
	collections: ShopifyCollection[];
	featuredCollection: ShopifyCollection | null;
	featuredProducts: ShopifyProduct[];
}

export interface ShopifyCustomer {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	acceptsMarketing: boolean;
	createdAt: string;
	updatedAt: string;
	addresses: Array<{
		id: string;
		firstName: string;
		lastName: string;
		company?: string;
		address1: string;
		address2?: string;
		city: string;
		province: string;
		zip: string;
		country: string;
		phone?: string;
	}>;
}

export interface ShopifyCustomerAccessToken {
	accessToken: string;
	expiresAt: string;
}

export interface ShopifyOrder {
	id: string;
	orderNumber: number;
	processedAt: string;
	financialStatus: string;
	fulfillmentStatus: string;
	totalPrice: {
		amount: string;
		currencyCode: string;
	};
	subtotalPrice: {
		amount: string;
		currencyCode: string;
	};
	totalTax: {
		amount: string;
		currencyCode: string;
	};
	totalShippingPrice: {
		amount: string;
		currencyCode: string;
	};
	shippingAddress?: {
		firstName: string;
		lastName: string;
		address1: string;
		address2?: string;
		city: string;
		province: string;
		zip: string;
		country: string;
	};
	lineItems: Array<{
		title: string;
		quantity: number;
		variant: {
			id: string;
			title: string;
			price: {
				amount: string;
				currencyCode: string;
			};
			product: {
				id: string;
				title: string;
				handle: string;
				images: Array<{
					url: string;
					altText?: string;
				}>;
			};
		};
	}>;
}

export interface OrdersResponse {
	orders: ShopifyOrder[];
	pageInfo: PaginationInfo;
}

export interface CustomerCreateInput {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	acceptsMarketing?: boolean;
}

export interface CustomerLoginInput {
	email: string;
	password: string;
}

export interface SubscriptionOption {
	id: string;
	name: string;
	description: string;
	discount: {
		type: "percentage" | "fixed";
		value: number;
	};
	frequency: string;
}
