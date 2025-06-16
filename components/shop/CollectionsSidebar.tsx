"use client";

import Link from "next/link";
import { ShopifyCollection } from "../../lib/types";

interface CollectionsSidebarProps {
	collections: ShopifyCollection[];
	activeCollection: string | null;
}

export default function CollectionsSidebar({
	collections,
	activeCollection,
}: CollectionsSidebarProps) {
	return (
		<aside className="w-full lg:w-64 flex-shrink-0">
			<div className="sticky top-24 mb-8">
				<h2 className="text-xl font-heading-medium mb-6 text-neutral-900">
					Collections
				</h2>

				<ul className="space-y-2">
					{collections.map((collection) => (
						<li key={collection.id}>
							<Link
								href={`/shop/collections/${collection.handle}`}
								className={`block py-3 px-4 transition-all duration-200 font-heading-regular ${
									activeCollection === collection.handle
										? "bg-black text-white"
										: "text-neutral-700 hover:bg-neutral-100"
								}`}
							>
								{collection.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</aside>
	);
}
