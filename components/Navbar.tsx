"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useViewport } from "../hooks/useViewport";
import { navbarConfig } from "../confg/navbar";

export interface NavbarItem {
	label: string;
	href: string;
	hasSubmenu: boolean;
	subItems?: SubItem[];
}

export type NavbarItems = NavbarItem[];

export interface SubItem {
	label: string;
	href: string;
}

function Logo() {
	return (
		<Link href="/" className="flex items-center">
			<Image
				src="/twotaks-logo.png"
				alt="TwoTaks Logo"
				width={150}
				height={40}
				className="w-40"
			/>
		</Link>
	);
}

function NavItem({
	label,
	href,
	onClick,
	active = false,
	isMobile = false,
}: {
	label: string;
	href: string;
	onClick?: () => void;
	active?: boolean;
	isMobile?: boolean;
}) {
	return (
		<Link
			href={href}
			onClick={(e) => {
				if (onClick) {
					e.preventDefault();
					onClick();
				}
			}}
			className={`transition-all duration-200 tracking-wide font-league-spartan ${
				isMobile ? "block py-3 px-4 w-full text-md" : ""
			} ${
				active ? "text-black font-medium" : "text-neutral-600 hover:text-black"
			} ${!isMobile && !active ? "text-[1.2rem] leading-tight" : ""}`}
		>
			{label}
		</Link>
	);
}

function CartIcon() {
	return (
		<Link
			href="/cart"
			className="flex items-center justify-center h-10 w-10 transition-colors duration-200 hover:bg-neutral-100 rounded-full"
			aria-label="Shopping cart"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="8" cy="21" r="1" />
				<circle cx="19" cy="21" r="1" />
				<path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
			</svg>
		</Link>
	);
}

function ProfileIcon() {
	return (
		<Link
			href="/account"
			className="flex items-center justify-center h-10 w-10 transition-colors duration-200 hover:bg-neutral-100 rounded-full"
			aria-label="My account"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
				<circle cx="12" cy="7" r="4" />
			</svg>
		</Link>
	);
}

function DesktopNavbar() {
	const [activeItem, setActiveItem] = useState<NavbarItem | undefined>();
	const [isHoveringSubmenu, setIsHoveringSubmenu] = useState(false);

	const showSubmenu = (item: NavbarItem) => {
		setActiveItem(item);
	};

	const hideSubmenu = () => {
		if (!isHoveringSubmenu) {
			setActiveItem(undefined);
		}
	};

	return (
		<header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 w-full z-40">
			<div className="container mx-auto flex items-center justify-between px-6 relative h-22">
				<div className="flex-1 flex justify-start">
					<Logo />
				</div>

				<ul className="flex gap-12 h-full font-league-spartan">
					{navbarConfig.map((item, index) => (
						<li
							key={index}
							className="relative h-full flex items-center"
							onMouseEnter={() => item.hasSubmenu && showSubmenu(item)}
							onMouseLeave={() => item.hasSubmenu && hideSubmenu()}
						>
							<NavItem
								label={item.label}
								href={item.href}
								active={activeItem === item}
							/>
							{item.hasSubmenu && activeItem === item && (
								<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
							)}
						</li>
					))}
				</ul>

				<div className="flex-1 flex justify-end gap-1">
					<CartIcon />
					<ProfileIcon />
				</div>
			</div>

			{activeItem?.hasSubmenu && activeItem.subItems && (
				<div
					className="absolute left-0 right-0 bg-white border-t border-neutral-100 z-50 py-12"
					onMouseEnter={() => setIsHoveringSubmenu(true)}
					onMouseLeave={() => {
						setIsHoveringSubmenu(false);
						setActiveItem(undefined);
					}}
				>
					<div className="container mx-auto">
						<div className="flex flex-col items-start gap-3 max-w-xs ml-8">
							{activeItem.subItems.map((subItem, index) => (
								<div key={index} className="mb-4">
									<Link
										href={subItem.href}
										className="text-[1rem] leading-none font-league-spartan transition-all duration-200 text-black hover:translate-x-2"
									>
										{subItem.label}
									</Link>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</header>
	);
}

function MobileNavbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [expandedItem, setExpandedItem] = useState<NavbarItem | null>(null);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
		if (isMenuOpen) {
			document.body.style.overflow = "";
		} else {
			document.body.style.overflow = "hidden";
		}
	};

	const toggleSubmenu = (item: NavbarItem) => {
		if (expandedItem === item) {
			setExpandedItem(null);
		} else {
			setExpandedItem(item);
		}
	};

	useEffect(() => {
		return () => {
			document.body.style.overflow = "";
		};
	}, []);

	return (
		<header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 w-full z-40">
			<div className="flex items-center justify-between px-4 h-20">
				<button
					onClick={toggleMenu}
					className="flex items-center justify-center h-10 w-10 transition-colors duration-200 hover:bg-neutral-100 rounded-full"
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				>
					{isMenuOpen ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="4" y1="12" x2="20" y2="12" />
							<line x1="4" y1="6" x2="20" y2="6" />
							<line x1="4" y1="18" x2="20" y2="18" />
						</svg>
					)}
				</button>

				<div className="flex-1 flex justify-center">
					<Logo />
				</div>

				<div className="flex gap-1">
					<CartIcon />
				</div>
			</div>

			{isMenuOpen && (
				<div className="fixed inset-0 top-20 bg-white z-50 overflow-y-auto pb-16">
					<div className="py-4">
						<ul className="flex flex-col font-league-spartan">
							{navbarConfig.map((item, index) => (
								<li key={index} className="border-b border-neutral-100">
									{item.hasSubmenu ? (
										<div>
											<button
												onClick={() => toggleSubmenu(item)}
												className="flex items-center justify-between w-full py-3 px-4 text-sm font-league-spartan"
											>
												<span>{item.label}</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
													className={`transition-transform ${expandedItem === item ? "rotate-180" : ""}`}
												>
													<polyline points="6 9 12 15 18 9" />
												</svg>
											</button>

											{expandedItem === item && (
												<ul className="bg-neutral-50 py-2">
													{item.subItems?.map((subItem, subIndex) => (
														<li key={subIndex}>
															<NavItem
																label={subItem.label}
																href={subItem.href}
																isMobile={true}
															/>
														</li>
													))}
												</ul>
											)}
										</div>
									) : (
										<NavItem label={item.label} href={item.href} isMobile={true} />
									)}
								</li>
							))}
						</ul>

						<div className="mt-6 px-4">
							<Link
								href="/account"
								className="flex items-center py-3 text-sm text-neutral-600 hover:text-black font-league-spartan"
							>
								<svg
									className="mr-3"
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
									<circle cx="12" cy="7" r="4" />
								</svg>
								My Account
							</Link>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}

export default function Navbar() {
	const deviceType = useViewport();
	const isMobile = deviceType === "mobile";

	return isMobile ? <MobileNavbar /> : <DesktopNavbar />;
}
