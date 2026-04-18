import { LangProvider } from "@/lib/lang-context";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Menu } from "@/components/Menu";
import { OrderSection } from "@/components/OrderSection";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => (
  <LangProvider>
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <OrderSection />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  </LangProvider>
);

export default Index;
