const domain =
	process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "your-store.myshopify.com";
const storefrontAccessToken =
	process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
	"your-storefront-access-token";

const STOREFRONT_API_URL = `https://${domain}/api/2025-01/graphql.json`;

async function graphqlRequest(query: string, variables: any = {}) {
	const response = await fetch(STOREFRONT_API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-Shopify-Storefront-Access-Token": storefrontAccessToken,
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	if (!response.ok) {
		throw new Error(`GraphQL request failed: ${response.statusText}`);
	}

	const data = await response.json();

	if (data.errors) {
		throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
	}

	return data.data;
}

const COLLECTIONS_QUERY = `
  query getCollections {
    collections(first: 50) {
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

const COLLECTION_QUERY = `
  query getCollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      image {
        url
        altText
      }
    }
  }
`;

const COLLECTION_PRODUCTS_QUERY = `
  query getCollectionProducts($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      products(first: $first, after: $after) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            availableForSale
            images(first: 10) {
              edges {
                node {
                  id
                  url
                  altText
                }
              }
            }
            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
            sellingPlanGroups(first: 10) {
              edges {
                node {
                  name
                  sellingPlans(first: 10) {
                    edges {
                      node {
                        id
                        name
                        description
                        priceAdjustments {
                          adjustmentValue {
                            ... on SellingPlanPercentagePriceAdjustment {
                              adjustmentPercentage
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

const PRODUCT_QUERY = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      availableForSale
      images(first: 10) {
        edges {
          node {
            id
            url
            altText
          }
        }
      }
      variants(first: 50) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
      sellingPlanGroups(first: 10) {
        edges {
          node {
            name
            sellingPlans(first: 10) {
              edges {
                node {
                  id
                  name
                  description
                  priceAdjustments {
                    adjustmentValue {
                      ... on SellingPlanPercentagePriceAdjustment {
                        adjustmentPercentage
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CHECKOUT_CREATE_MUTATION = `
  mutation ($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        firstName
        lastName
        email
        acceptsMarketing
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_RENEW_MUTATION = `
  mutation customerAccessTokenRenew($customerAccessToken: String!) {
    customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_DELETE_MUTATION = `
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      deletedCustomerAccessTokenId
      userErrors {
        field
        message
      }
    }
  }
`;

const CUSTOMER_QUERY = `
  query customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      phone
      acceptsMarketing
      createdAt
      updatedAt
      addresses(first: 10) {
        edges {
          node {
            id
            firstName
            lastName
            company
            address1
            address2
            city
            province
            zip
            country
            phone
          }
        }
      }
    }
  }
`;

const CUSTOMER_ORDERS_QUERY = `
  query customerOrders($customerAccessToken: String!, $first: Int!, $after: String) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: $first, after: $after, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            totalPrice {
              amount
              currencyCode
            }
            subtotalPrice {
              amount
              currencyCode
            }
            totalTax {
              amount
              currencyCode
            }
            totalShippingPrice {
              amount
              currencyCode
            }
            shippingAddress {
              firstName
              lastName
              address1
              address2
              city
              province
              zip
              country
            }
            lineItems(first: 50) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      id
                      title
                      handle
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

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

export interface PaginationInfo {
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	startCursor: string;
	endCursor: string;
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

export async function getCollections(): Promise<ShopifyCollection[]> {
	try {
		const data = await graphqlRequest(COLLECTIONS_QUERY);

		return data.collections.edges.map((edge: any) => ({
			id: edge.node.id,
			title: edge.node.title,
			handle: edge.node.handle,
			description: edge.node.description || "",
			descriptionHtml: edge.node.descriptionHtml || "",
			image: edge.node.image
				? {
						url: edge.node.image.url,
						altText: edge.node.image.altText,
					}
				: null,
		}));
	} catch (error) {
		console.error("Error fetching collections:", error);
		return [];
	}
}

export async function getCollection(
	handle: string,
): Promise<ShopifyCollection | null> {
	try {
		const data = await graphqlRequest(COLLECTION_QUERY, { handle });

		if (!data.collection) return null;

		return {
			id: data.collection.id,
			title: data.collection.title,
			handle: data.collection.handle,
			description: data.collection.description || "",
			descriptionHtml: data.collection.descriptionHtml || "",
			image: data.collection.image
				? {
						url: data.collection.image.url,
						altText: data.collection.image.altText,
					}
				: null,
		};
	} catch (error) {
		console.error(`Error fetching collection with handle ${handle}:`, error);
		return null;
	}
}

export async function getProductsInCollection(
	handle: string,
	pageSize: number = 12,
	cursor: string | null = null,
): Promise<{
	products: ShopifyProduct[];
	pageInfo: PaginationInfo;
}> {
	try {
		const data = await graphqlRequest(COLLECTION_PRODUCTS_QUERY, {
			handle,
			first: pageSize,
			after: cursor,
		});

		if (!data.collection) {
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

		const products = data.collection.products.edges.map((edge: any) => ({
			id: edge.node.id,
			title: edge.node.title,
			handle: edge.node.handle,
			description: edge.node.description || "",
			descriptionHtml: edge.node.descriptionHtml || "",
			availableForSale: edge.node.availableForSale,
			images: edge.node.images.edges.map((imgEdge: any) => ({
				id: imgEdge.node.id,
				url: imgEdge.node.url,
				altText: imgEdge.node.altText,
			})),
			variants: edge.node.variants.edges.map((variantEdge: any) => ({
				id: variantEdge.node.id,
				title: variantEdge.node.title,
				price: variantEdge.node.price.amount,
				available: variantEdge.node.availableForSale,
			})),
			sellingPlanGroups:
				edge.node.sellingPlanGroups?.edges.map((groupEdge: any) => ({
					id: groupEdge.node.name,
					name: groupEdge.node.name,
					sellingPlans: groupEdge.node.sellingPlans.edges.map((planEdge: any) => ({
						id: planEdge.node.id,
						name: planEdge.node.name,
						description: planEdge.node.description || "",
						priceAdjustments: planEdge.node.priceAdjustments.map(
							(adjustment: any) => ({
								adjustmentType: "PERCENTAGE",
								adjustmentValue: {
									percentage: adjustment.adjustmentValue.adjustmentPercentage || 10,
									fixedAmount: null,
								},
							}),
						),
					})),
				})) || [],
		}));

		return {
			products,
			pageInfo: data.collection.products.pageInfo,
		};
	} catch (error) {
		console.error(`Error fetching products for collection ${handle}:`, error);
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
		const data = await graphqlRequest(PRODUCT_QUERY, { handle });

		if (!data.product) return null;

		return {
			id: data.product.id,
			title: data.product.title,
			handle: data.product.handle,
			description: data.product.description || "",
			descriptionHtml: data.product.descriptionHtml || "",
			availableForSale: data.product.availableForSale,
			images: data.product.images.edges.map((edge: any) => ({
				id: edge.node.id,
				url: edge.node.url,
				altText: edge.node.altText,
			})),
			variants: data.product.variants.edges.map((edge: any) => ({
				id: edge.node.id,
				title: edge.node.title,
				price: edge.node.price.amount,
				available: edge.node.availableForSale,
			})),
			sellingPlanGroups:
				data.product.sellingPlanGroups?.edges.map((groupEdge: any) => ({
					id: groupEdge.node.name,
					name: groupEdge.node.name,
					sellingPlans: groupEdge.node.sellingPlans.edges.map((planEdge: any) => ({
						id: planEdge.node.id,
						name: planEdge.node.name,
						description: planEdge.node.description || "",
						priceAdjustments: planEdge.node.priceAdjustments.map(
							(adjustment: any) => ({
								adjustmentType: "PERCENTAGE",
								adjustmentValue: {
									percentage: adjustment.adjustmentValue.adjustmentPercentage || 10,
									fixedAmount: null,
								},
							}),
						),
					})),
				})) || [],
		};
	} catch (error) {
		console.error(`Error fetching product with handle ${handle}:`, error);
		return null;
	}
}

export async function createCheckout(
	items: Array<{ variantId: string; quantity: number; sellingPlanId?: string }>,
) {
	try {
		const lines = items.map((item) => ({
			merchandiseId: item.variantId,
			quantity: item.quantity,
			...(item.sellingPlanId && { sellingPlanId: item.sellingPlanId }),
		}));

		const data = await graphqlRequest(CHECKOUT_CREATE_MUTATION, {
			input: { lines },
		});

		if (data.cartCreate.userErrors.length > 0) {
			throw new Error(data.cartCreate.userErrors[0].message);
		}

		return data.cartCreate.cart.checkoutUrl;
	} catch (error) {
		console.error("Error creating checkout:", error);
		throw error;
	}
}

export async function createCustomer(input: CustomerCreateInput): Promise<{
	customer?: ShopifyCustomer;
	errors?: Array<{ field: string; message: string; code: string }>;
}> {
	try {
		const data = await graphqlRequest(CUSTOMER_CREATE_MUTATION, { input });

		if (data.customerCreate.customerUserErrors.length > 0) {
			return {
				errors: data.customerCreate.customerUserErrors,
			};
		}

		return {
			customer: data.customerCreate.customer,
		};
	} catch (error) {
		console.error("Error creating customer:", error);
		throw error;
	}
}

export async function customerLogin(input: CustomerLoginInput): Promise<{
	accessToken?: ShopifyCustomerAccessToken;
	errors?: Array<{ field: string; message: string; code: string }>;
}> {
	try {
		const data = await graphqlRequest(CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION, {
			input,
		});

		if (data.customerAccessTokenCreate.customerUserErrors.length > 0) {
			return {
				errors: data.customerAccessTokenCreate.customerUserErrors,
			};
		}

		return {
			accessToken: data.customerAccessTokenCreate.customerAccessToken,
		};
	} catch (error) {
		console.error("Error logging in customer:", error);
		throw error;
	}
}

export async function customerLogout(
	customerAccessToken: string,
): Promise<boolean> {
	try {
		await graphqlRequest(CUSTOMER_ACCESS_TOKEN_DELETE_MUTATION, {
			customerAccessToken,
		});
		return true;
	} catch (error) {
		console.error("Error logging out customer:", error);
		return false;
	}
}

export async function renewCustomerAccessToken(
	customerAccessToken: string,
): Promise<{
	accessToken?: ShopifyCustomerAccessToken;
	error?: string;
}> {
	try {
		const data = await graphqlRequest(CUSTOMER_ACCESS_TOKEN_RENEW_MUTATION, {
			customerAccessToken,
		});

		if (data.customerAccessTokenRenew.userErrors.length > 0) {
			return {
				error: data.customerAccessTokenRenew.userErrors[0].message,
			};
		}

		return {
			accessToken: data.customerAccessTokenRenew.customerAccessToken,
		};
	} catch (error) {
		console.error("Error renewing customer access token:", error);
		throw error;
	}
}

export async function getCustomer(
	customerAccessToken: string,
): Promise<ShopifyCustomer | null> {
	try {
		const data = await graphqlRequest(CUSTOMER_QUERY, { customerAccessToken });

		if (!data.customer) {
			return null;
		}

		return {
			...data.customer,
			addresses: data.customer.addresses.edges.map((edge: any) => edge.node),
		};
	} catch (error) {
		console.error("Error fetching customer:", error);
		return null;
	}
}

export async function getCustomerOrders(
	customerAccessToken: string,
	first: number = 10,
	after?: string,
): Promise<OrdersResponse> {
	try {
		const data = await graphqlRequest(CUSTOMER_ORDERS_QUERY, {
			customerAccessToken,
			first,
			after,
		});

		if (!data.customer) {
			return {
				orders: [],
				pageInfo: {
					hasNextPage: false,
					hasPreviousPage: false,
					startCursor: "",
					endCursor: "",
				},
			};
		}

		const orders = data.customer.orders.edges.map((edge: any) => ({
			...edge.node,
			lineItems: edge.node.lineItems.edges.map((lineItemEdge: any) => ({
				...lineItemEdge.node,
				variant: {
					...lineItemEdge.node.variant,
					product: {
						...lineItemEdge.node.variant.product,
						images: lineItemEdge.node.variant.product.images.edges.map(
							(imgEdge: any) => ({
								url: imgEdge.node.url,
								altText: imgEdge.node.altText,
							}),
						),
					},
				},
			})),
		}));

		return {
			orders,
			pageInfo: data.customer.orders.pageInfo,
		};
	} catch (error) {
		console.error("Error fetching customer orders:", error);
		return {
			orders: [],
			pageInfo: {
				hasNextPage: false,
				hasPreviousPage: false,
				startCursor: "",
				endCursor: "",
			},
		};
	}
}
