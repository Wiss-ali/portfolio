import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full">
      <Hero />
      <Clients />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
