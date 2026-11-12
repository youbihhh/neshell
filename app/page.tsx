import AdSlot from "../components/AdSlot";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import About from "../components/home/About";
import CallToAction from "../components/home/CallToAction";
import Designs from "../components/home/Designs";
import Process from "../components/home/Process";
import Projects from "../components/home/Projects";
import Services from "../components/home/Services";
import Stats from "../components/home/Stats";
import Sustainability from "../components/home/Sustainability";
import Testimonials from "../components/home/Testimonials";

export default function Home() {
  return (
    <main className="flex-1">
      <Intro />
      <Hero />
      <About />
      <Stats />
      <Services />
      <AdSlot />
      <Designs />
      <Projects />
      <Process />
{/*       
      <Sustainability /> */}
      <Testimonials />
      <CallToAction />
    </main>
  );
}
