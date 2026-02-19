import PortfolioHero from "@/components/ui/portfolio-hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Transition from "@/components/Transition";

export default function Home() {
  return (
    <Transition>
      <main className="min-h-screen">
        <PortfolioHero />
        <About />
        <Work />
        <Contact />
      </main>
    </Transition>
  );
}
