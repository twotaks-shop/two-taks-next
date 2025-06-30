import { ProductCarousel } from "../../components/ProductCarousel";
import ProductShowcase from "../../components/ProductShowcase";
import HeroBanner from "../../components/HeroBanner";
import Standards from "../../components/Standards";
import Ingredients from "../../components/Ingredients";
import Reviews from "../../components/Reviews";
import AboutUs from "../../components/AboutUs";
import FAQ from "../../components/FAQ";
import BundleShowcase from "../../components/BundleShowcase";


export default function Home() {
	return (
		<>
			<HeroBanner />
			<ProductShowcase />
			<BundleShowcase />
			<Standards />
			<ProductCarousel className="py-20" />
			<Ingredients className="my-20" />
			<Reviews />
			<AboutUs />
			<FAQ />
		</>
	);
}
