import type { Metadata } from "next";
import { Montserrat, League_Spartan } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CartSidebar from "../../components/shop/CartSidebar";
import MainContentWrapper from "../../components/MainContentWrapper";
import AuthModalWrapper from "../../components/customer/AuthModalWrapper";

const leagueSpartan = League_Spartan({
	variable: "--font-league-spartan",
	subsets: ["latin"],
});

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home - Two Taks - Premium Natural Supplements for Peak Performance",
  description:
    "Discover Two Taks: premium natural supplements with adaptogens & nootropics to optimize mind, body & energy. Unlock your full potential today!",
  openGraph: {
    title: "Home - Two Taks - Premium Natural Supplements for Peak Performance",
    description:
      "Discover Two Taks: premium natural supplements with adaptogens & nootropics to optimize mind, body & energy. Unlock your full potential today!",
    url: "https://twotaks.com/",
    siteName: "TwoTaks -",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home - Two Taks - Premium Natural Supplements for Peak Performance",
    description:
      "Discover Two Taks: premium natural supplements with adaptogens & nootropics to optimize mind, body & energy. Unlock your full potential today!",
  },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${montserrat.variable} ${leagueSpartan.variable} antialiased`}
			>
				<MainContentWrapper>
					<Navbar />
					{children}
					<Footer />
				</MainContentWrapper>
				<CartSidebar />
				<AuthModalWrapper />
			</body>
		</html>
	);
}
