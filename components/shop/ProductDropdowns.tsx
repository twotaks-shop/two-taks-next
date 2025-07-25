import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface DropdownItem {
	title: string;
	content: React.ReactNode;
}

interface ProductDropdownsProps {
	product: "super-brain" | "super-morning" | "super-sleep" | "super-immune";
}

export function ProductDropdowns({ product }: ProductDropdownsProps) {
	// State to track which dropdown is open
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	// Toggle dropdown function
	const toggleDropdown = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	// Product-specific dropdown content
	const getDropdownItems = (): DropdownItem[] => {
		switch (product) {
			case "super-brain":
				return [
					{
						title: "Nutrition That Unlocks Your Mind",
						content: (
							<div className="space-y-4 text-neutral-700">
								<div>
									<h4 className="font-medium mb-2">Suggested Use:</h4>
									<p>
										Take 2 capsules a day, 5 days per week — you choose which days work
										best for you. Then rest for 2 days to reset and keep your system
										balanced. Pro tip: take with food for better absorption.
									</p>
								</div>
								<div>
									<h4 className="font-medium mb-2">
										What&apos;s Inside (per 2-capsule serving):
									</h4>
									<p className="font-medium">Super Brain Blend – 2825 mg</p>
									<ul className="list-disc pl-5 mt-2 space-y-1">
										<li>Alpha GPC – Mental clarity unlocked.</li>
										<li>Bacopa Monnieri – Memory enhancement.</li>
										<li>Lion&apos;s Mane (10:1) – Grows new neural connections.</li>
										<li>Ginkgo Biloba – Improved blood flow to the brain.</li>
										<li>Guayusa – Clean, jitter-free energy.</li>
										<li>BioPerine® – Boosts absorption like a cheat code.</li>
									</ul>
									<p className="mt-2">
										Capsule tech: Vegan, clean, no fillers. No established %DV — this goes
										beyond basic nutrition.
									</p>
								</div>
							</div>
						),
					},
					{
						title: "Long-Term Focus",
						content: (
							<div className="space-y-4 text-neutral-700">
								<p>
									These capsules don&apos;t taste like berries. They don&apos;t taste
									like anything — and that&apos;s exactly the point.
								</p>
								<p>
									No sugar. No junk. No fluff. Just science-backed ingredients that build
									up over time to help you:
								</p>
								<ul className="list-disc pl-5 space-y-1">
									<li>Stay focused longer.</li>
									<li>Think clearer.</li>
									<li>Remember better.</li>
									<li>Feel mentally unstoppable.</li>
								</ul>
								<p>
									Because true clarity takes time — and you&apos;re not here for
									shortcuts.
								</p>
							</div>
						),
					},
					{
						title: "Clean & Certified Superhuman",
						content: (
							<div className="space-y-4 text-neutral-700">
								<p>
									You&apos;re putting this in your brain — we took that seriously. Super
									Brain is:
								</p>
								<ul className="list-disc pl-5 space-y-1">
									<li>GMP Certified.</li>
									<li>Vegan.</li>
									<li>Lab-tested.</li>
									<li>Non-GMO.</li>
									<li>Gluten-free.</li>
									<li>Free of artificial flavors.</li>
								</ul>
								<p>Chosen by thinkers, leaders & everyday superhumans.</p>
							</div>
						),
					},
					{
						title: "We Offer a Mental Challenge",
						content: (
							<div className="space-y-4 text-neutral-700">
								<p>
									We offer you a challenge: to activate your mind like never before.
								</p>
								<p>
									Super Brain isn&apos;t for the curious — it&apos;s for the committed.
									For those ready to go:
								</p>
								<ul className="list-disc pl-5 space-y-1">
									<li>From distraction to deep focus.</li>
									<li>From brain fog to clear thinking.</li>
									<li>From average to superhuman.</li>
								</ul>
								<p>Are you ready to level up? This is your moment.</p>
							</div>
						),
					},
					{
						title: "Delivery, Simplified",
						content: (
							<div className="space-y-4 text-neutral-700">
								<p>Choose how you want to upgrade your mind:</p>
								<p>
									<strong>One-Time Purchase</strong> – full flexibility, no strings
									attached
								</p>
								<p>
									<strong>Subscribe & Save</strong> – automatic monthly delivery, total
									control
								</p>
								<ul className="list-disc pl-5 space-y-1">
									<li>Cancel anytime.</li>
									<li>Pause or skip a shipment.</li>
									<li>Keep your focus on autopilot.</li>
								</ul>
								<p>twotaks delivers. Your brain performs.</p>
							</div>
						),
					},
				];
			case "super-morning":
				return [
					{
						title: "Nutrition That Powers You",
						content: (
							<div className="space-y-4 text-neutral-700">
								<div>
									<h4 className="font-medium mb-2">Suggested Use:</h4>
									<p>
										Take 2 capsules a day, 5 days per week — choose the days that fit your
										rhythm. Then take 2 days off to reset and keep your system balanced.
										Pro tip: Take it with food to amplify the effects.
									</p>
								</div>
								<div>
									<h4 className="font-medium mb-2">
										What&apos;s Inside (per 2-capsule serving):
									</h4>
									<p className="font-medium">Super Morning Blend – 868 mg</p>
									<ul className="list-disc pl-5 mt-2 space-y-1">
										<li>Cordyceps – Ancient energy booster.</li>
										<li>Siberian Ginseng – Stress defense + stamina.</li>
										<li>
											Rhodiola (3% Rosavins, 1% Salidrosides) – Mental and physical
											performance.
										</li>
										<li>CoQ10 – Cellular energy on demand.</li>
										<li>TeaCrine® (Theacrine) – Clean focus, no crash.</li>
										<li>PQQ – Mitochondrial support = real energy.</li>
										<li>Astaxanthin – Powerful antioxidant shield.</li>
									</ul>
									<p className="mt-2">
										Capsule tech: Vegan. Clean. Effective. No established %DV — because
										this is beyond basic nutrition.
									</p>
								</div>
							</div>
						),
					},
					{
						title: "Long-Term Power",
						content: (
							<div className="space-y-4 text-neutral-700">
								<p>
									Forget sugary drinks and caffeine rollercoasters. Super Morning is not
									about the spike — it&apos;s about the sustained power.
								</p>
								<p>Over time, it helps you:</p>
								<ul className="list-disc pl-5 space-y-1">
									<li>Wake up sharp.</li>
									<li>Power through your day.</li>
									<li>Stay calm under pressure.</li>
									<li>Show up with real energy (not fake hype)</li>
								</ul>
								<p>
									Because you weren&apos;t made for burnout — you were built to go
									superhuman.
								</p>
							</div>
						),
					},
					{
						title: "Clean & Certified Superhuman",
						content: (
							<div className="space-y-4 text-neutral-700">
								<p>
									You put this in your body every morning — so we made sure it&apos;s
									worthy. Super Morning is:
								</p>
								<ul className="list-disc pl-5 space-y-1">
									<li>GMP Certified.</li>
									<li>Vegan.</li>
									<li>Lab-tested.</li>
									<li>Non-GMO.</li>
									<li>Gluten-free.</li>
									<li>Free of artificial flavors.</li>
								</ul>
								<p>
									Formulated for doers, dreamers, and those who outwork the ordinary.
								</p>
							</div>
						),
					},
					{
						title: "We Offer A Morning Challenge",
						content: (
							<div className="space-y-4 text-neutral-700">
								<p>We offer you a challenge: to start every day at 100%.</p>
								<p>
									Super Morning isn&apos;t a feel-good pill. It&apos;s a decision — to be
									alert, driven, focused. For those ready to go:
								</p>
								<ul className="list-disc pl-5 space-y-1">
									<li>From sluggish to strong.</li>
									<li>From scattered to sharp.</li>
									<li>From tired to unstoppable.</li>
								</ul>
								<p>You in? Let&apos;s go.</p>
							</div>
						),
					},
					{
						title: "Smart Delivery",
						content: (
							<div className="space-y-4 text-neutral-700">
								<p>Choose how you want to stay charged:</p>
								<p>
									<strong>One-Time Purchase</strong> – full flexibility, no strings
									attached
								</p>
								<p>
									<strong>Subscribe & Save</strong> – automatic monthly delivery, total
									control
								</p>
								<ul className="list-disc pl-5 space-y-1">
									<li>Cancel anytime</li>
									<li>Pause or skip a shipment</li>
									<li>Consistency without thinking about it</li>
								</ul>
								<p>twotaks delivers. You perform.</p>
							</div>
						),
					},
				];
			case "super-sleep":
				return [
					{
						title: "Nutrition That Rests You Deep",
						content: (
							<div className="space-y-4 text-neutral-700">
								<div>
									<h4 className="font-medium mb-2">Suggested Use:</h4>
									<p>
										Take 2 capsules a day, 5 days per week — pick the nights that suit
										your rhythm. Take 2 days off each week to maintain balance and avoid
										adaptation. Pro tip: Take it in the evening, ideally with a light
										meal.
									</p>
								</div>
								<div>
									<h4 className="font-medium mb-2">
										What&apos;s Inside (per 2-capsule serving):
									</h4>
									<p className="font-medium">Super Sleep Blend – 600 mg</p>
									<ul className="list-disc pl-5 mt-2 space-y-1">
										<li>Passion Flower – Natural relaxation support.</li>
										<li>Ashwagandha – Adaptogen for stress resilience.</li>
										<li>Chamomile – Gentle calming effects.</li>
										<li>5-HTP (from Griffonia) – Supports serotonin for better sleep.</li>
									</ul>
									<p className="mt-2 font-medium">Key Nutrients:</p>
									<ul className="list-disc pl-5 mt-1 space-y-1">
										<li>Vitamin B6 (Pyridoxal 5-Phosphate) – 588% DV</li>
										<li>Magnesium (as Magnesium Glycinate) – 24% DV</li>
									</ul>
									<p className="mt-2">
										Formulated without melatonin. No drowsiness. Just deep, restorative
										rest. No %DV established for some ingredients — because this goes
										beyond the basics.
									</p>
								</div>
							</div>
						),
					},
					{
						title: "Long-Term Calm",
						content: (
							<div className="space-y-4 text-neutral-700">
								<p>
									Super Sleep isn&apos;t a knockout pill. It&apos;s a long-term tool for
									restoring your natural sleep rhythm.
								</p>
								<p>With consistent use, it helps you:</p>
								<ul className="list-disc pl-5 space-y-1">
									<li>Fall asleep faster.</li>
									<li>Stay asleep longer.</li>
									<li>Wake up clear, not cloudy.</li>
									<li>Reduce stress and overthinking at night.</li>
								</ul>
								<p>
									Because real sleep isn&apos;t about shutting down. It&apos;s about
									recovering like a superhuman.
								</p>
							</div>
						),
					},
					{
						title: "Clean & Certified Superhuman",
						content: (
							<div className="space-y-4 text-neutral-700">
								<p>
									Sleep is sacred — and so is what you put in your body. That&apos;s why
									Super Sleep is:
								</p>
								<ul className="list-disc pl-5 space-y-1">
									<li>GMP Certified.</li>
									<li>Vegan.</li>
									<li>Lab-tested.</li>
									<li>Non-GMO.</li>
									<li>Gluten-free.</li>
									<li>Free of artificial flavors and synthetic melatonin</li>
								</ul>
								<p>Chosen by high performers who know recovery is the secret weapon.</p>
							</div>
						),
					},
					{
						title: "We Offer A Sleep Challenge",
						content: (
							<div className="space-y-4 text-neutral-700">
								<p>We offer a challenge: to take your rest seriously.</p>
								<p>
									Super Sleep is for those who are tired of being tired. For those ready
									to:
								</p>
								<ul className="list-disc pl-5 space-y-1">
									<li>Swap anxiety for calm.</li>
									<li>Reset their nervous system.</li>
									<li>Reclaim the kind of sleep that rebuilds</li>
								</ul>
								<p>
									If you&apos;re ready to make sleep your superpower, this is your
									formula.
								</p>
							</div>
						),
					},
					{
						title: "Hassle-Free Delivery",
						content: (
							<div className="space-y-4 text-neutral-700">
								<p>Choose how you want to rest better:</p>
								<ul className="list-disc pl-5 space-y-1">
									<li>
										<strong>One-Time Purchase</strong> – full flexibility.
									</li>
									<li>
										<strong>Subscribe & Save</strong> – monthly delivery, zero effort.
									</li>
								</ul>
								<p>
									Pause, skip, or cancel anytime. You stay consistent. We handle the
									rest.
								</p>
								<p>twotaks delivers and your body regenerates.</p>
							</div>
						),
					},
				];
			case "super-immune":
				return [
					{
						title: "Nutrition That Defends You",
						content: (
							<div className="space-y-4 text-neutral-700">
								<div>
									<h4 className="font-medium mb-2">Suggested Use:</h4>
									<p>
										Take 2 capsules a day, 5 days per week — choose the days that best
										support your lifestyle. Then take 2 days off to reset and support
										immune rhythm. Pro tip: Take with food to improve absorption.
									</p>
								</div>
								<div>
									<h4 className="font-medium mb-2">
										What&apos;s Inside (per 2-capsule serving):
									</h4>
									<p className="font-medium">Essential Vitamins & Minerals</p>
									<ul className="list-disc pl-5 mt-1 space-y-1">
										<li>Vitamin C (Ascorbic Acid) – 278% DV</li>
										<li>Vitamin D3 – 200% DV</li>
										<li>Zinc (as Zinc Bisglycinate) – 136% DV</li>
										<li>Vitamin K2 (MK-7) – Active, highly bioavailable form</li>
									</ul>
									<p className="mt-2 font-medium">Super Immune Blend – 1155 mg</p>
									<ul className="list-disc pl-5 mt-1 space-y-1">
										<li>EpiCor® – Clinically studied postbiotic for immune strength</li>
										<li>Turmeric Extract – Natural anti-inflammatory defense</li>
										<li>Yeast Beta Glucans – Stimulate immune response</li>
										<li>Reishi Mushroom (10:1) – Adaptogen and immune modulator</li>
										<li>BioPerine® – Enhances absorption of key nutrients</li>
									</ul>
									<p className="mt-2">
										Crafted for daily resilience. No %DV established for some ingredients
										— because they go above and beyond.
									</p>
								</div>
							</div>
						),
					},
					{
						title: "Long-Term Defense",
						content: (
							<div className="space-y-4 text-neutral-700">
								<p>You don&apos;t need megadoses. You need smart defense.</p>
								<p>Super Immune works gradually and consistently to help you:</p>
								<ul className="list-disc pl-5 space-y-1">
									<li>Strengthen your immune response.</li>
									<li>Improve gut-immune balance.</li>
									<li>Reduce inflammation naturally.</li>
									<li>Stay ready, not reactive.</li>
								</ul>
								<p>
									No sugar. No artificial junk. No emergency-mode formulas. Just daily
									protection made for everyday superhumans.
								</p>
							</div>
						),
					},
					{
						title: "Clean & Certified Superhuman",
						content: (
							<div className="space-y-4 text-neutral-700">
								<p>
									You&apos;re not taking this just for winter — you&apos;re upgrading
									your system year-round. Super Immune is:
								</p>
								<ul className="list-disc pl-5 space-y-1">
									<li>GMP Certified.</li>
									<li>Vegan.</li>
									<li>Lab-tested.</li>
									<li>Non-GMO.</li>
									<li>Gluten-free.</li>
									<li>Free of artificial flavors.</li>
								</ul>
								<p>
									Trusted by travelers, professionals, and anyone who doesn&apos;t have
									time to get sick.
								</p>
							</div>
						),
					},
					{
						title: "We Offer An Immune Challenge",
						content: (
							<div className="space-y-4 text-neutral-700">
								<p>
									We&apos;re not here to fix you when you&apos;re down. We&apos;re here
									to help you stay up.
								</p>
								<p>
									Super Immune is a daily commitment — not a quick fix. This is for those
									who:
								</p>
								<ul className="list-disc pl-5 space-y-1">
									<li>Choose prevention over panic.</li>
									<li>Build health like they build strength.</li>
									<li>Believe that immunity is a daily discipline.</li>
								</ul>
								<p>If that sounds like you, welcome to your new baseline.</p>
							</div>
						),
					},
					{
						title: "A Super Delivery",
						content: (
							<div className="space-y-4 text-neutral-700">
								<p>Choose how you stay fortified:</p>
								<ul className="list-disc pl-5 space-y-1">
									<li>
										<strong>One-Time Purchase</strong> – full flexibility
									</li>
									<li>
										<strong>Subscribe & Save</strong> – monthly delivery, no stress
									</li>
								</ul>
								<p>
									Pause, skip, or cancel anytime. You stay consistent an we&apos;ll take
									care of the rest.
								</p>
								<p>twotaks delivers. Your body defends.</p>
							</div>
						),
					},
				];
			default:
				return [];
		}
	};

	const dropdownItems = getDropdownItems();

	return (
		<div className="w-full max-w-3xl mx-auto mt-12">
			<div className="space-y-3">
				{dropdownItems.map((item, index) => (
					<div key={index} className="border-b border-neutral-200">
						<button
							onClick={() => toggleDropdown(index)}
							className="w-full py-4 px-1 flex justify-between items-center text-left focus:outline-none"
						>
							<span className="font-medium text-lg text-neutral-800">
								{item.title}
							</span>
							<span>
								{openIndex === index ? (
									<FiChevronUp className="text-neutral-500" />
								) : (
									<FiChevronDown className="text-neutral-500" />
								)}
							</span>
						</button>
						{openIndex === index && (
							<div className="py-4 px-1 animate-fadeIn">{item.content}</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
