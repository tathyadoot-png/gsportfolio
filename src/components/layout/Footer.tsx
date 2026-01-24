import { ArrowUpRight, Heart } from "lucide-react";
import logo from "@/assets/SociyoLogo.png";
import logo1 from "@/assets/logoLight.png";
import logo2 from "@/assets/logoDark.png";
import type { Lang } from "@/layouts/MainLayout";

const Footer = ({ lang }: { lang: Lang }) => {
  const isHi = lang === "hi";

  const navLinks = [
    { label: isHi ? "होम" : "Home", path: "/" },
    { label: isHi ? "परिचय" : "About", path: "#about" },
    { label: isHi ? "विकास यात्रा" : "Journey", path: "#journey" },
    { label: isHi ? "उपलब्धियाँ" : "Achievements", path: "#achievements" },
    { label: isHi ? "नेतृत्व" : "Leadership", path: "#leadership" },
    { label: isHi ? "गैलरी" : "Gallery", path: "#gallery" },
  ];

  return (
    <footer className="relative bg-white pt-16 overflow-hidden">
      {/* Patriotic Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[4px] flex">
        <div className="h-full w-1/2 bg-primary" /> {/* Saffron */}
        <div className="h-full w-1/2 bg-green" />  {/* Green */}
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        
        {/* Top Section: Branding & Links */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pb-12">
          <div className="text-center lg:text-left space-y-2">
            <h2 className="font-gotu text-3xl md:text-4xl font-black text-secondary  uppercase">
              {isHi ? "गणेश सिंह" : "Ganesh Singh"}
            </h2>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span className="h-px w-8 bg-primary" />
             
              <span className="h-px w-8 bg-green" />
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {navLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={link.path} 
                className="relative text-[11px] font-black text-secondary/50 hover:text-secondary transition-colors uppercase  group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>
        </div>

        {/* Middle Section: Slogan */}
        {/* <div className="py-8 border-t border-slate-100 flex justify-center">
          <p className="font-martel text-secondary/40 text-sm md:text-base italic text-center">
            {isHi ? "“प्रगतिशील विन्ध्य, समृद्ध प्रदेश - हमारा संकल्प, हमारा गौरव”" : "“Progressive Vindhya, Prosperous State - Our Resolve, Our Pride”"}
          </p>
        </div> */}

        {/* The Agency Bar - Premium Dark Mode */}
        <div className="mb-8 rounded-3xl md:rounded-full bg-secondary p-2 pl-8 pr-2 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl shadow-secondary/20">
          
          <div className="flex items-center gap-6 py-4 md:py-0">
            <p className="text-white/20 text-[9px] font-black uppercase hidden lg:block">
              © {new Date().getFullYear()} Exclusive
            </p>
            <div className="hidden lg:block h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-white/80 text-[10px] font-bold uppercase flex items-center gap-2">
                Made with <Heart className="w-3 h-3 text-primary fill-primary" /> 
              </span>
            </div>
          </div>

          <a 
            href="https://www.inedconetworks.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full md:w-auto flex items-center justify-between gap-6 bg-white/5 hover:bg-white/10 pl-6 pr-1 py-1 rounded-full border border-white/5 transition-all group"
          >
            <span className="text-[10px] font-black text-white/40 uppercase ">Digital Partner</span>
            <div className="flex items-center gap-4">
               <img 
                 src={logo2} 
                 alt="Inedco Networks" 
                 className="h-6 md:h-8 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity" 
               />
               <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center group-hover:bg-white group-hover:scale-90 transition-all duration-500">
                  <ArrowUpRight className="w-5 h-5 text-white group-hover:text-secondary" />
               </div>
            </div>
          </a>
        </div>

        {/* Small Bottom Copyright */}
        <div className="pb-8 flex flex-col items-center gap-2">
           <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-primary/20" />
              <div className="w-2 h-2 rounded-full bg-green/20" />
              <div className="w-2 h-2 rounded-full bg-secondary/20" />
           </div>
           <p className="text-[9px] font-bold text-secondary/20 uppercase ">
             Official Digital Portal
           </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;