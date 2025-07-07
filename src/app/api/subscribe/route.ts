import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { email } = await req.json();

	if (!email) {
		return NextResponse.json({ error: "Email is required" }, { status: 400 });
	}

	const currentDate = new Date().toISOString();

	const mutation = `
  mutation customerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        emailMarketingConsent {
          marketingState
          consentUpdatedAt
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

	const variables = {
		input: {
			email,
			emailMarketingConsent: {
				consentUpdatedAt: currentDate,
				marketingOptInLevel: "SINGLE_OPT_IN",
				marketingState: "SUBSCRIBED",
			},
		},
	};

	try {
		const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
		const accessToken = process.env.SHOPIFY_ADMIN_API_TOKEN;

		const response = await fetch(
			`https://${shopifyDomain}/admin/api/2025-04/graphql.json`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-Shopify-Access-Token": accessToken!,
				},
				body: JSON.stringify({ query: mutation, variables }),
			},
		);

		const result = await response.json();

		if (result.errors || result.data?.customerCreate?.userErrors?.length) {
			return NextResponse.json({ error: result }, { status: 400 });
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
	}
}
