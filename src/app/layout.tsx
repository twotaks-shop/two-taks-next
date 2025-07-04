import type { Metadata } from "next";
import { Montserrat, League_Spartan } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CartSidebar from "../../components/shop/CartSidebar";
import MainContentWrapper from "../../components/MainContentWrapper";
import AuthModalWrapper from "../../components/customer/AuthModalWrapper";
import Script from "next/script";

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
			<Script
				id="refersion-tracking"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
              (function(e, n, t, i, o, c, s, a) {
                e.TrackingSystemObject = "r";
                (s = n.createElement(t)).async = 1;
                s.src = "https://cdn.refersion.com/refersion.js";
                s.onload = function() {
                  r.pubKey = "${process.env.NEXT_PUBLIC_REFERSION_API_KEY}";
                  r.settings.fp_off = true;
                  r.initializeXDLS().then(() => {
                    r.launchDefault().then(() => {
                      const rfsnTrackingEvent = new Event("refersion-loaded");
                      document.dispatchEvent(rfsnTrackingEvent);
                    })
                  })
                };
                (a = n.getElementsByTagName(t)[0]).parentNode.insertBefore(s, a);
              })(window, document, "script");
            `,
				}}
			/>
			<Script id="meta-pixel" strategy="afterInteractive">
				{`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1268790824657717');
            fbq('track', 'PageView');
          `}
			</Script>
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
