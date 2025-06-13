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
