import Hero from "@/components/Banner";
import FeaturedProducts from "@/components/Feature";
import PromoGlassSection from "@/components/Promoglass";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <Hero></Hero>
    <FeaturedProducts></FeaturedProducts>
    <PromoGlassSection></PromoGlassSection>
    </div>
  );
}
