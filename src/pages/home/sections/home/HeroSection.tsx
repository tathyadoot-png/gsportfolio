import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { HiArrowRight } from "react-icons/hi2";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bjp from "@/assets/bjp.png"; 

// Images
import slid1 from "@/assets/img3.jpg";
import slid20 from "@/assets/img20.jpg";
import slid31 from "@/assets/img37.jpg";
import slid13 from "@/assets/img13.jpg";
import slid15 from "@/assets/img15.jpg";
import slid18 from "@/assets/img18.jpg"; 
import slid3 from "@/assets/img2.jpg"; 

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ lang = "hi" }: { lang?: "hi" | "en" }) => {
  const isHi = lang === "hi";
  const images = [slid1, slid20, slid31, slid15, slid13, slid18, slid3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const imageZoneRef = useRef(null);

  // FIXED SLIDER LOGIC
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // GSAP Animations (Aapka original logic)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-badge", { 
        opacity: 0, 
        x: -50, 
        duration: 1, 
        ease: "expo.out" 
      })
      .from(".hero-title span", { 
        y: 120, 
        opacity: 0, 
        stagger: 0.15, 
        duration: 1.2, 
        ease: "power4.out" 
      }, "-=0.7")
      .from(".hero-desc", { 
        opacity: 0, 
        x: -20, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "-=0.6")
      .from(".hero-action", { 
        opacity: 0, 
        y: 30, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "back.out(1.7)" 
      }, "-=0.5");

      gsap.to(imageZoneRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(".hero-title", {
        scale: 0.95,
        opacity: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "center top",
          scrub: true
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen lg:h-[95vh] w-full pt-5 md:pt-0 bg-white overflow-hidden flex flex-col lg:flex-row">
      
      {/* ================= LEFT: IMAGE ZONE ================= */}
      <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-full overflow-hidden pt-16 lg:pt-0 border-b-4 border-primary lg:border-b-0">
        
        {/* Aapki original color strip */}
        <div className="absolute left-0 top-0 w-1.5 lg:w-3 h-full z-20 flex flex-col">
          <div className="flex-1 bg-primary" /> 
          <div className="flex-1 bg-white" />  
          <div className="flex-1 bg-green" />  
        </div>

        {/* FIXED IMAGE SLIDER WRAPPER */}
        <div ref={imageZoneRef} className="w-full h-full relative">
          <AnimatePresence mode="popLayout"> {/* 'popLayout' prevent jumping during transition */}
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full h-full absolute inset-0 object-cover object-[center_15%] lg:object-top"
              alt="Ganesh Singh Ji"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/5 lg:hidden" />
        </div>

        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent hidden lg:block z-10" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent lg:hidden z-10" />
      </div>

      {/* ================= RIGHT: CONTENT PANEL (UNTOUCHED) ================= */}
      <div className="relative w-full lg:w-1/2 flex items-center px-6 md:px-12 lg:px-24 bg-white py-12 lg:py-0">
        
        <div className="w-full z-10">
          <div className="hero-badge inline-flex items-center gap-3 px-4 py-2 bg-green/5 border-l-4 border-green rounded-r-xl mb-6 lg:mb-10">
            <img src={bjp} alt="BJP" className="w-6 h-6 object-contain" />
            <span className="text-primary font-black text-[10px] lg:text-xs uppercase ">
              {isHi ? "सतना के विकास के ध्वजवाहक" : "Leader of Satna's Progress"}
            </span>
          </div>

          <div className="hero-title space-y-0 lg:space-y-2">
            <h2 className="text-green py-2 font-gotu text-xl lg:text-3xl font-bold italic block">
              {isHi ? "जनप्रिय सांसद" : "People's MP"}
            </h2>
            <h1 className="text-[clamp(2.8rem,9vw,6rem)] font-black leading-[1.1] lg:leading-[1] uppercase py-6 block overflow-hidden">
              <span className="text-primary inline-block">{isHi ? "गणेश" : "GANESH"}</span> <br />
              <span className="text-green inline-block">{isHi ? "सिंह" : "SINGH"}</span>
            </h1>
          </div>

          <div className="hero-desc mt-6 lg:mt-10 relative pl-6 border-l-4 border-primary">
            <p className="text-green/80 font-Poppins text-base lg:text-xl leading-relaxed max-w-xl">
              {isHi 
                ? "3 दशक से अधिक का अटूट राजनीतिक सफर, जिसमें सतना का विकास और जन-जन का विश्वास समाहित है" 
                : "A journey of over 3 decades in public service, built on the profound trust of Satna."}
            </p>
          </div>

          <div className="hero-action flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-10 lg:mt-14">
            <button className="group relative w-full sm:w-auto bg-green text-white px-8 py-4 lg:px-10 lg:py-5 rounded-xl font-black text-xs uppercase overflow-hidden transition-all shadow-xl shadow-green/20 hover:shadow-primary/40">
              <a href="#journey" className="relative z-10 flex items-center justify-center gap-3">
                {isHi ? "विकास यात्रा" : "Development Journey"}
                <HiArrowRight className="text-lg group-hover:translate-x-2 transition-transform duration-300" />
              </a>
              <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-power4-in-out" />
            </button>

            <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="text-slate-800 text-3xl lg:text-4xl font-black  italic">3</span>
                    <span className="text-primary text-xl lg:text-2xl font-black ">{isHi ? "दशक का विश्वास" : "DECADES"}</span>
                  </div>
                  <span className="text-green font-bold text-[9px] lg:text-[19px] uppercase  whitespace-nowrap">
                    {isHi ? "सतना का विकास" : "OF PUBLIC SERVICE"}
                  </span>
                </div>
            </div>
          </div>

          <div className="hero-action mt-12 lg:mt-20 flex items-center gap-3">
             {images.map((_, i) => (
               <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`transition-all duration-700 h-2 rounded-full ${currentIndex === i ? 'w-16 bg-primary' : 'w-4 bg-green/20 hover:bg-green/40'}`}
               />
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;