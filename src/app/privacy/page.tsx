export default function PrivacyPolicyPage() {
	return (
		<div className="max-w-screen-xl mx-auto mt-10 px-4 pt-20 pb-12 sm:px-6 lg:px-8 lg:pt-28 lg:pb-16 text-gray-800">
			<h1 className="text-3xl font-heading-bold mb-6">Privacy Policy</h1>
			<p className="text-sm text-gray-500 mb-8">Effective Date: May 6, 2025</p>

			<p className="mb-6">
				Twotaks (“Twotaks,” “we,” “us,” or “our”) is committed to protecting your
				privacy. This Privacy Policy outlines how we collect, use, disclose, and
				safeguard your personal information when you visit our website{" "}
				<a href="https://www.twotaks.com" className="text-blue-600 underline">
					www.twotaks.com
				</a>{" "}
				(the “Site”). By accessing or using our Site, you agree to the terms of this
				Privacy Policy.
			</p>

			{[
				{
					title: "1. Information We Collect",
					content: `We collect information that identifies, relates to, describes, or could reasonably be linked, directly or indirectly, with a particular consumer or device (“personal information”). This includes:
            \n- Identifiers: Name, email address, postal address, phone number, IP address, and account login details.
            \n- Commercial Information: Records of products purchased, obtained, or considered.
            \n- Internet Activity: Browsing history, search history, and interactions with our Site.
            \n- Geolocation Data: Physical location or movements.
            \n- Payment Information: Credit card details and billing information.
            \n- Health and Wellness Data: Information related to your health goals or product preferences, if voluntarily provided.`,
				},
				{
					title: "2. How We Collect Information",
					content: `We collect personal information:
            \n- Directly from You: When you register on our Site, place an order, subscribe to our newsletter, or contact us.
            \n- Automatically: Through cookies, web beacons, and similar technologies as you navigate our Site.
            \n- From Third Parties: Such as payment processors, marketing partners, and analytics providers.`,
				},
				{
					title: "3. Use of Your Information",
					content: `We use your personal information to:
            \n- Fulfill and manage purchases, orders, payments, and returns.
            \n- Improve our website and customer service.
            \n- Send promotional materials and newsletters (with your consent).
            \n- Respond to inquiries and provide support.
            \n- Comply with legal obligations and enforce our terms.`,
				},
				{
					title: "4. Sharing of Information",
					content: `We may share your personal information with:
            \n- Service Providers: Third parties who perform services on our behalf, such as payment processing and order fulfillment.
            \n- Legal Authorities: When required by law or to protect our rights.
            \n- Business Transfers: In connection with a merger, sale, or asset transfer.
            \nWe do not sell your personal information to third parties.`,
				},
				{
					title: "5. Cookies and Tracking Technologies",
					content: `We use cookies and similar technologies to:
            \n- Enhance user experience.
            \n- Analyze Site usage.
            \n- Deliver targeted advertising.
            \nYou can control cookie preferences through your browser settings.`,
				},
				{
					title: "6. Data Security",
					content: `We implement appropriate technical and organizational measures to protect your personal information, including:
            \n- Secure server environments.
            \n- Encryption of sensitive data.
            \n- Regular security assessments.
            \nHowever, no method of transmission over the Internet is 100% secure.`,
				},
				{
					title: "7. Your Rights and Choices",
					content: `Depending on your jurisdiction, you may have rights to:
            \n- Access the personal information we hold about you.
            \n- Request correction or deletion of your personal information.
            \n- Opt-out of marketing communications.
            \nTo exercise these rights, please contact us at info@twotaks.com.`,
				},
				{
					title: "8. Children’s Privacy",
					content: `Our Site is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.`,
				},
				{
					title: "9. International Users",
					content: `If you are accessing our Site from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States.`,
				},
				{
					title: "10. Changes to This Privacy Policy",
					content: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.`,
				},
				{
					title: "11. Contact Us",
					content: `If you have any questions or concerns about this Privacy Policy, please contact us at:
            \nTwotaks LLC
            \nEmail: info@twotaks.com`,
				},
			].map((section, index) => (
				<div key={index} className="mb-8">
					<h2 className="text-xl font-semibold mb-2">{section.title}</h2>
					{section.content.split("\n").map((line, i) =>
						line.startsWith("-") ? (
							<li key={i} className="ml-6 list-disc">
								{line.replace(/^- /, "")}
							</li>
						) : (
							<p key={i} className="mb-2">
								{line}
							</p>
						),
					)}
				</div>
			))}
		</div>
	);
}
