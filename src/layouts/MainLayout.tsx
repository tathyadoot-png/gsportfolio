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
    const containerRef = useRef<HTMLDivElement>(null);
    const isHi = lang === "hi";

    // Position Strategy: Anchored to edges with safe center margins
    const loaderImages = [
      { src: img18, pos: "top-[5%] left-[10%]" },
      { src: img19, pos: "top-[5%] right-[10%]" },
      { src: img20, pos: "bottom-[10%] left-[10%]" },
      { src: img21, pos: "bottom-[10%] right-[10%]" },
      { src: img22, pos: "top-[40%] left-[4%] hidden xl:block" },
      { src: img23, pos: "top-[40%] right-[4%] hidden xl:block" },
      { src: img24, pos: "top-[5%] left-[40%] hidden lg:block" },
      { src: img25, pos: "bottom-[5%] left-[40%] hidden lg:block" },
    ];

    useEffect(() => {
      localStorage.setItem("lang", lang);
      const timer = setTimeout(() => setLoading(false), 4000);

      if (loading) {
        const ctx = gsap.context(() => {
          // Super Smooth Entrance
          gsap.from(".loader-img", {
            opacity: 0,
            scale: 0.8,
            y: (i) => (i % 2 === 0 ? -40 : 40),
            duration: 1.5,
            stagger: 0.1,
            ease: "expo.out",
            force3D: true,
          });

          // Floating Motion
          gsap.to(".loader-img", {
            y: "random(-20, 20)",
            x: "random(-15, 15)",
            rotation: "random(-8, 8)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            force3D: true,
          });
        }, containerRef);

        return () => {
          ctx.revert();
          clearTimeout(timer);
        };
      }
    }, [loading]);

    const splitText = (text: string) => {
      if (!text) return [];
      const segmenter = new (Intl as any).Segmenter(isHi ? "hi" : "en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text)).map((s: any) => s.segment);
    };

    const firstName = useMemo(() => splitText(isHi ? "गणेश" : "GANESH"), [isHi]);
    const lastName = useMemo(() => splitText(isHi ? "सिंह" : "SINGH"), [isHi]);

    const letterAnim: Variants = {
      hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
      visible: { 
        opacity: 1, y: 0, filter: "blur(0px)",
        transition: { duration: 1, ease: [0.19, 1, 0.22, 1] } 
      }
    };

    return (
      <>
      <style>{`
        .loader-wrapper { 
          background: #ffffff; 
          background-image: radial-gradient(#f1f5f9 2px, transparent 2px);
          background-size: 40px 40px;
        }
        .loader-img {
          position: absolute;
          width: 150px; height: 150px;
          object-fit: cover;
          border-radius: 1.5rem;
          opacity: 0.6; /* Higher opacity for color visibility */
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          border: 4px solid white;
          z-index: 5;
          will-change: transform;
        }
        @media (min-width: 1024px) {
          .loader-img { width: 240px; height: 240px; border-radius: 2.5rem; }
        }
        .text-glow {
          text-shadow: 0 0 30px rgba(255,255,255,0.8);
        }
      `}</style>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loader"
              className="fixed inset-0 z-[9999] loader-container flex flex-col items-center justify-center overflow-hidden"
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
              {/* Background Images Layer */}
              <div ref={containerRef} className="absolute inset-0 pointer-events-none">
                {loaderImages.map((img, idx) => (
                  <img key={idx} src={img.src} className={`loader-img ${img.pos}`} alt="" />
                ))}
              </div>

              {/* Central Content */}
              <div className="relative z-20 safe-center flex flex-col items-center">
                <motion.img 
                  src={bjp} 
                  className="w-20 h-20 md:w-28 md:h-28 mb-10 object-contain drop-shadow-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                />

                <motion.div initial="hidden" animate="visible" className="text-center">
                  <div className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-8">
                    <h2 className="flex text-primary text-[14vw] md:text-[8vw] font-black uppercase leading-none tracking-tight">
                      {firstName.map((l, i) => (
                        <motion.span key={i} variants={letterAnim} transition={{ delay: i * 0.04 }}>{l}</motion.span>
                      ))}
                    </h2>
                    <h2 className="flex text-green text-[14vw] md:text-[8vw] font-black uppercase  leading-none">
                      {lastName.map((l, i) => (
                        <motion.span key={i} variants={letterAnim} transition={{ delay: 0.4 + (i * 0.04) }}>{l}</motion.span>
                      ))}
                    </h2>
                  </div>

                  {/* Modern Progress Indicator */}
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2, ease: "circOut" }} className="h-[2px] w-32 bg-gradient-to-r from-transparent via-primary to-transparent origin-center" />
                  </div>
                </motion.div>
              </div>

              <motion.div 
                className="absolute bottom-16 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <p className="text-slate-400 text-xs md:text-sm font-bold tracking-[0.6em] uppercase">
                  Satna Constituency
                </p>
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