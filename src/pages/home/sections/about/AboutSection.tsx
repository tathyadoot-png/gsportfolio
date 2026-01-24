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
      // Image Clip-Path Reveal
      gsap.fromTo(".img-reveal", 
        { clipPath: "inset(0% 0% 100% 0%)" }, 
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.8,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: ".img-wrapper",
            start: "top 85%",
          }
        }
      );

      // Text & Elements Reveal Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      tl.from(".reveal-text-item", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
      })
      .from(".info-card-gsap", {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "back.out(1.2)"
      }, "-=0.5");

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#FCFCFC] py-16 md:py-28 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-green/[0.01] -z-10" />
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-[120px] rounded-full" />

      <div className="max-w-[1860px] mx-auto px-5 md:px-12 lg:px-20">
        
        <div className="mb-12 md:mb-20 reveal-text-item">
          <SectionHeading
            subtitle={isHi ? "सेवा का संकल्प, विकास ही विकल्प" : "Driven by service, defined by progress"}
            title={isHi ? "व्यक्तित्व" : "Biography"}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-center">
          
          {/* LEFT: CONTENT AREA */}
          <div className="lg:col-span-7 space-y-8 md:space-y-12 order-2 lg:order-1">
            
            <div className="space-y-5 md:space-y-7">
              <div className="reveal-text-item inline-flex items-center gap-2 px-4 py-1.5 bg-green/10 rounded-full border border-green/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                <span className="text-[10px] md:text-xs font-black text-green uppercase tracking-widest">
                  {isHi ? "5 बार निर्वाचित सदस्य लोकसभा" : "5-Time Elected MP"}
                </span>
              </div>
              
              <h3 className="reveal-text-item font-[Gotu] text-2xl md:text-5xl font-bold text-secondary leading-[1.15]">
                {isHi 
                  ? "सतना के विकास के लिए समर्पित तीन दशकों का अटूट विश्वास।" 
                  : "Three decades of unwavering trust dedicated to Satna's development."}
              </h3>

              <div className="reveal-text-item flex gap-4 md:gap-6 items-start">
                <Quote className="text-primary shrink-0 opacity-20 size-8 md:size-12" />
                <p className="font-[Martel] text-base md:text-xl text-slate-600 leading-relaxed text-justify">
                  {isHi 
                    ? "गणेश सिंह का जन्म 2 जुलाई 1962 को हुआ। उन्होंने समाजशास्त्र एवं विधि में उच्च शिक्षा प्राप्त की। छात्र राजनीति से अपने सार्वजनिक जीवन की शुरुआत कर उन्होंने जनसेवा को अपना ध्येय बनाया। सतना के विकास को नई दिशा देने और क्षेत्र की समस्याओं के समाधान हेतु सतत प्रयासों के माध्यम से उन्होंने जन-जन का विश्वास अर्जित किया है। इसी विश्वास और समर्थन के बल पर वे आज लगातार पाँचवीं बार संसद में सतना का प्रतिनिधित्व कर रहे हैं। सतना के समग्र विकास के ध्येय के साथ पूर्ण निष्ठा से वे सतना के विकास के लिए समर्पित हैं।"
                    : "Ganesh Singh was born on 2 July 1962. He pursued higher education in Sociology and Law. Beginning his public life through student politics, he made public service his mission. Through continuous efforts to give a new direction to Satna’s development and to resolve the Satna’s problems, he has earned the trust of the people. On the strength of this trust and support, He is today representing Satna in Parliament for the fifth consecutive term. With the goal of Satna’s holistic development, he remains fully committed and dedicated to the development of Satna."}
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
                <p className="text-sm text-slate-500"><span className="text-red-700">3</span>{isHi ? "दशक का अनुभव" : "decades Experience"}</p>
              </div>

              {/* NEW REFINED IMPACT SECTION (No 100%) */}
              <div className="info-card-gsap md:col-span-2 p-8 md:p-12 bg-secondary text-white rounded-[2.5rem] relative overflow-hidden group shadow-2xl border border-white/5">
                
                <div className="absolute inset-0 bg-gradient-to-br from-green/15 via-transparent to-transparent" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="space-y-4 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10">
                      <span className="text-[10px] font-black uppercase tracking-wider text-green">
                        {isHi ? "संसदीय विरासत" : "Parliamentary Legacy"}
                      </span>
                    </div>
                    <h4 className="text-3xl md:text-5xl font-[Gotu] font-bold">
                      {isHi ? "05 बार निरंतर विजय" : "05 Consecutive Victories"}
                    </h4>
                    <p className="text-white/60 text-sm md:text-base max-w-md">
                      {isHi 
                        ? "2004 से आज तक, सतना की जनता का अटूट प्रेम और विश्वास ही मेरी असली पूंजी है।" 
                        : "Since 2004, the unwavering love and trust of Satna's people has been my greatest strength."}
                    </p>
                  </div>

                  <div className="flex gap-8 items-center">
                    <div className="h-20 w-[1px] bg-white/20 hidden md:block" />
                    <div className="text-center">
                      <p className="text-5xl md:text-6xl font-black italic text-white leading-none">3+</p>
                      <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-green mt-2">
                        {isHi ? "दशक की सेवा" : "decades of Service"}
                      </p>
                    </div>
                  </div>
                </div>

                <Award className="absolute -right-16 -bottom-16 text-white/[0.04] rotate-12 size-64 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* RIGHT: IMAGE AREA */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="img-wrapper relative h-[450px] md:h-[650px] lg:h-[750px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl">
              <div className="img-reveal w-full h-full">
                <img 
                  src={img18} 
                  className="w-full h-full object-cover object-top scale-105" 
                  alt="Ganesh Singh" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-transparent to-transparent opacity-70" />
              
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-2xl rounded-[2rem] border border-white/20 shadow-2xl">
                <p className="text-green font-black text-xs uppercase mb-2 tracking-widest">{isHi ? "लोकसभा क्षेत्र" : "Constituency"}</p>
                <h4 className="text-white text-3xl md:text-4xl font-[Gotu] font-bold">{isHi ? "सतना, मध्य प्रदेश" : "Satna, MP"}</h4>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;