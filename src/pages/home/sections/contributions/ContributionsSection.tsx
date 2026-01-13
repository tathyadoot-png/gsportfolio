import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import type { Lang } from "@/layouts/MainLayout";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { Milestone, School, Sprout, Landmark, Users, Zap, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ContributionsSectionProps {
  lang: Lang;
}

const ContributionsSection = ({ lang }: ContributionsSectionProps) => {
  const isHi = lang === "hi";
  const sectionRef = useRef<HTMLDivElement>(null);

  const contributions = [
    {
      titleHi: "क्षेत्रीय बुनियादी ढांचा",
      titleEn: "Regional Infrastructure",
      descHi: "सतना में सड़कों का जाल बिछाने और राष्ट्रीय राजमार्गों की कनेक्टिविटी में अग्रणी भूमिका।",
      descEn: "Led the expansion of road networks and NH connectivity across Satna.",
      icon: <Milestone className="w-5 h-5 md:w-6 md:h-6" />,
      accent: "var(--color-primary)",
    },
    {
      titleHi: "कृषि एवं ग्रामीण उत्थान",
      titleEn: "Rural & Agri Support",
      descHi: "सिंचाई परियोजनाओं और किसानों के लिए सरकारी योजनाओं का प्रभावी क्रियान्वयन।",
      descEn: "Effective implementation of irrigation and agri-schemes for farmers.",
      icon: <Sprout className="w-5 h-5 md:w-6 md:h-6" />,
      accent: "var(--color-green)",
    },
    {
      titleHi: "शिक्षा एवं स्वास्थ्य सेवा",
      titleEn: "Education & Healthcare",
      descHi: "सरकारी स्कूलों के उन्नयन और चिकित्सा केंद्रों की स्थापना के माध्यम से सेवा।",
      descEn: "Service through upgrading public schools and establishing medical centers.",
      icon: <School className="w-5 h-5 md:w-6 md:h-6" />,
      accent: "var(--color-secondary)",
    },
    {
      titleHi: "संसदीय प्रतिनिधित्व",
      titleEn: "Parliamentary Voice",
      descHi: "संसद में सतना के मुद्दों को उठाकर विकासात्मक नीतियों के समाधान हेतु प्रयास।",
      descEn: "Advocating for Satna's development and policy solutions in Parliament.",
      icon: <Landmark className="w-5 h-5 md:w-6 md:h-6" />,
      accent: "var(--color-primary)",
    },
    {
      titleHi: "जनकल्याणकारी योजनाएं",
      titleEn: "Social Welfare Schemes",
      descHi: "उज्ज्वला और आयुष्मान जैसी योजनाओं को पात्र लाभार्थियों तक पहुँचाने में समन्वय।",
      descEn: "Coordinating delivery of Ujjwala and Ayushman schemes to beneficiaries.",
      icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
      accent: "var(--color-green)",
    },
    {
      titleHi: "विकास एवं संकल्प",
      titleEn: "Vision for Growth",
      descHi: "औद्योगिक गलियारों और रोजगार के नए अवसरों के सृजन पर विशेष ध्यान।",
      descEn: "Focus on creating industrial corridors and new employment opportunities.",
      icon: <Zap className="w-5 h-5 md:w-6 md:h-6" />,
      accent: "var(--color-secondary)",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards Entrance: Scale + Fade + Y-Axis Slide
      gsap.fromTo(".contribution-card", 
        { 
          y: 70, 
          opacity: 0,
          scale: 0.9 
        }, 
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.2)", // हल्का सा बाउंस इफ़ेक्ट
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bg py-16 md:py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />

      <div className="mx-auto w-full relative z-10 px-5 md:px-12">
        <SectionHeading
          subtitle={isHi ? "30 वर्षों का सेवा संकल्प" : "30 Years of Service"}
          title={isHi ? "प्रमुख कार्य एवं योगदान" : "Key Contributions"}
        />

        <div className="mx-auto max-w-[110rem] mt-12 md:mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contributions.map((item, index) => (
            <div
              key={index}
              className="contribution-card group relative flex flex-col justify-between rounded-[2.5rem] border border-border/60 bg-white p-7 md:p-10 transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2"
            >
              {/* Hover Background Accent Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-[2.5rem] pointer-events-none"
                style={{ backgroundColor: item.accent }}
              />

              <div className="absolute top-6 right-8 text-5xl md:text-6xl font-black text-secondary/5 select-none pointer-events-none group-hover:text-primary/10 transition-colors duration-500">
                0{index + 1}
              </div>

              <div>
                {/* Icon Box with Float Animation on Hover */}
                <div 
                  className="mb-8 inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-[1.25rem] text-white shadow-lg transition-all duration-500 group-hover:rotate-[10deg] group-hover:scale-110"
                  style={{ backgroundColor: item.accent }}
                >
                  {item.icon}
                </div>

                <h3 className="text-xl md:text-2xl font-gotu font-bold text-secondary leading-tight mb-3 group-hover:text-primary transition-colors">
                  {isHi ? item.titleHi : item.titleEn}
                </h3>

                <p className="font-martel text-sm md:text-base leading-relaxed text-muted/80 group-hover:text-muted transition-colors">
                  {isHi ? item.descHi : item.descEn}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="h-[2px] w-10 rounded-full bg-border transition-all duration-500 group-hover:w-16 group-hover:bg-primary" />
                <div className="p-2 rounded-full bg-transparent group-hover:bg-primary/10 transition-all duration-500">
                   <ArrowUpRight size={18} className="text-secondary/20 group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
};

export default ContributionsSection;