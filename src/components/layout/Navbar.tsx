import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Globe, Menu, X, ArrowRight, Home, User, Map, Briefcase, Award, Star, Tv, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import hi from "@/locales/hi";
import en from "@/locales/en";
import logo from "@/assets/13.jpg";

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
      gsap.from(".nav-item-anim", {
        y: -10,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out"
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 z-[100] w-full px-4 py-4 md:py-6 flex justify-center">
      <div 
        className={`flex items-center justify-between px-6 py-2.5 transition-all duration-500 rounded-full border ${
          scrolled 
            ? "w-full max-w-[1200px] bg-white/90 backdrop-blur-xl border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.1)]" 
            : "w-full max-w-[1400px] bg-white border-transparent shadow-md"
        }`}
      >
        {/* LOGO SECTION */}
        <div className="nav-item-anim flex items-center gap-3 group">
          <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full border-2 border-green shrink-0">
            <img src={logo} alt="Logo" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-[Gotu] font-black text-primary text-sm md:text-lg tracking-tight uppercase leading-none">
              {lang === "hi" ? "गणेश सिंह" : "Ganesh Singh"}
            </h1>
            <span className="text-[8px] md:text-[9px] font-bold text-secondary tracking-widest uppercase mt-0.5">
              {lang === "hi" ? "सांसद - सतna" : "Member of Parliament"}
            </span>
          </div>
        </div>

        {/* DESKTOP NAV - Hidden on screens smaller than LG (1024px) */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="nav-item-anim relative px-4 py-2 group overflow-hidden"
            >
              <h1 className="relative z-10 text-[10px] font-black uppercase tracking-widest text-green group-hover:text-secondary transition-colors">
                {item.label}
              </h1>
              <motion.span 
                className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
              />
            </a>
          ))}
        </div>

        {/* ACTIONS SECTION */}
        <div className="nav-item-anim flex items-center gap-3">
          {/* Lang Toggle - Glass Pill */}
          <button
            onClick={() => setLang(lang === "hi" ? "en" : "hi")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-primary hover:text-white transition-all duration-300"
          >
            <Globe size={14} className="text-green group-hover:text-white" />
            <span className="text-[9px] font-black">{lang === "hi" ? "EN" : "हिंदी"}</span>
          </button>

          {/* Contact Button - Hidden on Mobile */}
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-full text-[9px] font-black uppercase hover:bg-primary transition-all shadow-lg"
          >
            {t.cta.contact}
            <ArrowRight size={14} className="text-green" />
          </a>

          {/* MOBILE TOGGLE - Visible ONLY on LG and smaller */}
          <button 
            className="lg:hidden p-2.5 text-secondary bg-slate-100 rounded-full active:scale-90 transition-all" 
            onClick={() => setIsOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU - Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 z-[120] bg-white flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-10">
               <div className="flex items-center gap-3">
                  <img src={logo} className="h-10 w-10 rounded-full border-2 border-green" />
                  <p className="font-black text-secondary uppercase tracking-tighter">Menu</p>
               </div>
               <button onClick={() => setIsOpen(false)} className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center">
                  <X size={24} />
               </button>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.href}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 group active:bg-green/5"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-green">{item.icon}</span>
                    <span className="text-lg font-black text-secondary uppercase tracking-tight">{item.label}</span>
                  </div>
                  <ArrowRight size={18} className="text-primary opacity-0 group-hover:opacity-100" />
                </motion.a>
              ))}
            </div>

            <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t">
               <button 
                onClick={() => { setLang(lang === "hi" ? "en" : "hi"); setIsOpen(false); }}
                className="py-4 rounded-2xl bg-slate-100 text-secondary font-black uppercase text-[10px] flex items-center justify-center gap-2"
               >
                  <Globe size={16} className="text-green" /> {lang === "hi" ? "English" : "हिंदी"}
               </button>
               <a href="#contact" className="py-4 rounded-2xl bg-primary text-white font-black uppercase text-[10px] flex items-center justify-center gap-2 shadow-lg">
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