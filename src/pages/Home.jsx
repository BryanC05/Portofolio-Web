import { Navbar } from "@/components/Navbar";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mimic quick loading of assets/menu initial sequence
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#070e17] text-foreground">
      {/* P3R Diagonal Intro Wipe Animation */}
      <AnimatePresence>
        {loading && (
          <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
            {/* Cyan Accent Stripe */}
            <motion.div
              initial={{ x: "-100%", skewX: -15 }}
              animate={{ x: "100%", skewX: -15 }}
              exit={{ x: "100%" }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 bg-[#00e5ff] w-[130%] h-full origin-left"
              style={{ zIndex: 99 }}
            />
            {/* Velvet Blue Main Wipe */}
            <motion.div
              initial={{ x: "-100%", skewX: -15 }}
              animate={{ x: "0%", skewX: -15 }}
              exit={{ x: "100%", skewX: -15 }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 bg-gradient-to-r from-[#070e17] to-[#0c1a2f] w-[130%] h-full flex items-center justify-center"
              style={{ zIndex: 98 }}
            >
              {/* Intro Text / Monogram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex flex-col items-center p3r-skew-cancel"
              >
                <div className="border border-primary/40 border-l-4 border-l-primary bg-primary/10 px-8 py-4 mb-4">
                  <span className="text-3xl font-black tracking-[0.3em] text-primary text-glow">RELOAD</span>
                </div>
                <span className="text-[10px] font-bold tracking-[0.4em] text-accent">Bryan Chan Portfolio // SYSTEM INIT</span>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <StarBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};
