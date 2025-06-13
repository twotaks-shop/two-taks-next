import { NavbarItems } from "../components/Navbar";

export const navbarConfig: NavbarItems = [
	{
		label: "Shop",
		href: "/shop",
		hasSubmenu: true,
		subItems: [
			{ label: "Super Morning", href: "/shop/collections/super-morning" },
			{ label: "Super Immune", href: "/shop/collections/super-immune" },
			{ label: "Super Brain", href: "/shop/collections/super-brain" },
			{ label: "Super Sleep", href: "/shop/collections/super-sleep" },
			{
				label: "Super Human Bundle",
				href: "/shop/collections/super-human-bundle",
			},
			{ label: "Shop All", href: "/shop" },
		],
	},
	{
		label: "Ingredients",
		href: "/rest-recovery",
		hasSubmenu: false,
	},
	{
		label: "Blog",
		href: "/blog",
		hasSubmenu: false,
	},
	{
		label: "About Us",
		href: "/bundles",
		hasSubmenu: false,
	},
];
