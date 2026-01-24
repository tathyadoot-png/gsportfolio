import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Globe, Menu, X, ArrowRight, Home, User, Map, Briefcase, Award, Star, Tv, PhoneCall, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hi from "@/locales/hi";
import en from "@/locales/en";
import logo from "@/assets/13.jpg";

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

  // --- यहाँ स्मूथ स्क्रॉल फंक्शन जोड़ा गया है ---
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const targetId = id.replace('#', ''); // '#' हटाने के लिए
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setIsOpen(false); // मोबाइल मेनू बंद करने के लिए
    }
  };

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
      gsap.from(".nav-container", {
        y: -100, opacity: 0, duration: 1.2, ease: "expo.out",
      });
      gsap.from(".nav-item-anim", {
        y: -20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power4.out", delay: 0.5,
      });
      ScrollTrigger.create({
        start: "top -20",
        onUpdate: (self) => {
          if (self.scroll() > 40) setScrolled(true);
          else setScrolled(false);
        },
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 z-[100] w-full px-4 py-4 md:py-6 flex justify-center">
      <div 
        className={`nav-container flex items-center justify-between px-5 md:px-8 py-2.5 transition-all duration-500 rounded-full border bg-white shadow-md ${
          scrolled ? "w-full max-w-[1480px] border-slate-200" : "w-full max-w-[1580px] border-transparent"
        }`}
      >
        <div className="nav-item-anim flex items-center gap-3 group cursor-pointer shrink-0 min-w-fit">
          <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full border-2 border-green">
            <img src={logo} alt="Logo" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-[Gotu] font-black text-primary text-sm md:text-[22px] uppercase leading-none whitespace-nowrap">
              {lang === "hi" ? "गणेश सिंह" : "Ganesh Singh"}
            </h1>
            <span className="text-[8px] md:text-[14px] font-bold text-secondary uppercase mt-0.5 whitespace-nowrap">
              {lang === "hi" ? "सांसद - सतना" : "MP - Satna"}
            </span>
          </div>
        </div>

        {/* DESKTOP NAV - यहाँ onClick जोड़ा गया है */}
        <div className="hidden xl:flex items-center justify-center gap-1 mx-4">
          {navItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              onClick={(e) => scrollToSection(e, item.href)}
              className="nav-item-anim relative px-3 py-2 group overflow-hidden whitespace-nowrap"
            >
              <h1 className="relative z-10 text-[15px] font-black uppercase text-green group-hover:text-secondary transition-colors duration-300">
                {item.label}
              </h1>
              <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </div>

        <div className="nav-item-anim flex items-center gap-2 md:gap-2 shrink-0">
          <a
            href="https://www.ssksatna.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 bg-green text-white px-3 py-2 rounded-full text-[11px] font-gotu uppercase hover:bg-green hover:text-white transition-all shadow-sm whitespace-nowrap"
          >
            {lang === "hi" ? "सांसद सुविधा केंद्र" : "Sansad Suvidha Kendra"}
          </a>

          {/* Contact Link - यहाँ भी onClick जोड़ा गया है */}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="hidden sm:flex items-center gap-2 bg-secondary text-white px-3 py-2 rounded-full text-[11px] font-gotu uppercase hover:bg-primary hover:scale-105 transition-all shadow-lg whitespace-nowrap"
          >
            {t.cta.contact}
          </a>

          <button
            onClick={() => setLang(lang === "hi" ? "en" : "hi")}
            className="flex items-center gap-2 px-2 md:px-4 py-2 rounded-full bg-slate-100 hover:bg-primary hover:text-white transition-all duration-300 group min-w-fit"
          >
            <Globe size={14} className="text-green group-hover:text-white transition-colors" />
            <span className="text-[11px] font-gotu uppercase">{lang === "hi" ? "ENG" : "हिन्दी"}</span>
          </button>
          <button 
            className="xl:hidden p-2.5 text-secondary bg-slate-100 rounded-full active:scale-90 transition-all" 
            onClick={() => setIsOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU - यहाँ भी onClick जोड़ा गया है */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[120] bg-white flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-8">
               <div className="flex items-center gap-3">
                  <img src={logo} className="h-10 w-10 rounded-full border-2 border-green" />
                  <p className="font-black text-secondary uppercase ">Ganesh Singh</p>
               </div>
               <button onClick={() => setIsOpen(false)} className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center">
                  <X size={24} />
               </button>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto">
              <a href="https://www.ssksatna.com/" target="_blank" className="flex items-center justify-between p-5 rounded-2xl bg-green/10 border-2 border-green/20 mb-2">
                <span className="text-lg font-black font-[gotu] text-green uppercase italic">{lang === "hi" ? "सांसद सुविधा केंद्र" : "SSK Satna"}</span>
                <ExternalLink size={18} className="text-green" />
              </a>
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.href}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 active:bg-green/5 transition-colors"
                >
                  <span className="text-green">{item.icon}</span>
                  <span className="text-lg font-[gotu] text-secondary uppercase">{item.label}</span>
                </motion.a>
              ))}
            </div>

            <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                <button onClick={() => { setLang(lang === "hi" ? "en" : "hi"); setIsOpen(false); }} className="py-4 rounded-2xl bg-slate-100 text-secondary font-black uppercase text-[12px] flex items-center justify-center gap-2 shadow-sm">
                  <Globe size={16} className="text-green" /> {lang === "hi" ? "English" : "हिंदी"}
                </button>
                <a 
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="py-4 rounded-2xl bg-primary text-white font-black uppercase text-[12px] flex items-center justify-center gap-2 shadow-lg"
                >
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