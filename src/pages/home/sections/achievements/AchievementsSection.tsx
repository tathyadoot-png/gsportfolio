import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Lang } from "@/layouts/MainLayout";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";

// Assets
import img6 from "@/assets/img8.jpg";
import img9 from "@/assets/img9.jpg";
import img10 from "@/assets/img10.jpg";
import img11 from "@/assets/img11.jpg";
import img12 from "@/assets/img12.jpg";

gsap.registerPlugin(ScrollTrigger);

interface AchievementsSectionProps {
  lang: Lang;
}

const AchievementsSection = ({ lang }: AchievementsSectionProps) => {
  const isHi = lang === "hi";
  const sectionRef = useRef<HTMLDivElement>(null);

  const achievements = [
    { titleHi: "लगातार पाँच बार लोकसभा सांसद", titleEn: "Five-Time Consecutive MP", descHi: "गणेश सिंह सतना लोकसभा क्षेत्र से लगातार पाँच बार निर्वाचित होकर संसद पहुँचे। यह उनकी जनप्रियता और जनता के विश्वास का स्पष्ट प्रमाण है।", descEn: "Elected five consecutive times from Satna, reflecting immense public trust.", img: img6 },
    { titleHi: "स्थिर और सशक्त प्रतिनिधित्व", titleEn: "Stable Representation", descHi: "लंबे समय तक क्षेत्र का प्रतिनिधित्व करते हुए उन्होंने सतना को स्थिर राजनीतिक नेतृत्व प्रदान किया, जिससे विकास में निरंतरता बनी रही।", descEn: "His long tenure has provided Satna with stable political leadership and development.", img: img9 },
    { titleHi: "संसदीय समितियों में सक्रिय सहभागिता", titleEn: "Parliamentary Participation", descHi: "सांसद के रूप में उन्होंने विभिन्न संसदीय समितियों में भाग लेकर नीति निर्माण और विधायी प्रक्रियाओं में महत्वपूर्ण योगदान दिया।", descEn: "Actively contributed to policy-making through various parliamentary committees.", img: img10 },
    { titleHi: "जनसेवा: जमीनी राजनीति से राष्ट्रीय सफर", titleEn: "Grassroots to National Leadership", descHi: "ज़िला पंचायत स्तर से लेकर लोकसभा सांसद तक की यात्रा उनके व्यापक राजनीतिक अनुभव और जमीनी समझ को दर्शाती है।", descEn: "His progression from local governance to national leadership highlights deep experience.", img: img11 },
    { titleHi: "जनता के विश्वास पर आधारित नेतृत्व", titleEn: "Leadership on Public Confidence", descHi: "लगातार चुनावी सफलताएँ यह दर्शाती हैं कि उनका नेतृत्व जनता की अपेक्षाओं और क्षेत्रीय आवश्यकताओं के अनुरूप रहा है।", descEn: "Repeated victories demonstrate leadership grounded in public trust.", img: img12 }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Line drawing animation
      gsap.from(".timeline-line", {
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 20%",
          end: "bottom 20%",
          scrub: true,
        },
      });

      // Cards entrance
      achievements.forEach((_, i) => {
        gsap.from(`.card-${i}`, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: `.card-${i}`,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-20">
          <SectionHeading
            subtitle={isHi ? "3+ दशक का गौरवशाली सफर" : "3+ Decades of Journey"}
            title={isHi ? "ऐतिहासिक उपलब्धियाँ" : "Major Achievements"}
          />
        </div>

        <div className="timeline-container relative">
          {/* Central Line (Desktop Only) */}
          <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-100 hidden lg:block -translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {achievements.map((item, index) => (
              <div 
                key={index} 
                className={`card-${index} flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 md:gap-16`}
              >
                {/* Image Part */}
                <div className="w-full lg:w-1/2">
                  <div className="group relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[16/10] md:aspect-video lg:aspect-square max-h-[500px]">
                    <img 
                      src={item.img} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      alt="" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-6 left-6 text-white text-4xl font-black font-gotu opacity-20">
                      0{index + 1}
                    </div>
                  </div>
                </div>

                {/* Content Part */}
                <div className={`w-full lg:w-1/2 flex flex-col ${index % 2 === 0 ? "lg:items-start lg:text-left" : "lg:items-end lg:text-right"}`}>
                  <div className="max-w-xl space-y-6">
                    <div className={`flex items-center gap-4 ${index % 2 === 0 ? "" : "lg:flex-row-reverse"}`}>
                      <span className="bg-primary/10 text-primary px-4 py-1 rounded-full md:text-3xl text-xl font-bold font-gotu uppercase tracking-widest">
                         0{index + 1}
                      </span>
                      <div className="h-px w-12 bg-primary/30"></div>
                    </div>

                    <h3 className="text-3xl md:text-[48px] font-gotu leading-[1.3] font-bold text-secondary ">
                      {isHi ? item.titleHi : item.titleEn}
                    </h3>

                    <p className="font-Poppins text-lg md:text-xl text-slate-500 leading-relaxed">
                      {isHi ? item.descHi : item.descEn}
                    </p>

                    {/* <div className={`flex gap-10 pt-4 ${index % 2 === 0 ? "" : "lg:justify-end"}`}>
                      <div>
                        <p className="text-3xl font-black text-secondary font-gotu leading-none">05</p>
                        <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-2">Terms</p>
                      </div>
                      <div className="w-px h-10 bg-slate-100"></div>
                      <div>
                        <p className="text-3xl font-black text-secondary font-gotu leading-none">32+</p>
                        <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-2">Years</p>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;