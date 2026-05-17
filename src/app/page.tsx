import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CoffeeProgram } from "@/components/sections/CoffeeProgram";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { Location } from "@/components/sections/Location";
import { MenuFlipbook } from "@/components/sections/MenuFlipbook";
import { PrivateEvents } from "@/components/sections/PrivateEvents";
import { Reservations } from "@/components/sections/Reservations";
import { Reviews } from "@/components/sections/Reviews";
import { SignatureDishes } from "@/components/sections/SignatureDishes";
import { SpecialOffers } from "@/components/sections/SpecialOffers";
import { FloatingActions } from "@/components/ui/FloatingActions";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Introduction />
        <MenuFlipbook />
        <SignatureDishes />
        <CoffeeProgram />
        <Gallery />
        <Reservations />
        <Reviews />
        <SpecialOffers />
        <PrivateEvents />
        <Location />
      </main>
      <Footer />
      <FloatingActions />
      <div className="grain-overlay" />
    </>
  );
}
