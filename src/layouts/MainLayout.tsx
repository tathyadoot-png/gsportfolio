import { useEffect, useState, useMemo, useRef } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import gsap from "gsap";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import bjp from "@/assets/bjp.png";
import StickySocial from "@/components/layout/StickySocial";
import ScrollToTop from "@/components/layout/ScrollToTop";

// Assets
import img18 from "@/assets/18.jpg";
import img19 from "@/assets/img3.jpg";
import img20 from "@/assets/img8.jpg";
import img21 from "@/assets/img30.jpeg";
import img22 from "@/assets/img27.jpeg";
import img23 from "@/assets/img15.jpg";
import img24 from "@/assets/img18.jpg";
import img25 from "@/assets/img33.jpg";

export type Lang = "hi" | "en";

const MainLayout = () => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "hi";
    return localStorage.getItem("lang") === "en" ? "en" : "hi";
  });

  const [loading, setLoading] = useState(true);
  const imagesRef = useRef<HTMLDivElement>(null);
  const isHi = lang === "hi";

  const loaderImages = [
    { src: img18, pos: "top-[8%] left-[5%] md:left-[8%]" },
    { src: img19, pos: "top-[12%] right-[5%] md:right-[10%]" },
    { src: img20, pos: "bottom-[18%] left-[5%] md:left-[10%]" },
    { src: img21, pos: "bottom-[12%] right-[5%] md:right-[12%]" },
    { src: img22, pos: "top-[35%] left-[-2%] md:left-[2%] hidden lg:block" },
    { src: img23, pos: "top-[40%] right-[-2%] md:right-[2%] hidden lg:block" },
    { src: img24, pos: "bottom-[35%] left-[2%] hidden md:block" },
    { src: img25, pos: "bottom-[5%] left-[35%] hidden md:block" },
  ];

  useEffect(() => {
    localStorage.setItem("lang", lang);
    const timer = setTimeout(() => setLoading(false), 4000);

    if (loading) {
      const ctx = gsap.context(() => {
        gsap.from(".loader-img", {
          scale: 0,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "back.out(1.7)",
        });

        gsap.to(".loader-img", {
          y: "random(-25, 25)",
          x: "random(-15, 15)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }, imagesRef);

      return () => {
        ctx.revert();
        clearTimeout(timer);
      };
    }
  }, [lang, loading]);

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
      transition: { staggerChildren: 0.08, delayChildren: 0.6 }
    }
  };

  const letterAnim: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { 
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <>
      <style>{`
        .ganesh-white-loader { 
          background: #ffffff; 
          background-image: radial-gradient(#e5e7eb 1.5px, transparent 1.5px);
          background-size: 40px 40px;
          overflow: hidden; 
        }
        .loader-img {
          position: absolute;
          width: 115px; height: 115px;
          object-fit: cover;
          border-radius: 1.5rem;
          opacity: 0.45;
          box-shadow: 0 15px 35px rgba(0,0,0,0.12);
          filter: grayscale(15%);
          z-index: 5;
        }
        @media (min-width: 768px) {
          .loader-img { width: 195px; height: 195px; border-radius: 2.5rem; }
        }
      `}</style>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[9999] ganesh-white-loader flex flex-col items-center justify-center px-4"
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8 } }}
          >
            <div ref={imagesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
              {loaderImages.map((img, idx) => (
                <img key={idx} src={img.src} className={`loader-img ${img.pos}`} alt="" />
              ))}
            </div>

            <div className="relative z-20 flex flex-col items-center w-full max-w-6xl">
                <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="mb-8">
                  <img src={bjp} className="w-16 h-16 md:w-24 md:h-24 object-contain" alt="BJP" />
                </motion.div>

                <motion.div variants={textContainer} initial="hidden" animate="visible" className="w-full">
                  <div className="flex flex-nowrap justify-center items-baseline gap-3 md:gap-6 overflow-hidden whitespace-nowrap">
                    <h2 className="flex text-primary py-10 text-[11vw] sm:text-[8vw] font-black uppercase leading-none">
                      {firstName.map((l, i) => (
                        <motion.span key={i} variants={letterAnim}>{l}</motion.span>
                      ))}
                    </h2>
                    <h2 className={`flex text-green text-[9.5vw] sm:text-[6.5vw] font-light uppercase italic leading-none ${isHi ? "" : "tracking-tighter"}`}>
                      {lastName.map((l, i) => (
                        <motion.span key={i} variants={letterAnim}>{l}</motion.span>
                      ))}
                    </h2>
                  </div>

                  <div className="flex items-center justify-center gap-1 mt-8">
                    <motion.div initial={{ width: 0 }} animate={{ width: "15%" }} className="h-[2px] bg-primary rounded-full max-w-[120px]" />
                    <motion.div initial={{ width: 0 }} animate={{ width: "15%" }} transition={{ delay: 0.2 }} className="h-[2px] bg-slate-200 rounded-full max-w-[120px]" />
                    <motion.div initial={{ width: 0 }} animate={{ width: "15%" }} transition={{ delay: 0.4 }} className="h-[2px] bg-green rounded-full max-w-[120px]" />
                  </div>
                </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 1.5 }}
              className="absolute bottom-12 text-center z-20 w-full"
            >
              <p className="text-secondary font-black text-[14px] sm:text-[18px] uppercase tracking-[0.25em]">
                {isHi ? "3 दशक का अटूट विश्वास" : "3 Decades of Unshakable Trust"}
              </p>
              <div className="mt-3 flex items-center justify-center gap-3 opacity-60">
                <span className="h-[1px] w-10 bg-primary" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Satna Constituency</span>
                <span className="h-[1px] w-10 bg-green" />
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