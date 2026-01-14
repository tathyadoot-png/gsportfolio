import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Globe, Menu, X, ArrowRight, Home, User, Map, Briefcase, Award, Star, Tv, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // ScrollTrigger import kiya
import hi from "@/locales/hi";
import en from "@/locales/en";
import logo from "@/assets/13.jpg";

// GSAP Plugins register karein
gsap.registerPlugin(ScrollTrigger);

type Lang = "hi" | "en";

interface NavbarProps {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const Navbar = ({ lang, setLang }: NavbarProps) => {
  const t = lang === "hi" ? hi : en;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const containerRef = useRef(null);

  const navItems = [
    { label: t.nav.home, href: "#home", icon: <Home size={18} /> },
    { label: t.nav.about, href: "#about", icon: <User size={18} /> },
    { label: lang === "hi" ? "राजनीतिक यात्रा" : "Journey", href: "#journey", icon: <Map size={18} /> },
    { label: lang === "hi" ? "प्रमुख कार्य" : "Works", href: "#contributions", icon: <Briefcase size={18} /> },
    { label: t.nav.achievements, href: "#achievements", icon: <Award size={18} /> },
    { label: lang === "hi" ? "नेतृत्व" : "Leadership", href: "#leadership", icon: <Star size={18} /> },
    { label: t.nav.media, href: "#media", icon: <Tv size={18} /> },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Entrance Animation (Jab page load hoga)
      gsap.from(".nav-container", {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      });

      gsap.from(".nav-item-anim", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5,
      });

      // 2. Scroll Animation (Jab scroll karenge)
      ScrollTrigger.create({
        start: "top top",
        end: "+=100",
        onUpdate: (self) => {
          // Logic for scroll state (optional but kept for class toggling)
          if (self.scroll() > 40) setScrolled(true);
          else setScrolled(false);
        },
        // Container ki width aur padding ko scroll ke sath animate karna
        animation: gsap.to(".nav-container", {
          maxWidth: "1200px",
          paddingTop: "10px",
          paddingBottom: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          borderRadius: "100px",
          scrollTrigger: {
            start: "top -20",
            end: "top -100",
            scrub: true,
          }
        })
      });
    }, navRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 z-[100] w-full px-4 py-4 md:py-6 flex justify-center">
      <div 
        className={`nav-container flex items-center justify-between px-6 py-2.5 transition-all duration-500 rounded-full border ${
          scrolled 
            ? "w-full border-slate-200" 
            : "w-full max-w-[1400px] bg-white border-transparent shadow-md"
        }`}
      >
        {/* LOGO SECTION */}
        <div className="nav-item-anim flex items-center gap-3 group cursor-pointer">
          <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full border-2 border-green shrink-0">
            <img src={logo} alt="Logo" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-115" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-[Gotu] font-black text-primary text-sm md:text-lg uppercase leading-none">
              {lang === "hi" ? "गणेश सिंह" : "Ganesh Singh"}
            </h1>
            <span className="text-[8px] md:text-[12px] font-bold text-secondary uppercase mt-0.5">
              {lang === "hi" ? "सांसद - सतना" : "Member of Parliament"}
            </span>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="nav-item-anim relative px-4 py-2 group overflow-hidden"
            >
              <h1 className="relative z-10 text-[10px] font-black uppercase text-green group-hover:text-secondary transition-colors duration-300">
                {item.label}
              </h1>
              <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </div>

        {/* ACTIONS SECTION */}
        <div className="nav-item-anim flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "hi" ? "en" : "hi")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-primary hover:text-white transition-all duration-300 group"
          >
            <Globe size={14} className="text-green group-hover:text-white transition-colors" />
            <span className="text-[9px] font-black">{lang === "hi" ? "EN" : "हिंदी"}</span>
          </button>

          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-full text-[9px] font-black uppercase hover:bg-primary hover:scale-105 transition-all shadow-lg"
          >
            {t.cta.contact}
            <ArrowRight size={14} className="text-green" />
          </a>

          <button 
            className="lg:hidden p-2.5 text-secondary bg-slate-100 rounded-full active:scale-90 transition-all" 
            onClick={() => setIsOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[120] bg-white flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-10">
               <div className="flex items-center gap-3">
                  <img src={logo} className="h-10 w-10 rounded-full border-2 border-green" />
                  <p className="font-black text-secondary uppercase">Menu</p>
               </div>
               <button onClick={() => setIsOpen(false)} className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center hover:rotate-90 transition-transform">
                  <X size={24} />
               </button>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.href}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.08 }}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 group active:bg-green/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-green">{item.icon}</span>
                    <span className="text-lg font-black text-secondary uppercase">{item.label}</span>
                  </div>
                  <ArrowRight size={18} className="text-primary opacity-0 group-hover:opacity-100 transition-all" />
                </motion.a>
              ))}
            </div>

            <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t">
               <button 
                onClick={() => { setLang(lang === "hi" ? "en" : "hi"); setIsOpen(false); }}
                className="py-4 rounded-2xl bg-slate-100 text-secondary font-black uppercase text-[10px] flex items-center justify-center gap-2 active:scale-95 transition-transform"
               >
                  <Globe size={16} className="text-green" /> {lang === "hi" ? "English" : "हिंदी"}
               </button>
               <a href="#contact" className="py-4 rounded-2xl bg-primary text-white font-black uppercase text-[10px] flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
                  <PhoneCall size={16} /> Contact
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;