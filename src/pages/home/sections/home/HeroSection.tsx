import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { HiArrowRight } from "react-icons/hi2";
import gsap from "gsap";
import bjp from "@/assets/bjp.png"; 

// Images
import slid1 from "@/assets/img3.jpg";
import slid2 from "@/assets/img5.jpg"; // सुनिश्चित करें कि ये अलग इमेज है
import slid3 from "@/assets/img2.jpg"; // तीसरी इमेज का पाथ चेक करें

const HeroSection = ({ lang = "hi" }: { lang?: "hi" | "en" }) => {
  const isHi = lang === "hi";
  const images = [slid1, slid2, slid3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  // Image Slider Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-badge", { opacity: 0, x: -30, duration: 0.8, ease: "power3.out" })
        .from(".hero-title span", { 
          y: 100, 
          opacity: 0, 
          stagger: 0.2, 
          duration: 1, 
          ease: "power4.out" 
        }, "-=0.5")
        .from(".hero-desc", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".hero-action", { opacity: 0, scale: 0.9, duration: 0.5, stagger: 0.2 }, "-=0.4");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen lg:h-[95vh] w-full pt-20 md:pt-0 bg-white overflow-hidden flex flex-col lg:flex-row">
      
      {/* ================= LEFT: IMAGE ZONE ================= */}
      <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-full overflow-hidden pt-16 lg:pt-0 border-b-4 border-primary lg:border-b-0">
        
        <div className="absolute left-0 top-0 w-1.5 lg:w-3 h-full z-20 flex flex-col">
          <div className="flex-1 bg-primary" /> 
          <div className="flex-1 bg-white" />  
          <div className="flex-1 bg-green" />  
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
          >
            <img 
              src={images[currentIndex]} 
              className="w-full h-full object-cover object-[center_15%] lg:object-top" 
              alt={`Ganesh Singh Ji ${currentIndex + 1}`}
            />
            {/* Overlay for better text contrast on mobile */}
            <div className="absolute inset-0 bg-black/10 lg:hidden" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent hidden lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent lg:hidden" />
      </div>

      {/* ================= RIGHT: CONTENT PANEL ================= */}
      <div className="relative w-full lg:w-1/2 flex items-center px-6 md:px-12 lg:px-24 bg-white py-12 lg:py-0">
        
        <div className="w-full z-10">
          
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-3 px-4 py-2 bg-green/5 border-l-4 border-green rounded-r-xl mb-6 lg:mb-10">
            <img src={bjp} alt="BJP" className="w-6 h-6 object-contain" />
            <span className="text-primary font-black text-[10px] lg:text-xs uppercase tracking-[0.2em]">
              {isHi ? "सतना के विकास का ध्वजवाहक" : "Leader of Satna's Progress"}
            </span>
          </div>

          {/* Heading Stack */}
       {/* Heading Stack */}
<div className="hero-title space-y-0 lg:space-y-2 overflow-hidden">
  <h2 className="text-green py-2 font-gotu text-xl lg:text-3xl font-bold italic block">
    {isHi ? "जनप्रिय सांसद" : "People's MP"}
  </h2>
  {/* यहाँ leading-[0.85] को बदलकर leading-[1.1] या leading-tight किया गया है */}
  <h1 className="text-[clamp(2.8rem,9vw,6rem)] font-black leading-[1.1] lg:leading-[1] uppercase tracking-tighter py-3 block">
    <span className="text-primary inline-block">{isHi ? "गणेश" : "GANESH"}</span> <br />
    <span className="text-green inline-block">{isHi ? "सिंह" : "SINGH"}</span>
  </h1>
</div>

          {/* Description */}
          <div className="hero-desc mt-6 lg:mt-10 relative pl-6 border-l-4 border-primary">
            <p className="text-green/80 font-martel text-base lg:text-xl leading-relaxed max-w-xl">
              {isHi 
                ? "32 वर्षों से अधिक का अटूट राजनैतिक सफर, जिसमें सतना की माटी और जन-जन का विश्वास समाहित है।" 
                : "A journey of over 32 years in public service, built on the profound trust of Satna."}
            </p>
          </div>

          {/* Action Row */}
          <div className="hero-action flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-10 lg:mt-14">
            <button className="group relative w-full sm:w-auto bg-green text-white px-8 py-4 lg:px-10 lg:py-5 rounded-xl font-black text-xs uppercase tracking-widest overflow-hidden transition-all shadow-xl shadow-green/20">
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isHi ? "विकास यात्रा" : "Development Journey"}
                <HiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </button>

            <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="text-slate-800 text-3xl lg:text-4xl font-black leading-none italic">3</span>
                    <span className="text-primary text-xl lg:text-2xl font-black tracking-tighter">{isHi ? "दशक" : "DECADES"}</span>
                  </div>
                  <p className="text-green font-bold text-[9px] lg:text-[10px] uppercase tracking-wider mt-1 whitespace-nowrap">
                    {isHi ? "बेमिसाल जन-सेवा" : "OF PUBLIC SERVICE"}
                  </p>
                </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="hero-action mt-12 lg:mt-20 flex items-center gap-3">
             {images.map((_, i) => (
               <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`transition-all duration-500 h-1.5 rounded-full ${currentIndex === i ? 'w-12 bg-primary' : 'w-4 bg-green/20'}`}
               />
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;