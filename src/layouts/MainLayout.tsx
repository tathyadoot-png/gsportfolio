import { useEffect, useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import bjp from "@/assets/bjp.png";
import StickySocial from "@/components/layout/StickySocial";
import ScrollToTop from "@/components/layout/ScrollToTop";

export type Lang = "hi" | "en";

const MainLayout = () => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "hi";
    return localStorage.getItem("lang") === "en" ? "en" : "hi";
  });

  const [loading, setLoading] = useState(true);
  const isHi = lang === "hi";

  useEffect(() => {
    localStorage.setItem("lang", lang);
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, [lang]);

  const splitText = (text: string) => {
    if (!text) return [];
    try {
      const segmenter = new (Intl as any).Segmenter(isHi ? "hi" : "en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text)).map((s: any) => s.segment);
    } catch (e) {
      return text.split("");
    }
  };

  const firstName = useMemo(() => splitText(isHi ? "गणेश" : "GANESH"), [isHi]);
  const lastName = useMemo(() => splitText(isHi ? "सिंह" : "SINGH"), [isHi]);

  const textContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  // Naya Floating Animation
  const letterAnim: Variants = {
    hidden: { opacity: 0, x: -20, filter: "blur(5px)" },
    visible: { 
      opacity: 1, x: 0, filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <>
      <style>{`
        .ganesh-white-loader { 
          background: #ffffff; 
          background-image: radial-gradient(#f0f0f0 1px, transparent 1px);
          background-size: 30px 30px;
          overflow: hidden; 
        }
        .royal-border {
          position: absolute;
          border: 1px solid rgba(255, 153, 51, 0.2);
          inset: 20px;
          pointer-events: none;
        }
        .sun-glow {
          position: absolute;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(255, 153, 51, 0.05) 0%, transparent 70%);
          top: -200px; right: -200px;
          border-radius: 50%;
        }
      `}</style>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[9999] ganesh-white-loader flex flex-col items-center justify-center"
            exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.6 } }}
          >
            <div className="sun-glow" />
            <div className="royal-border" />

            {/* BJP Logo with Rotating Shadow */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-20 mb-10"
            >
              <img src={bjp} className="w-20 h-20 object-contain" alt="BJP" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full scale-150"
              />
            </motion.div>

            <motion.div variants={textContainer} initial="hidden" animate="visible" className="z-10 text-center">
              {/* First Name (GANESH) - Ab ye Navy Blue mein hai (Trust Color) */}
              <div className="flex justify-center mb-1">
                <h2 className="flex text-primary text-[12vw] sm:text-[8vw] font-black  uppercase">
                  {firstName.map((l, i) => (
                    <motion.span key={i} variants={letterAnim}>{l}</motion.span>
                  ))}
                </h2>
              </div>

              {/* Tri-color Divider Line */}
              <div className="flex items-center justify-center gap-1 my-4">
                <motion.div initial={{ width: 0 }} animate={{ width: "40px" }} className="h-1 bg-primary rounded-full" />
                <motion.div initial={{ width: 0 }} animate={{ width: "40px" }} transition={{ delay: 0.2 }} className="h-1 bg-slate-200 rounded-full" />
                <motion.div initial={{ width: 0 }} animate={{ width: "40px" }} transition={{ delay: 0.4 }} className="h-1 bg-green rounded-full" />
              </div>

              {/* Last Name (SINGH) - Ab ye Green mein hai (Growth Color) */}
              <div className="flex justify-center">
                <h2 className={`flex text-green text-[10vw] sm:text-[6vw] font-light uppercase italic ${isHi ? "space-x-1" : "tracking-[0.5em]"}`}>
                  {lastName.map((l, i) => (
                    <motion.span key={i} variants={letterAnim}>{l}</motion.span>
                  ))}
                </h2>
              </div>
            </motion.div>

            {/* Bottom Content: Satna Legacy */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.8 }}
              className="absolute bottom-20 text-center z-20"
            >
              <p className="text-secondary font-bold text-[17px] sm:text-[12px]  uppercase">
                {isHi ? "3 दशक का अटूट विश्वास" : "3 Decades of Unshakable Trust"}
              </p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="h-[2px] w-4 bg-primary" />
                <span className="text-[9px] text-secondary font-medium uppercase ">Satna Constituency</span>
                <span className="h-[2px] w-4 bg-green" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Navbar lang={lang} setLang={setLang} />
          <StickySocial /> 
          <ScrollToTop />
          <main className="min-h-screen bg-white">
            <Outlet context={{ lang }} />
          </main>
          <Footer lang={lang} />
        </motion.div>
      )}
    </>
  );
};

export default MainLayout;