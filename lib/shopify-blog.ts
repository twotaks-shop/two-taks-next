import { graphqlRequest } from "./shopify";

const BLOGS_QUERY = `
  query getBlogs {
    blogs(first: 10) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;

const BLOG_ARTICLES_QUERY = `
  query getBlogArticles($blogHandle: String!, $first: Int!, $after: String) {
    blog(handle: $blogHandle) {
      title
      handle
      articles(first: $first, after: $after, sortKey: PUBLISHED_AT, reverse: true) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            handle
            publishedAt
            excerpt
            image {
              url
              altText
            }
            author {
              name
            }
            tags
            content
          }
        }
      }
    }
  }
`;

const BLOG_ARTICLE_QUERY = `
  query getBlogArticle($blogHandle: String!, $articleHandle: String!) {
    blog(handle: $blogHandle) {
      title
      handle
      articleByHandle(handle: $articleHandle) {
        id
        title
        handle
        publishedAt
        image {
          url
          altText
        }
        author {
          name
        }
        tags
        content
        contentHtml
        seo {
          title
          description
        }
      }
    }
  }
`;

export interface ShopifyBlog {
	id: string;
	title: string;
	handle: string;
}

export interface ShopifyImage {
	url: string;
	altText: string | null;
	width?: number;
	height?: number;
}

export interface ShopifyAuthor {
	name: string;
	email?: string;
	bio?: string;
}

export interface ShopifySEO {
	title: string;
	description: string;
	image?: ShopifyImage;
}

export interface ShopifyArticle {
	id: string;
	title: string;
	handle: string;
	publishedAt: string;
	excerpt?: string;
	image?: ShopifyImage;
	author?: ShopifyAuthor;
	tags: string[];
	content?: string;
	contentHtml?: string;
	seo?: ShopifySEO;
}

export interface PageInfo {
	hasNextPage: boolean;
	endCursor: string;
}

export interface BlogArticlesResponse {
	pageInfo: PageInfo;
	articles: ShopifyArticle[];
}

/**
 * Obtiene todos los blogs disponibles en la tienda
 * @returns Promesa que resuelve a un array de blogs
 */
export async function getBlogs(): Promise<ShopifyBlog[]> {
	try {
		const response = await graphqlRequest(BLOGS_QUERY);
		return response.blogs.edges.map((edge: any) => edge.node);
	} catch (error) {
		console.error("Error fetching blogs:", error);
		return [];
	}
}

/**
 * Obtiene artículos de un blog específico por su handle
 * @param blogHandle - El handle del blog del que se obtendrán los artículos
 * @param first - Número de artículos a obtener (por defecto 10)
 * @param after - Cursor para paginación (opcional)
 * @returns Promesa que resuelve a una respuesta con artículos del blog y datos de paginación
 */
export async function getBlogArticles(
	blogHandle: string,
	first: number = 10,
	after: string | null = null,
): Promise<BlogArticlesResponse> {
	try {
		const variables = {
			blogHandle,
			first,
			after,
		};

		const response = await graphqlRequest(BLOG_ARTICLES_QUERY, variables);
		const blog = response.blog;

		return {
			pageInfo: blog.articles.pageInfo,
			articles: blog.articles.edges.map((edge: any) => edge.node),
		};
	} catch (error) {
		console.error("Error fetching blog articles:", error);
		return {
			pageInfo: {
				hasNextPage: false,
				endCursor: "",
			},
			articles: [],
		};
	}
}

/**
 * Obtiene un artículo específico por su handle
 * @param blogHandle - El handle del blog al que pertenece el artículo
 * @param articleHandle - El handle del artículo a obtener
 * @returns Promesa que resuelve al artículo encontrado o null si no existe
 */
export async function getBlogArticle(
	blogHandle: string,
	articleHandle: string,
): Promise<ShopifyArticle | null> {
	try {
		const variables = {
			blogHandle,
			articleHandle,
		};

		const response = await graphqlRequest(BLOG_ARTICLE_QUERY, variables);
		return response.blog.articleByHandle;
	} catch (error) {
		console.error("Error fetching blog article:", error);
		return null;
	}
}
