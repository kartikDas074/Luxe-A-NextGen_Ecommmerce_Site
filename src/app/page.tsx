import Hero from "@/components/Banner";
import Bestsellers from "@/components/Bestsellers";
import CustomerReviews from "@/components/CustomerReview";
import FeaturedProducts from "@/components/Feature";
import InfoSections from "@/components/InfoSection";
import PromoGlassSection from "@/components/Promoglass";
import WhyShopLuxe from "@/components/WhoShop";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <Hero></Hero>
    <FeaturedProducts></FeaturedProducts>
    <PromoGlassSection></PromoGlassSection>
    <Bestsellers></Bestsellers>
    <WhyShopLuxe></WhyShopLuxe>
    <CustomerReviews></CustomerReviews>
    <InfoSections></InfoSections>
    </div>
  );
}
