import { useRef, useEffect } from "react";
import { Sparkles, MapPin, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import type { Lang } from "@/layouts/MainLayout";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";

// Images imports
import img13 from "@/assets/13.jpg";
import img12 from "@/assets/img12.jpg";
import img14 from "@/assets/img6.jpg";
import img15 from "@/assets/img10.jpg";
import img16 from "@/assets/img11.jpg";
import img27 from "@/assets/img27.jpeg";
import img30 from "@/assets/img26.jpeg";

gsap.registerPlugin(ScrollTrigger);

interface JourneySectionProps {
  lang: Lang;
}

const JourneySection = ({ lang }: JourneySectionProps) => {
  const isHi = lang === "hi";
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const timeline = [
    { 
      year: "1990", 
      title: isHi ? "नेतृत्व की नींव" : "Foundation", 
      desc: isHi ? "विधि महाविद्यालय के दौरान छात्र राजनीति से जनसेवा की शुरुआत की और नेतृत्व कौशल को निखारा।" : "Began public service through student politics during law college, honing leadership skills.",
      img: img27
    },
    { 
      year: "1994", 
      title: isHi ? "स्थानीय शासन" : "Local Governance", 
      desc: isHi ? "ज़िला पंचायत सदस्य और अध्यक्ष के रूप में ग्रामीण विकास और प्रशासनिक कार्यों का अनुभव लिया।" : "Gained experience in rural development and administration as Zila Panchayat member and Chairman.",
      img: img30
    },
    { 
      year: "2004", 
      title: isHi ? "संसद प्रवेश" : "First MP Term", 
      desc: isHi ? "सतना लोकसभा क्षेत्र से पहली बार विजय प्राप्त कर राष्ट्रीय राजनीति में कदम रखा।" : "Entered national politics after winning the Satna Lok Sabha seat for the first time.",
      img: img14
    },
    { 
      year: "2009–24", 
      title: isHi ? "अटूट विश्वास" : "Consistent Trust", 
      desc: isHi ? "जनता के अटूट समर्थन से लगातार पाँच बार सांसद निर्वाचित होकर क्षेत्र की सेवा जारी रखी।" : "Continued serving the region as a five-time consecutive MP with unwavering public support.",
      img: img15
    },
    { 
      year: "वर्तमान", 
      title: isHi ? "सेवा संकल्प" : "Active Vision", 
      desc: isHi ? "सतना के विकास के लिए सदैव समर्पित...." : "Always dedicated to the development of Satna....",
      img: img16
    },
  ];

useEffect(() => {
  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    // 1. DESKTOP & TABLET (No Change here)
    mm.add("(min-width: 768px)", () => {
      const scrollWidth = sectionRef.current?.scrollWidth || 0;
      const amountToScroll = scrollWidth - window.innerWidth;

      gsap.to(sectionRef.current, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${amountToScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(progressBarRef.current, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${amountToScroll}`,
          scrub: 1,
        },
      });
    });

    // 2. UPDATED SM SCREEN (Mobile) - For Enhanced Smoothness
    mm.add("(max-width: 767px)", () => {
      // Line Drawing Animation (यह प्रोग्रेस लाइन को स्क्रॉल के साथ चलाएगा)
      gsap.to(".mobile-progress-line", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".md\\:hidden", // मोबाइल कंटेनर का क्लास
          start: "top 20%",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      // Cards Smooth Reveal (Zoom + Fade + Slide इफ़ेक्ट)
      const cards = gsap.utils.toArray(".mobile-card");
      cards.forEach((card: any) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%", // कार्ड जैसे ही स्क्रीन के 85% हिस्से में आएगा
            end: "top 60%",   // और 60% तक पहुँचते ही एनीमेशन पूरा हो जाएगा
            scrub: 1,         // स्मूथ स्क्रॉल के लिए
          }
        });
      });
    });
  }, triggerRef);

  return () => ctx.revert();
}, []);
  return (
    <div ref={triggerRef} className="bg-bg">
      <div className="min-h-screen md:h-screen flex flex-col overflow-hidden relative">
        
        {/* Progress Line - Top */}
        <div className="absolute top-0 left-0 h-1 bg-primary/20 w-full z-50">
          <div ref={progressBarRef} className="h-full bg-primary w-0 transition-all shadow-[0_0_10px_rgba(228,107,46,0.5)] md:block hidden" />
        </div>

        {/* Section Heading - Adjusted Padding for MD */}
        <div className=" md:pt-12 lg:pt-3 ">
          <SectionHeading
            subtitle={isHi ? "3 दशक का गौरवशाली सफर" : "3 decades of Dedicated Service"}
            title={isHi ? "विश्वास की राजनीतिक यात्रा" : "A Legacy of Transformation"}
          />
        </div>

        {/* Desktop & Tablet View (Horizontal) */}
        <div ref={sectionRef} className="hidden md:flex items-center pl-24 pr-[40vw] gap-24 whitespace-nowrap flex-grow -mt-10 lg:mt-0">
          {timeline.map((item, index) => (
            <div key={index} className="relative flex-shrink-0 w-[420px]">
              <div className="absolute -top-36 -left-6 text-[10rem] font-black opacity-[0.08] font-[Gotu] text-primary select-none pointer-events-none">
                {item.year.split('–')[0]}
              </div>
              <div className="relative z-10">
                <div className="h-[340px] w-full rounded-[3rem] overflow-hidden shadow-soft border-4 border-white relative group">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 bg-white shadow-xl px-6 py-2 rounded-2xl border border-border">
                    <span className="text-secondary font-black text-xl font-[Gotu]">{item.year}</span>
                  </div>
                </div>
                <div className="mt-8 space-y-4 px-2 whitespace-normal">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-primary rounded-full" />
                    <h3 className="text-2xl font-bold text-secondary font-[Gotu] leading-tight">{item.title}</h3>
                  </div>
                  <p className="text-muted text-base font-[Poppins] leading-relaxed opacity-90">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Ending Section (Desktop) */}
          <div className="flex-shrink-0 w-[600px] pr-32 flex flex-col items-start justify-center">
            <div className="space-y-6">
              <Sparkles className="text-primary opacity-50" size={40} />
              <h2 className="text-3xl font-[Gotu] font-bold text-secondary leading-[1.2]">
                {isHi ? "सफर जारी है," : "The journey continues,"} <br />
                <span className="text-primary">{isHi ? "संकल्प अभी बाकी है।" : "the vision remains."}</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Innovative Mobile View (Vertical Storyline) */}


<div className="md:hidden flex flex-col px-4 gap-16 pt-3 relative overflow-hidden">
  
  {/* Dynamic Center Progress Line */}
  <div className="absolute left-1/2 top-0 bottom-20 w-[2px] bg-primary/10 -translate-x-1/2">
    <div className="mobile-progress-line w-full h-0 bg-gradient-to-b from-primary via-secondary to-transparent origin-top" />
  </div>
  
  {timeline.map((item, index) => (
    <div key={index} className="mobile-card relative w-full opacity-0 translate-y-10 scale-95">
      {/* Center Animated Pulse Dot */}
      <div className="absolute left-1/2 -top-2 -translate-x-1/2 z-20">
        <div className="w-4 h-4 rounded-full bg-white border-2 border-primary relative">
          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
        </div>
      </div>
      
      <div className="pt-8">
        {/* Year Label with Floating Effect */}
        <div className="flex justify-center mb-[-25px] relative z-20">
          <span className="bg-bg px-4 py-1 text-secondary/40 font-black text-5xl font-[Gotu]  italic">
            {item.year.split('–')[0]}
          </span>
        </div>
        
        {/* Glassmorphism Card */}
        <div className="bg-white/70 backdrop-blur-md rounded-[3rem] p-4 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative z-10">
          {/* Image Container with Subtle Parallax */}
          <div className="rounded-[2.5rem] overflow-hidden aspect-square relative group">
            <img 
              src={item.img} 
              className="w-full h-full object-cover transition-transform duration-[2s] scale-110" 
              alt={item.title} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2  px-5 py-1.5 rounded-2xl shadow-xl">
              <span className="text-secondary font-black text-xs ">{item.year}</span>
            </div>
          </div>

          <div className="mt-6 px-4 pb-4 text-center">
            <h3 className="text-2xl font-bold text-secondary font-[Gotu] mb-3 leading-tight">
              {item.title}
            </h3>
            <p className="text-sm text-muted font-[Poppins] leading-relaxed opacity-80">
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  ))}

  {/* Mobile Ending - Cinematic Style */}
  <div className="mobile-card text-center  relative">
    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
      <Sparkles className="text-primary animate-pulse" size={32} />
    </div>
    <h2 className="text-3xl font-[Gotu] font-bold text-secondary leading-tight">
      {isHi ? "सफर जारी है," : "The journey continues,"}<br />
      <span className="text-primary text-xl uppercase  font-black block mt-2">
        {isHi ? "संकल्प अटल है" : "Active Vision"}
      </span>
    </h2>
    <div className="mt-12 opacity-50">
       <div className="w-[1px] h-20 bg-gradient-to-b from-primary to-transparent mx-auto" />
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default JourneySection;