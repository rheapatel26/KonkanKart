// import CanvasScrollytelling from "@/components/CanvasScrollytelling";
// import Navbar from "@/components/Navbar";
// import Section from "@/components/Section";
// import { motion } from "framer-motion";

// export default function Home() {
//   return (
//     <main className="relative bg-primary-cream">
//       <Navbar />

//       {/* Hero Animation Section */}
//       <section className="relative w-full h-screen overflow-hidden">
//         <CanvasScrollytelling
//           frameCount={18}
//           basePath="/images/mango/"
//           extension=".jpg"
//         />

//         <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center font-rubik">
//           <h1 className="text-6xl md:text-8xl text-center leading-tight text-army-green font-ganttie ">
//             THE KING OF <br />
//             <span className="text-army-green">MANGOES</span>
//           </h1>

//           <p className="mt-10 text-6xl text-navy tracking-wide font-crustaceans">
//             Authentic Ratnagiri Alphonso
//           </p>
//         </div>
//       </section>


//       {/* Content Sections */}
//       <div className="relative z-20 bg-primary-cream shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">

//         <Section id="about" className="bg-primary-cream">
//           <span className="text-primary-orange font-bold tracking-[0.2em] text-sm mb-4 block">THE ORIGIN</span>
//           <h2 className="text-4xl md:text-5xl font-serif text-navy mb-8">Legendary Konkan Heritage</h2>
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <p className="text-lg text-navy/80 leading-relaxed">
//               Sourced from the sun-drenched orchards of Ratnagiri and Devgad,
//               our Alphonso mangoes are the gold standard of taste. Each fruit
//               is nurtured by the coastal breeze and the unique volcanic soil
//               of the Konkan region, developing a depth of flavor that is
//               simply unparalleled.
//             </p>
//             <div className="aspect-square bg-mango-2/30 rounded-2xl flex items-center justify-center p-8">
//               <div className="text-center">
//                 <div className="text-5xl font-serif text-primary-orange mb-2">GI</div>
//                 <div className="text-sm font-bold tracking-widest text-navy/40 uppercase">Geographical Indication</div>
//               </div>
//             </div>
//           </div>
//         </Section>

//         <Section id="process" className="bg-FAF3E1">
//           <span className="text-primary-orange font-bold tracking-[0.2em] text-sm mb-4 block">OUR CRAFT</span>
//           <h2 className="text-4xl md:text-5xl font-serif text-navy mb-12">Natural Ripening, Honest Soil</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Hand-Picked",
//                 desc: "Harvested at precisely the right moment to ensure maximum sugar development.",
//                 icon: "🌿"
//               },
//               {
//                 title: "Chemical-Free",
//                 desc: "No calcium carbide. We ripen our mangoes naturally in hay, the traditional way.",
//                 icon: "📦"
//               },
//               {
//                 title: "Farm-Direct",
//                 desc: "Bypassing middlemen to bring the farmer's hard work directly to your doorstep.",
//                 icon: "🏠"
//               }
//             ].map((step, i) => (
//               <div key={i} className="p-8 bg-white/50 border border-primary-orange/10 rounded-xl hover:shadow-xl transition-all group">
//                 <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">{step.icon}</div>
//                 <h3 className="text-2xl font-serif text-navy mb-3">{step.title}</h3>
//                 <p className="text-navy/70 leading-relaxed">{step.desc}</p>
//               </div>
//             ))}
//           </div>
//         </Section>

//         <Section id="quality" className="bg-primary-cream pb-32">
//           <div className="text-center max-w-3xl mx-auto">
//             <h2 className="text-5xl md:text-6xl font-serif text-navy mb-8">Experience the Summer Gold</h2>
//             <p className="text-xl text-navy/60 mb-12 italic font-serif">
//               "The aroma alone is enough to transport you to the lush orchards of Maharashtra."
//             </p>
//             <button className="bg-navy text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-primary-orange transition-all transform hover:scale-105 shadow-xl">
//               Pre-Order for Next Harvest
//             </button>
//           </div>
//         </Section>

//         <footer className="py-12 px-8 border-t border-navy/5 text-center">
//           <div className="font-serif text-xl font-bold text-navy/40 mb-4">KonkanKart</div>
//           <p className="text-navy/30 text-sm">© 2024 KonkanKart Services. Authentically Sourced.</p>
//         </footer>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import VideoIntro from "@/components/VideoIntro";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import AnnouncementBar from "@/components/AnnouncementBar";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import HorizontalTimeline from "@/components/HorizontalTimeline";

export default function Home() {
  const [introEnded, setIntroEnded] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const handleVideoEnd = () => {
    setIntroEnded(true);
    // Automatic smooth scroll to first section
    setTimeout(() => {
      const firstSection = document.getElementById("our-story");
      if (firstSection) {
        firstSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <main className="relative bg-primary-cream overflow-x-hidden">
      <AnnouncementBar show={introEnded} />
      <Navbar show={introEnded} />

      {/* Cinematic Video Intro */}
      {!introEnded && (
        <VideoIntro
          videoSrc="/images/untitled.mp4"
          onVideoEnd={handleVideoEnd}
        />
      )}

      {/* Main Content */}
      <div ref={mainContentRef} className={`relative z-20 bg-primary-cream transition-opacity duration-1000 ${introEnded ? 'opacity-100' : 'opacity-0'}`}>

        {/* Parallax Hero Background or Spacer if needed */}
        {introEnded && (
          <div className="h-[20vh] bg-primary-cream" />
        )}

        {/* Origin Story */}
        <Section id="our-story" className="bg-linear-to-b from-primary-cream to-mango-9 py-24 md:py-32">
          <div className="text-center mb-24 mt-10">
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="inline-block text-primary-orange font-bold text-xs md:text-sm mb-6 uppercase"
            >
              Our Story
            </motion.span>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-8xl lg:text-9xl font-kg text-army-green mb-40 leading-[0.9] mt-1">
                The Authentic<br />
                <span className="block mt-10 text-primary-orange font-kg">
                  Taste of Konkan
                </span>
              </h2>
            </motion.div>


            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-xl md:text-6xl text-navy/60 font-crustaceans italic max-w-4xl mx-auto mt-8 px-6"
            >
              Bringing the rich heritage and authentic flavors of Konkan to homes across India
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="space-y-12">
              {[
                {
                  title: "Born from Love",
                  text: "At Konkan Kart, we're more than just a brand — we're a movement to bring the rich heritage, natural goodness, and authentic flavors of the Konkan region to homes across India."
                },
                {
                  title: "Supporting Local Farmers",
                  text: "Born out of love for our native soil and a deep desire to support local farmers, Konkan Kart was founded to offer pure, chemical-free products that celebrate Konkan's legacy — starting with our signature Devgad Hapus mangoes."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.2 }}
                  viewport={{ once: true }}
                  className="relative pl-8 border-l-2 border-primary-orange/30"
                >
                  <h3 className="text-2xl font-ganttie text-navy mb-4">{item.title}</h3>
                  <p className="text-lg md:text-xl text-navy/80 leading-relaxed font-manrope">
                    {item.text}
                  </p>
                </motion.div>
              ))}

              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { label: 'GI Certified', value: '✓', color: 'bg-mango-7/10' },
                  { label: 'Chemical Free', value: '100%', color: 'bg-primary-orange/10' },
                  { label: 'Farm Direct', value: '✓', color: 'bg-army-green/10' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.6 + i * 0.1 }}
                    viewport={{ once: true }}
                    className={`${stat.color} text-center p-6 rounded-3xl backdrop-blur-sm border border-white/20 shadow-xl transition-all`}
                  >
                    <div className="text-3xl font-bold text-primary-orange mb-2">{stat.value}</div>
                    <div className="text-sm text-navy/60 font-manrope font-bold uppercase tracking-tighter leading-none">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[3rem] overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]"
            >
              <div className="absolute inset-0 bg-linear-to-br from-mango-7 to-primary-orange flex items-center justify-center p-12 transition-transform duration-700 group-hover:scale-110">
                <div className="text-center relative">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-[12rem] md:text-[16rem] font-ganttie text-white/20 absolute -top-1/2 left-1/2 -translate-x-1/2 z-0 whitespace-nowrap"
                  >
                    ORIGIN
                  </motion.div>
                  <div className="relative z-10">
                    <div className="text-8xl md:text-9xl font-ganttie text-white drop-shadow-2xl mb-4">
                      GI
                    </div>
                    <div className="text-xl md:text-2xl font-bold tracking-[0.2em] text-white/90 uppercase mb-4">
                      Geographical<br />Indication
                    </div>
                    <div className="h-0.5 w-12 bg-white/50 mx-auto" />
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </motion.div>
          </div>
        </Section>

        {/* Process Section with Horizontal Scroll Feel */}
        <Section id="the-harvest" className="bg-mango-9 py-32 overflow-hidden relative" contentClassName="max-w-[85%] mx-auto">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]">
            <video
              src="/illustration.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center mb-32 relative z-10">
            <span className="inline-block text-primary-orange font-bold tracking-[0.3em] text-xs md:text-sm mb-4 uppercase relative z-10">
              Our Craft
            </span>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-ganttie text-navy mb-50 relative z-10 leading-[0.9]">
              Nature's Timeline
            </h2>
          </div>

          <HorizontalTimeline
            steps={[
              {
                title: "Hand-Picked",
                desc: "Each mango is carefully selected when it reaches the perfect maturity stage. Our farmers know the exact moment.",
                icon: "🌿",
                color: "bg-[#E2F0D9]"
              },
              {
                title: "Natural Ripening",
                desc: "We follow the ancient hay-ripening method. No calcium carbide, no artificial accelerants. Just time and patience.",
                icon: "📦",
                color: "bg-[#FFF4E0]"
              },
              {
                title: "Farm to Doorstep",
                desc: "Direct from our partner farmers' orchards to your home. You get the same freshness a Konkani family enjoys.",
                icon: "🚚",
                color: "bg-[#F0E5D8]"
              }
            ]}
          />
        </Section>

        {/* The Taste (Highlight Section) */}
        <section className="relative min-h-screen flex items-center justify-center py-40 bg-navy text-white overflow-hidden">
          {/* Dynamic background elements */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-radial-gradient from-primary-orange/20 to-transparent pointer-events-none"
          />

          <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-[12rem] font-kg mb-12 leading-[0.8] tracking-tighter "
            >
              A TASTE OF<br />
              <span className="text-primary-orange">SUMMER GOLD</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-4xl md:text-6xl font-crustaceans italic mb-16 text-mango-2 max-w-4xl mx-auto"
            >
              "The moment you bite into it, time slows down. Rich, buttery, and intensely saffron."
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "#E67000" }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-orange text-white px-12 py-6 rounded-full text-xl font-bold shadow-[0_20px_40px_rgba(250,129,18,0.4)]"
              >
                Pre-Order Now
              </motion.button>
            </div>
          </div>
        </section>

        {/* Quality Comparison / Features */}
        <Section id="quality" className="bg-primary-cream py-32 overflow-hidden relative">
          <motion.div
            style={{ x: useTransform(smoothY, [0.4, 0.8], [-200, 200]) }}
            className="absolute top-0 left-0 w-full text-[8rem] md:text-[12rem] font-ganttie text-black/5 whitespace-nowrap pointer-events-none select-none z-0"
          >
            AUTHENTICITY AUTHENTICITY AUTHENTICITY
          </motion.div>

          <div className="relative z-10">
            <div className="text-center mb-20">
              <span className="text-primary-orange font-bold tracking-[0.3em] text-sm uppercase mb-6 block">The Difference</span>
              <h2 className="text-5xl md:text-8xl lg:text-9xl font-ganttie text-navy mb-8 leading-tight">Why Choose<br />Konkan Kart?</h2>
              <p className="text-xl md:text-2xl text-navy/60 font-manrope max-w-3xl mx-auto">Pure, chemical-free products celebrating Konkan's legacy with every bite.</p>
            </div>

            {/* Steps/Cards Container */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
              {[
                {
                  title: "100% Natural",
                  points: ["Traditionally Ripened", "Chemical & Carbide Free", "Safe & Healthy"],
                  icon: "🌿"
                },
                {
                  title: "Farm Direct",
                  points: ["Sourced from Devgad & Ratnagiri", "Fast Doorstep Delivery", "Hygienically Packaged"],
                  icon: "🚚"
                },
                {
                  title: "Always Available",
                  points: ["24/7 Customer Support", "Instagram & WhatsApp Orders", "Multiple Payment Options"],
                  icon: "💬"
                }
              ].map((box, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="p-12 bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] rounded-[2.5rem] border-2 border-mango-8 group hover:border-primary-orange/30 hover:shadow-[0_40px_100px_-20px_rgba(250,129,18,0.15)] transition-all relative overflow-hidden"
                >
                  <div className="absolute -right-4 -top-4 text-8xl opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                    {box.icon}
                  </div>
                  <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-500">
                    {box.icon}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-ganttie text-navy mb-6 relative z-10">
                    {box.title}
                  </h3>
                  <ul className="space-y-4 relative z-10">
                    {box.points.map((p, j) => (
                      <li key={j} className="flex items-center gap-4 text-lg text-navy/70 font-manrope">
                        <span className="w-2 h-2 rounded-full bg-primary-orange flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Testimonials Section */}
        <Section id="testimonials" className="bg-mango-9 py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(250,129,18,0.1),transparent_50%)]" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="text-primary-orange font-bold tracking-[0.3em] text-sm uppercase mb-6 block">What Our Customers Say</span>
              <h2 className="text-5xl md:text-8xl lg:text-9xl font-ganttie text-navy mb-8 leading-tight">Loved By<br />Mango Lovers</h2>
              <p className="text-xl md:text-2xl text-navy/60 font-manrope max-w-3xl mx-auto">Real reviews from real mango enthusiasts</p>
            </motion.div>

            <TestimonialsCarousel
              testimonials={[
                {
                  name: "Purvesh Gaikwad",
                  review: "The sweetness and flavor are unmatched - truly nature's candy! The mangoes arrived on time and were perfectly ripe.",
                  rating: 5
                },
                {
                  name: "Shilpa Sakhre",
                  review: "Professional packaging and the taste is absolutely yummy! You can tell these are authentic Alphonso mangoes.",
                  rating: 5
                },
                {
                  name: "Karan Khot",
                  review: "Even as an orchard owner myself, I was impressed by how juicy and fragrant these mangoes are. Exceptional quality!",
                  rating: 5
                },
                {
                  name: "Anita Deshmukh",
                  review: "Best mangoes I've ever tasted! The natural ripening process really makes a difference. Will order again next season.",
                  rating: 5
                },
                {
                  name: "Rajesh Kulkarni",
                  review: "Farm-fresh quality delivered to my doorstep. The aroma alone is worth it! Highly recommend Konkan Kart.",
                  rating: 5
                }
              ]}
            />
          </div>
        </Section>

        {/* Footer with unique wave design or similar */}
        < footer className="bg-army-green text-primary-cream pt-32 pb-16 px-8 relative overflow-hidden" >
          <div className="absolute top-0 left-0 w-full h-24 overflow-hidden -translate-y-full">
            {/* Custom SVG Wave or transition */}
          </div>
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 mb-24 relative z-10">
            <div className="md:col-span-1">
              <div className="font-ganttie text-5xl mb-8">KONKAN<span className="text-primary-orange">KART</span></div>
              <p className="text-primary-cream/60 text-lg font-manrope">More than just a brand — a movement to bring<br />the rich heritage and authentic flavors<br />of Konkan to your doorstep.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:col-span-2">
              <div>
                <h4 className="font-bold text-lg mb-6 text-primary-orange">Explore</h4>
                <ul className="space-y-4 font-manrope text-primary-cream/80">
                  <li><a href="#our-story" className="hover:text-white transition-colors">Our Story</a></li>
                  <li><a href="#the-harvest" className="hover:text-white transition-colors">The Harvest</a></li>
                  <li><a href="#quality" className="hover:text-white transition-colors">Quality</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-6 text-primary-orange">Connect</h4>
                <ul className="space-y-4 font-manrope text-primary-cream/80">
                  <li>📞 +91 81692 46157</li>
                  <li>📧 konkankartmailbox@gmail.com</li>
                  <li>📍 Chembur, Mumbai, Maharashtra</li>
                  <li>📱 Instagram: @konkankart</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 font-manrope text-sm text-primary-cream/40">
            <p>© 2025 KonkanKart Services. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </footer >
      </div >
    </main >
  );
}