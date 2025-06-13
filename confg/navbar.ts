import { NavbarItems } from "../components/Navbar";

export const navbarConfig: NavbarItems = [
	{
		label: "Shop",
		href: "/daily-health",
		hasSubmenu: true,
		subItems: [
			{ label: "Super Morning", href: "/daily-health" },
			{ label: "Super Immune", href: "/rest-recovery" },
			{ label: "Super Brain", href: "/bundles" },
			{ label: "Super Sleep", href: "/energy" },
			{ label: "Super Human Bundle", href: "/bundles" },
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
