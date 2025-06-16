export default function TermsPage() {
	return (
		<div className="max-w-screen-xl mx-auto mt-10 px-4 pt-20 pb-12 sm:px-6 lg:px-8 lg:pt-28 lg:pb-16 text-gray-800">
			<h1 className="text-3xl font-heading-bold mb-6">Terms and Conditions</h1>
			<p className="text-sm text-gray-500 mb-8">Effective Date: May 6, 2025</p>

			<p className="mb-6">
				These Terms and Conditions (“Terms”) constitute a legally binding agreement
				between you (“User” or “you”) and Twotaks LLC, a Florida limited liability
				company (“Twotaks,” “we,” “us,” or “our”), with respect to your access and
				use of the website located at www.twotaks.com (the “Site”) and the purchase
				and use of any products or services offered therein. By accessing or using
				the Site, you acknowledge that you have read, understood, and agree to be
				bound by these Terms, as well as our{" "}
				<a href="/privacy" className="text-blue-600 underline">
					Privacy Policy
				</a>
				. If you do not accept these Terms in their entirety, you must refrain from
				using the Site.
			</p>

			{[
				{
					title: "1. Eligibility and User Obligations",
					content: `You represent and warrant that you are at least eighteen (18) years of age or the age of legal majority in your jurisdiction, whichever is greater, and that you possess the legal authority to enter into these Terms. You agree to use the Site in accordance with all applicable laws, rules, and regulations. By creating an account or submitting information, you further agree to:
            \n- Provide accurate, complete, and current information.
            \n- Maintain the confidentiality of any login credentials.
            \n- Accept full responsibility for all activities under your account.`,
				},
				{
					title: "2. Orders, Product Descriptions, and Pricing",
					content: `We endeavor to ensure that the information on our Site, including product descriptions, pricing, and availability, is accurate. However, such information may occasionally contain typographical errors, inaccuracies, or omissions. Twotaks reserves the right, at its sole discretion, to:
            \n- Cancel or refuse any order at any time, for reasons including but not limited to suspected fraud or inventory limitations.
            \n- Limit purchase quantities per user, household, or transaction.
            \n- Modify or discontinue any product or service without prior notice.
            \nAll transactions are subject to our [Shipping Policy] and [Return Policy], which are incorporated herein by reference.`,
				},
				{
					title: "3. Payment Terms",
					content: `By placing an order, you authorize Twotaks or its third-party payment processor to charge the designated payment method for the total amount of your purchase, including applicable taxes and shipping fees. You are responsible for:
            \n- Ensuring valid, up-to-date billing information.
            \n- All applicable fees, including those arising from insufficient funds, foreign transaction charges, or processing errors beyond our control.`,
				},
				{
					title: "4. Shipping, Title, and Risk of Loss",
					content: `All products are shipped pursuant to a shipment contract. Accordingly, title and risk of loss pass to you upon delivery of the products to the carrier. Estimated delivery times are not guaranteed and may be affected by variables beyond our control. Twotaks shall not be held liable for:
            \n- Carrier delays, customs hold-ups, or force majeure events.
            \n- Incorrect shipping information provided by the customer.
            \n- Losses resulting from unclaimed or undeliverable packages.`,
				},
				{
					title: "5. Returns and Refunds",
					content: `If you are dissatisfied with your purchase, please refer to our [Return Policy] for information regarding eligibility and procedures. Twotaks reserves the right to:
            \n- Deny refund or replacement requests that do not comply with the stated policy.
            \n- Request proof of purchase.
            \n- Decline repeat or excessive return requests that may indicate abuse.`,
				},
				{
					title: "6. Intellectual Property",
					content: `All content and materials on the Site, including but not limited to trademarks, logos, images, text, audio, video, software, and code (“Content”), are the exclusive property of Twotaks or its licensors and are protected by United States and international intellectual property laws. You may not:
            \n- Reproduce, distribute, or publicly display any portion of the Site without prior written consent.
            \n- Use our marks, trade dress, or proprietary content in a manner that may mislead or imply endorsement.
            \n- Reverse-engineer or attempt to extract source code from any software used on the Site.`,
				},
				{
					title: "7. Acceptable Use Policy",
					content: `You agree to use the Site solely for its intended, lawful purposes. You are expressly prohibited from:
            \n- Engaging in any activity that violates local, state, federal, or international law.
            \n- Using automated means (e.g., bots or scrapers) to access the Site.
            \n- Uploading malicious code or content intended to disrupt or compromise system security.
            \n- Attempting unauthorized access to other users’ accounts, servers, or networks.
            \nViolations may result in immediate suspension or termination of access and may subject you to civil or criminal liability.`,
				},
				{
					title: "8. Disclaimer of Warranties",
					content: `The Site and all products and services are provided on an “as is” and “as available” basis. To the maximum extent permitted by applicable law, Twotaks disclaims all warranties, express or implied, including but not limited to:
            \n- Implied warranties of merchantability;
            \n- Fitness for a particular purpose;
            \n- Non-infringement.
            \nWe do not warrant that the Site will be uninterrupted, secure, or error-free, or that any defects will be corrected.`,
				},
				{
					title: "9. Limitation of Liability",
					content: `To the fullest extent permitted by law, Twotaks and its affiliates, officers, employees, or agents shall not be liable for any indirect, incidental, consequential, punitive, or special damages, including but not limited to:
            \n- Lost profits, revenue, or data;
            \n- Personal injury or property damage;
            \n- Claims by third parties.
            \nIn no event shall our aggregate liability exceed the amount paid by you for the products giving rise to the claim within the six (6) months preceding the event.`,
				},
				{
					title: "10. Indemnification",
					content: `You agree to indemnify, defend, and hold harmless Twotaks, its officers, directors, employees, agents, and affiliates from and against any third-party claims, demands, losses, damages, or expenses (including attorneys’ fees) arising out of:
            \n- Your use or misuse of the Site;
            \n- Your violation of these Terms;
            \n- Your infringement of any third-party rights.`,
				},
				{
					title: "11. Governing Law and Venue",
					content: `These Terms shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions. Any legal action or proceeding arising under or relating to these Terms shall be brought exclusively in the state or federal courts located in Miami-Dade County, Florida.`,
				},
				{
					title: "12. Dispute Resolution",
					content: `Prior to initiating any formal dispute, you agree to first contact us at info@twotaks.com to seek an informal resolution. If the matter remains unresolved, any dispute shall be submitted to final and binding arbitration in Miami, Florida, pursuant to the rules of the American Arbitration Association. The decision of the arbitrator shall be final and enforceable in any court of competent jurisdiction.`,
				},
				{
					title: "13. Modifications to These Terms",
					content: `We reserve the right to amend or revise these Terms at any time. Changes will be posted on the Site with the updated “Effective Date.” Continued use of the Site after such changes constitutes your acceptance of the revised Terms.`,
				},
				{
					title: "14. Contact Information",
					content: `If you have any questions or concerns about these Terms or our practices, please contact us at:
            \nTwotaks
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
