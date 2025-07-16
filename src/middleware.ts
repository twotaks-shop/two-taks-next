import { NextRequest, NextResponse } from "next/server";

export function middleware(r: NextRequest) {
	const redirectMap = {
		"/brain": "/shop/products/super-brain",
		"/immune": "/shop/products/super-immune",
		"/morning": "/shop/products/super-morning",
		"/sleep": "/shop/products/super-sleep",
	};

	const { pathname } = r.nextUrl;

	if (redirectMap[pathname]) {
		return NextResponse.redirect(new URL(redirectMap[pathname], r.url));
	}

	return NextResponse.next();
}
