"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { tabs } from "../../../confg/ingredients";

type Ingredient = {
	id: string;
	name: string;
	description: string;
	image: string;
	category: string;
};

type Category =
	| "View All"
	| "Super Morning"
	| "Super Immune"
	| "Super Sleep"
	| "Super Brain";

const categories: Category[] = [
	"View All",
	...tabs.map((tab) => tab.category as Category),
];

const IngredientCard = ({
	ingredient,
	onClick,
}: {
	ingredient: Ingredient;
	onClick: () => void;
}) => (
	<motion.div
		layout
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		onClick={onClick}
		className="bg-white rounded-lg transition-all duration-300 cursor-pointer"
	>
		<div className="relative aspect-square">
			<Image
				src={ingredient.image}
				alt={ingredient.name}
				fill
				className="object-cover rounded-full"
			/>
		</div>
		<div className="p-4">
			<h3 className="font-league-spartan text-xl mb-2">{ingredient.name}</h3>
		</div>
	</motion.div>
);

export default function IngredientsPage() {
	const [activeCategory, setActiveCategory] = useState<Category>("View All");
	const [selectedIngredient, setSelectedIngredient] =
		useState<Ingredient | null>(null);

	const allIngredients = tabs.flatMap((tab) => tab.ingredients) as Ingredient[];
	const filteredIngredients =
		activeCategory === "View All"
			? allIngredients
			: allIngredients.filter(
					(ingredient) => ingredient.category === activeCategory,
				);

	const currentCategory = tabs.find((tab) => tab.category === activeCategory);

	return (
		<div className="container mx-auto px-4 pt-28 pb-16 mt-4">
			<h1 className="text-4xl font-heading-bold text-center mb-12">Ingredients</h1>

			{/* Category Tabs */}
			<div className="flex flex-wrap justify-center gap-3 mb-12">
				{categories.map((category) => (
					<button
						key={category}
						onClick={() => setActiveCategory(category)}
						className={`px-6 py-2 rounded-full font-league-spartan transition-colors
              ${
															activeCategory === category
																? "bg-black text-white"
																: "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
														}`}
					>
						{category}
					</button>
				))}
			</div>

			<div className="mb-10">
				{activeCategory === "View All" ? (
					<>
						<h3 className="text-2xl">Only the best, because your body deserves it</h3>

						<p>
							We believe your daily routine should be powered by the highest-quality
							ingredients — nothing less. That’s why every Twotaks formula is crafted
							with meticulously sourced, science-backed compounds known for their real
							impact. We focus on bioavailability, purity, and nutrient density, so
							your body can actually absorb what it needs — and feel the difference.
						</p>
					</>
				) : (
					<>
						<h3 className="text-2xl">{currentCategory?.title}</h3>
						<p className="whitespace-pre-line">{currentCategory?.description}</p>
					</>
				)}
			</div>

			{/* Ingredients Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{filteredIngredients.map((ingredient) => (
					<IngredientCard
						key={ingredient.id}
						ingredient={ingredient}
						onClick={() => setSelectedIngredient(ingredient)}
					/>
				))}
			</div>

			{/* Ingredient Modal */}
			{selectedIngredient && (
				<div
					className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
					onClick={() => setSelectedIngredient(null)}
				>
					<div
						className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl relative"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={() => setSelectedIngredient(null)}
							className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100"
						>
							<span className="sr-only">Close</span>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
						<div className="relative aspect-video mb-4">
							<Image
								src={selectedIngredient.image}
								alt={selectedIngredient.name}
								fill
								className="object-cover rounded-lg"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								priority
							/>
						</div>
						<h2 className="text-2xl font-league-spartan mb-3">
							{selectedIngredient.name}
						</h2>
						<p className="text-neutral-700">{selectedIngredient.description}</p>
					</div>
				</div>
			)}
		</div>
	);
}
