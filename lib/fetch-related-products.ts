import { ShopifyProduct } from "./types";
import { graphqlRequest } from "./shopify-core";

/**
 * GraphQL query to fetch related products for a given product ID
 */
const RELATED_PRODUCTS_QUERY = `
  query getRelatedProducts($productId: ID!, $limit: Int!) {
    product(id: $productId) {
      collections(first: 1) {
        edges {
          node {
            products(first: $limit, sortKey: BEST_SELLING) {
              edges {
                node {
                  id
                  title
                  handle
                  description
                  descriptionHtml
                  availableForSale
                  images(first: 1) {
                    edges {
                      node {
                        id
                        url
                        altText
                      }
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        id
                        title
                        availableForSale
                        price {
                          amount
                          currencyCode
                        }
                        compareAtPrice {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                  sellingPlanGroups(first: 1) {
                    edges {
                      node {
                        name
                        sellingPlans(first: 1) {
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
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetches related products for a given product ID
 *
 * @param productId - The ID of the product to find related items for
 * @param limit - Maximum number of related products to return (default: 4)
 * @param excludeCurrentProduct - Whether to exclude the current product from results (default: true)
 * @returns Array of related ShopifyProducts or empty array if none found
 */
export async function fetchRelatedProducts(
  productId: string,
  limit: number = 4,
  excludeCurrentProduct: boolean = true
): Promise<ShopifyProduct[]> {
  try {
    // Add 1 to limit if we're excluding current product to ensure we get the requested amount
    const queryLimit = excludeCurrentProduct ? limit + 1 : limit;

    const data = await graphqlRequest(RELATED_PRODUCTS_QUERY, {
      productId,
      limit: queryLimit
    });

    if (!data?.product?.collections?.edges?.[0]?.node?.products?.edges) {
      return [];
    }

    // Map the GraphQL response to our ShopifyProduct type
    let relatedProducts = data.product.collections.edges[0].node.products.edges
      .map((edge: any) => ({
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
          compareAtPrice: variantEdge.node.compareAtPrice?.amount,
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

    // Filter out the current product if requested
    if (excludeCurrentProduct) {
      relatedProducts = relatedProducts.filter(
        (product: any) => product.id !== productId
      );
    }

    // Limit to requested number of products
    return relatedProducts.slice(0, limit);
  } catch {
    return [];
  }
}
