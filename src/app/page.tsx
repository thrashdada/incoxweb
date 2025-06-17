import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogoSlider } from "@/components/LogoSlider";
import { FeatureCards } from "@/components/FeatureCards";
import { AlternatingFeatures } from "@/components/AlternatingFeatures";
import { FeaturedVideoSection } from "@/components/FeaturedVideoSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { FullWidthCTASection } from "@/components/FullWidthCTASection";
import { Footer } from "@/components/Footer";
import { SocialProofSection } from "@/components/SocialProofSection";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { HeroSection } from "@/components/HeroSection";



export default function Home() {
  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <FeatureCards />
      <AlternatingFeatures />
      <FeaturedVideoSection />
      <TestimonialSection />
      <FullWidthCTASection />
      <Footer />
    </>
  );
}
