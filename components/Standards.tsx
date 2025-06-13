import Image from "next/image";
import { standardsData } from "../confg/standards";

type StandardItemProps = {
	icon: string;
	title: string;
};

const StandardItem = ({ icon, title }: StandardItemProps) => {
	return (
		<div className="flex flex-col items-center">
			<div className="w-32 h-32 sm:w-36 sm:h-36 relative mb-4 transition-transform duration-300 hover:scale-105">
				<Image
					src={icon}
					alt={title}
					fill
					sizes="(max-width: 640px) 128px, 144px"
					className="object-contain"
				/>
			</div>
			<p className="text-gray-500 text-lg sm:text-xl font-normal font-brand">
				{title}
			</p>
		</div>
	);
};

export function Standards() {
	return (
		<section className="py-16 md:py-24 px-4 bg-gray-50">
			<div className="container mx-auto max-w-6xl">
				<div className="text-center mb-12 md:mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-4 font-brand tracking-tight text-gray-900">
						Trusted Quality Standards
					</h2>
					<p className="text-2xl md:text-3xl text-gray-600 font-light">
						Clean. Powerful. Purposeful.
					</p>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-16 md:mb-20">
					{standardsData.map((standard) => (
						<StandardItem
							key={standard.id}
							icon={standard.icon}
							title={standard.title}
						/>
					))}
				</div>

			</div>
		</section>
	);
}

export default Standards;
