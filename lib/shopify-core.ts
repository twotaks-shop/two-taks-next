// This file contains core Shopify API functionality used across the application

// Shopify Storefront API settings
const domain =
	process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
	process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN ||
	"";
const storefrontAccessToken =
	process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";

// API URL
export const STOREFRONT_API_URL = `https://${domain}/api/2023-07/graphql.json`;

/**
 * Makes a GraphQL request to the Shopify Storefront API
 *
 * @param query - GraphQL query or mutation string
 * @param variables - Variables to pass to the query
 * @returns Parsed JSON response data
 */
export async function graphqlRequest(query: string, variables = {}) {
	try {
		const response = await fetch(STOREFRONT_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Shopify-Storefront-Access-Token": storefrontAccessToken,
			},
			body: JSON.stringify({ query, variables }),
		});

		if (!response.ok) {
			throw new Error(`GraphQL request failed: ${response.statusText}`);
		}

		const responseBody = await response.json();

		if (responseBody.errors) {
			throw new Error(
				`Shopify GraphQL Error: ${JSON.stringify(responseBody.errors)}`,
			);
		}

		return responseBody.data;
	} catch (error) {
		console.error("Error making GraphQL request:", error);
		throw error;
	}
}
