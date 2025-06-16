// Temporary file with updated PRODUCT_QUERY that includes compareAtPrice
export const UPDATED_PRODUCT_QUERY = `
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
            compareAtPrice {
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

// Add related products query
export const RELATED_PRODUCTS_QUERY = `
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
