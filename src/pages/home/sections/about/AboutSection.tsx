import { motion } from "framer-motion";
import { GraduationCap, ShieldCheck, Quote, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import img18 from "@/assets/18.jpg"; 
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

type Lang = "hi" | "en";

interface AboutSectionProps {
  lang: Lang;
}

const AboutSection = ({ lang }: AboutSectionProps) => {
  const isHi = lang === "hi";
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Image Clip-Path Reveal (Premium Effect)
      gsap.fromTo(".img-reveal", 
        { clipPath: "inset(100% 0% 0% 0%)" }, 
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: ".img-wrapper",
            start: "top 85%",
          }
        }
      );

      // 2. Parallax Effect on Image
      gsap.fromTo(".parallax-img", 
        { yPercent: -10 }, 
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".img-wrapper",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

      // 3. Text & Elements Reveal Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      tl.from(".reveal-text", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
      })
      .from(".info-card-gsap", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.2)"
      }, "-=0.5")
      .from(".stats-badge", {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3");

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#FCFCFC] py-16 md:py-28 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-green/[0.01] -z-10" />
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-[120px] rounded-full" />

      <div className="max-w-[1860px] mx-auto px-5 md:px-12 lg:px-20">
        
        <div className="mb-12 md:mb-20 reveal-text">
          <SectionHeading
            subtitle={isHi ? "जनता का सेवक, सतना का संकल्प" : "Public Servant, Satna's Resolution"}
            title={isHi ? "व्यक्तित्व" : "Biography"}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-center">
          
          {/* LEFT: CONTENT AREA */}
          <div className="lg:col-span-7 space-y-8 md:space-y-12 order-2 lg:order-1">
            
            <div className="space-y-5 md:space-y-7">
              <div className="reveal-text inline-flex items-center gap-2 px-4 py-1.5 bg-green/10 rounded-full border border-green/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                <span className="text-[10px] md:text-xs font-black text-green uppercase tracking-widest">
                  {isHi ? "5 बार निर्वाचित सांसद" : "5-Time Elected MP"}
                </span>
              </div>
              
              <h3 className="reveal-text font-[Gotu] text-2xl md:text-5xl font-bold text-secondary leading-[1.15]">
                {isHi 
                  ? "सतना के विकास के लिए समर्पित तीन दशकों का अटूट विश्वास।" 
                  : "Three decades of unwavering trust dedicated to Satna's development."}
              </h3>

              <div className="reveal-text flex gap-4 md:gap-6 items-start">
                <Quote className="text-primary shrink-0 opacity-20 size-8 md:size-12" />
                <p className="font-[Martel] text-base md:text-xl text-slate-600 leading-relaxed text-justify">
                  {isHi 
                    ? "गणेश सिंह जी का जन्म 2 जुलाई 1962 को हुआ। उन्होंने समाजशास्त्र और विधि में उच्च शिक्षा प्राप्त की। छात्र राजनीति से अपना सफर शुरू कर आज लगातार 5वीं बार संसद में सतना का प्रतिनिधित्व कर रहे हैं।"
                    : "Born on July 2, 1962, Ganesh Singh holds degrees in Sociology and Law. Starting from student politics, he is now representing Satna for the 5th consecutive time."}
                </p>
              </div>
            </div>

            {/* CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="info-card-gsap p-6 bg-white border-l-4 border-green shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                <GraduationCap className="text-green mb-3 size-7 md:size-8" />
                <h5 className="font-[Gotu] text-base md:text-lg font-bold text-secondary">{isHi ? "शिक्षा" : "Education"}</h5>
                <p className="text-sm text-slate-500">MA (Sociology), LLB</p>
              </div>

              <div className="info-card-gsap p-6 bg-white border-l-4 border-primary shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                <ShieldCheck className="text-primary mb-3 size-7 md:size-8" />
                <h5 className="font-[Gotu] text-base md:text-lg font-bold text-secondary">{isHi ? "अनुभव" : "Experience"}</h5>
                <p className="text-sm text-slate-500">32+ {isHi ? "वर्षों का अनुभव" : "Years Experience"}</p>
              </div>

              <div className="info-card-gsap md:col-span-2 p-6 md:p-10 bg-secondary text-white rounded-[2rem] relative overflow-hidden group">
                {/* Subtle BG Pattern */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
                  <div className="text-center md:text-left">
                    <p className="text-green font-black text-[10px] uppercase  mb-2">{isHi ? "संसदीय कार्यकाल" : "Parliamentary Terms"}</p>
                    <h4 className="text-2xl md:text-4xl font-[Gotu] font-bold">{isHi ? "लगातार 5 बार जीत" : "5 Consecutive Wins"}</h4>
                    <p className="text-white/40 text-xs mt-2 font-martel italic">2004 - {new Date().getFullYear()}</p>
                  </div>
                  <div className="stats-badge flex flex-col items-center bg-white/10 backdrop-blur-md px-6 py-5 rounded-[1.5rem] border border-white/10 min-w-[140px]">
                    <span className="text-4xl md:text-5xl font-black text-green">100%</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/60 mt-1">{isHi ? "लोकप्रियता" : "Popularity"}</span>
                  </div>
                </div>
                <Award className="absolute -right-8 -bottom-8 text-white/5 rotate-12 size-40 md:size-56" />
              </div>
            </div>
          </div>

          {/* RIGHT: IMAGE AREA */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="img-wrapper img-reveal relative h-[400px] md:h-[600px] lg:h-[700px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src={img18} 
                className="parallax-img absolute inset-0 w-full h-full object-cover object-top scale-110" 
                alt="Ganesh Singh" 
              />
              {/* Refined Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem] md:rounded-[3rem]" />
              
              <div className="absolute bottom-8 left-8 right-8 p-6 md:p-8 bg-white/10 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2rem] border border-white/20 shadow-2xl">
                <p className="text-green font-black text-[10px] md:text-xs uppercase  mb-2">{isHi ? "लोकसभा क्षेत्र" : "Constituency"}</p>
                <h4 className="text-white text-2xl md:text-3xl font-[Gotu] font-bold">{isHi ? "सतना, मध्य प्रदेश" : "Satna, MP"}</h4>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;