import CanvasScrollytelling from "@/components/CanvasScrollytelling";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative bg-primary-cream">
      <Navbar />

      {/* Hero Animation Section */}
      <section className="relative w-full">
        <CanvasScrollytelling
          frameCount={112}
          basePath="/images/mango/ezgif-frame-"
          extension=".jpg"
        />

        {/* Hero Overlay Text */}
        <div className="absolute top-0 left-0 w-full h-screen pointer-events-none flex flex-col items-center justify-center z-10">
          <h1 className="text-6xl md:text-8xl font-serif text-navy text-center leading-tight">
            The King of <br />
            <span className="italic text-primary-orange">Mangoes</span>
          </h1>
          <p className="mt-6 text-xl text-navy/60 font-sans tracking-wide">
            AUTHENTIC RATNAGIRI ALPHONSO
          </p>

          <div className="absolute bottom-12 animate-bounce">
            <svg className="w-6 h-6 text-navy/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="relative z-20 bg-primary-cream shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">

        <Section id="about" className="bg-primary-cream">
          <span className="text-primary-orange font-bold tracking-[0.2em] text-sm mb-4 block">THE ORIGIN</span>
          <h2 className="text-4xl md:text-5xl font-serif text-navy mb-8">Legendary Konkan Heritage</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <p className="text-lg text-navy/80 leading-relaxed">
              Sourced from the sun-drenched orchards of Ratnagiri and Devgad,
              our Alphonso mangoes are the gold standard of taste. Each fruit
              is nurtured by the coastal breeze and the unique volcanic soil
              of the Konkan region, developing a depth of flavor that is
              simply unparalleled.
            </p>
            <div className="aspect-square bg-mango-2/30 rounded-2xl flex items-center justify-center p-8">
              <div className="text-center">
                <div className="text-5xl font-serif text-primary-orange mb-2">GI</div>
                <div className="text-sm font-bold tracking-widest text-navy/40 uppercase">Geographical Indication</div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="process" className="bg-FAF3E1">
          <span className="text-primary-orange font-bold tracking-[0.2em] text-sm mb-4 block">OUR CRAFT</span>
          <h2 className="text-4xl md:text-5xl font-serif text-navy mb-12">Natural Ripening, Honest Soil</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Hand-Picked",
                desc: "Harvested at precisely the right moment to ensure maximum sugar development.",
                icon: "🌿"
              },
              {
                title: "Chemical-Free",
                desc: "No calcium carbide. We ripen our mangoes naturally in hay, the traditional way.",
                icon: "📦"
              },
              {
                title: "Farm-Direct",
                desc: "Bypassing middlemen to bring the farmer's hard work directly to your doorstep.",
                icon: "🏠"
              }
            ].map((step, i) => (
              <div key={i} className="p-8 bg-white/50 border border-primary-orange/10 rounded-xl hover:shadow-xl transition-all group">
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">{step.icon}</div>
                <h3 className="text-2xl font-serif text-navy mb-3">{step.title}</h3>
                <p className="text-navy/70 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="quality" className="bg-primary-cream pb-32">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-serif text-navy mb-8">Experience the Summer Gold</h2>
            <p className="text-xl text-navy/60 mb-12 italic font-serif">
              "The aroma alone is enough to transport you to the lush orchards of Maharashtra."
            </p>
            <button className="bg-navy text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-primary-orange transition-all transform hover:scale-105 shadow-xl">
              Pre-Order for Next Harvest
            </button>
          </div>
        </Section>

        <footer className="py-12 px-8 border-t border-navy/5 text-center">
          <div className="font-serif text-xl font-bold text-navy/40 mb-4">KonkanKart</div>
          <p className="text-navy/30 text-sm">© 2024 KonkanKart Services. Authentically Sourced.</p>
        </footer>
      </div>
    </main>
  );
}
