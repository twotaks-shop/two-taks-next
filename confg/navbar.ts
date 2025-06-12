import { NavbarItems } from "../components/Navbar";

export const navbarConfig: NavbarItems = [
	{
		label: "Daily Health",
		href: "/daily-health",
		hasSubmenu: true,
		subItems: [
			{ label: "Daily Health", href: "/daily-health" },
			{ label: "Rest & Recovery", href: "/rest-recovery" },
			{ label: "Bundles", href: "/bundles" },
			{ label: "Shop All", href: "/shop" },
		],
	},
	{
		label: "Rest & Recovery",
		href: "/rest-recovery",
		hasSubmenu: true,
		subItems: [
			{ label: "Daily Health", href: "/daily-health" },
			{ label: "Rest & Recovery", href: "/rest-recovery" },
			{ label: "Bundles", href: "/bundles" },
			{ label: "Shop All", href: "/shop" },
		],
	},
	{
		label: "Bundles",
		href: "/bundles",
		hasSubmenu: true,
		subItems: [
			{ label: "Daily Health", href: "/daily-health" },
			{ label: "Rest & Recovery", href: "/rest-recovery" },
			{ label: "Bundles", href: "/bundles" },
			{ label: "Shop All", href: "/shop" },
		],
	},
	{
		label: "Shop All",
		href: "/shop",
		hasSubmenu: true,
		subItems: [
			{ label: "Daily Health", href: "/daily-health" },
			{ label: "Rest & Recovery", href: "/rest-recovery" },
			{ label: "Bundles", href: "/bundles" },
			{ label: "Shop All", href: "/shop" },
		],
	},
];
