"use client";

import { useState } from "react";
import { faqConfig } from "../confg/faqConfig";

type FaqItemProps = {
	question: string;
	answer: string;
	isOpen: boolean;
	toggleOpen: () => void;
	className?: string;
};

const FaqItem = ({
	question,
	answer,
	isOpen,
	toggleOpen,
	className,
}: FaqItemProps) => {
	return (
		<div
			className={`border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200 ${className}`}
		>
			<button
				className="w-full flex items-center justify-between py-6 text-left px-4 group"
				onClick={toggleOpen}
				aria-expanded={isOpen}
			>
				<h3 className="font-brand text-lg font-semibold text-gray-900 group-hover:text-black transition-colors duration-200">
					{question}
				</h3>
				<span className="ml-6 flex-shrink-0 bg-gray-100 rounded-full p-2 group-hover:bg-gray-200 transition-all duration-200">
					<svg
						className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
							isOpen ? "transform rotate-180" : ""
						}`}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<polyline points="6 9 12 15 18 9"></polyline>
					</svg>
				</span>
			</button>
			<div
				className={`overflow-hidden transition-all duration-300 ${
					isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<div className="pb-6 pt-2 px-4 text-base text-gray-600 whitespace-pre-line leading-relaxed">
					{answer}
				</div>
			</div>
		</div>
	);
};

export default function FAQ({ className = "" }: { className?: string }) {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	const toggleFaq = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section
			className={`w-full bg-gray-50 py-16 sm:py-20 md:py-24 px-4 overflow-hidden ${className}`}
		>
			<div className="max-w-screen-xl mx-auto">
				<div className="text-center mb-12 relative">
					<div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-200 rounded-full"></div>
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-brand font-bold mb-4 tracking-tight text-gray-900">
						Frequently Asked Questions
					</h2>
					<p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
						Find answers to common questions about our products and how to get the
						most out of them.
					</p>
				</div>

				<div className="max-w-3xl mx-auto relative">
					<div className="absolute -inset-4 bg-gray-100 rounded-full opacity-30 blur-xl"></div>
					<div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden relative z-10">
						{faqConfig.map((faq, index) => (
							<FaqItem
								key={faq.id}
								question={faq.question}
								answer={faq.answer}
								isOpen={openIndex === index}
								toggleOpen={() => toggleFaq(index)}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
