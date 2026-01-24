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
      title: isHi ? "क्षेत्रीय समग्र विकास" : "Holistic Regional Growth",
      shortDesc: isHi ? "सड़क, शिक्षा और बुनियादी ढांचे को प्राथमिकता।" : "Prioritizing roads, education, and infrastructure.",
      fullDetail: isHi 
        ? "गणेश सिंह ने सतना लोकसभा क्षेत्र में सड़क, शिक्षा, स्वास्थ्य और बुनियादी ढांचे के विकास को प्राथमिकता दी। उनके प्रयासों से क्षेत्र में संपर्क सुविधा और सार्वजनिक सेवाओं में निरंतर सुधार हुआ।"
        : "Ganesh Singh prioritized the development of roads, education, health, and infrastructure in Satna. His efforts led to continuous improvements in connectivity and public services.",
      icon: <Milestone className="w-6 h-6" />,
      accent: "#e46b2e",
    },
    {
      title: isHi ? "ग्रामीण एवं कृषि समर्थन" : "Rural & Agri Support",
      shortDesc: isHi ? "किसानों और ग्राम पंचायतों का सशक्तिकरण।" : "Empowering farmers and Gram Panchayats.",
      fullDetail: isHi 
        ? "ग्रामीण पृष्ठभूमि से जुड़े होने के कारण उन्होंने किसानों, ग्रामीण श्रमिकों और ग्राम पंचायतों की समस्याओं पर विशेष ध्यान दिया। सिंचाई और कृषि योजनाओं को ज़मीनी स्तर तक पहुँचाने में सक्रिय भूमिका निभाई।"
        : "Coming from a rural background, he focused on the issues of farmers and rural laborers. He played an active role in bringing irrigation and agricultural schemes to the grassroots level.",
      icon: <Sprout className="w-6 h-6" />,
      accent: "#159172",
    },
    {
      title: isHi ? "जनकल्याण योजनाओं का क्रियान्वयन" : "Welfare Scheme Delivery",
      shortDesc: isHi ? "लाभार्थियों तक सीधा लाभ पहुँचाने में समन्वय।" : "Coordinating direct benefits to beneficiaries.",
      fullDetail: isHi 
        ? "केंद्र सरकार की विभिन्न जनकल्याणकारी योजनाओं को पात्र लाभार्थियों तक पहुँचाने के लिए उन्होंने प्रशासन के साथ समन्वय स्थापित किया, जिससे आम नागरिकों को योजनाओं का प्रत्यक्ष लाभ मिला।"
        : "He coordinated with the administration to ensure that various welfare schemes of the Central Government reached eligible beneficiaries, providing direct benefits to common citizens.",
      icon: <Users className="w-6 h-6" />,
      accent: "#112250",
    },
    {
      title: isHi ? "संसद में सतना की आवाज़" : "Strong Voice in Parliament",
      shortDesc: isHi ? "क्षेत्रीय मुद्दों को संसद के पटल पर उठाना।" : "Raising regional issues on the floor of Parliament.",
      fullDetail: isHi 
        ? "संसद में उन्होंने सतना और आसपास के क्षेत्रों से जुड़े सामाजिक, आर्थिक और विकासात्मक मुद्दों को लगातार उठाया और उनके समाधान के लिए निरंतर प्रयास किए।"
        : "In Parliament, he consistently raised social, economic, and developmental issues related to Satna and surrounding areas, striving for their effective resolution.",
      icon: <Landmark className="w-6 h-6" />,
      accent: "#e46b2e",
    },
    {
      title: isHi ? "स्थायी नेतृत्व एवं जनसंपर्क" : "Stable Leadership & Outreach",
      shortDesc: isHi ? "5 बार का अटूट विश्वास और सीधा संपर्क।" : "5-term unwavering trust and direct contact.",
      fullDetail: isHi 
        ? "लगातार पाँच बार सांसद निर्वाचित होने के कारण उन्होंने क्षेत्र में स्थिर नेतृत्व और निरंतर जनसंपर्क बनाए रखा, जिससे जनता की समस्याओं का समय पर समाधान संभव हुआ।"
        : "Elected as MP five consecutive times, he maintained stable leadership and constant public contact, enabling the timely resolution of public grievances.",
      icon: <Zap className="w-6 h-6" />,
      accent: "#159172",
    },
    {
      title: isHi ? "शिक्षा एवं भविष्य निर्माण" : "Education & Future Growth",
      shortDesc: isHi ? "युवाओं के लिए बेहतर अवसर और स्कूल उन्नयन।" : "Better opportunities and school upgrades for youth.",
      fullDetail: isHi 
        ? "सरकारी स्कूलों के कायाकल्प और उच्च शिक्षा के अवसरों के सृजन के माध्यम से उन्होंने सतना के युवाओं के भविष्य को संवारने के लिए ठोस कदम उठाए।"
        : "Through the transformation of public schools and creating higher education opportunities, he took concrete steps to shape the future of Satna's youth.",
      icon: <School className="w-6 h-6" />,
      accent: "#112250",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contribution-card", 
        { y: 50, opacity: 0 }, 
        {
          y: 0, opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20 md:py-32 relative overflow-hidden">
      <div className="mx-auto w-full relative z-10 px-5 md:px-12 lg:px-6">
        
        <SectionHeading
          subtitle={isHi ? "जन-जन का विश्वास, सतना का विकास" : "Trust of the People, Progress of Satna"}
          title={isHi ? "प्रमुख कार्य एवं योगदान" : "Key Contributions"}
        />

        <div className="mx-auto max-w-[1600px] mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contributions.map((item, index) => (
            <div
              key={index}
              className="contribution-card group relative h-[380px] w-full rounded-[2rem] bg-[#F8FAFC] border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-transparent"
            >
              {/* --- FRONT SIDE --- */}
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between transition-all duration-700 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">
                <div>
                  <div 
                    className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg shadow-black/5"
                    style={{ backgroundColor: item.accent }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-[Gotu] font-bold text-slate-900 mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="font-[Poppins] text-slate-500 text-sm md:text-base leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                  <span>{isHi ? "पूरा पढ़ें" : "Read More"}</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* --- BACK SIDE (Detailed Content) --- */}
              <div 
                className="absolute inset-0 p-8 md:p-10 flex flex-col justify-center translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)]"
                style={{ backgroundColor: item.accent }}
              >
                <div className="mb-6 h-1 w-12 bg-white/30 rounded-full" />
                
                <h4 className="text-white font-[Gotu] text-lg font-bold mb-4 opacity-90">
                  {item.title}
                </h4>

                <p className="text-white font-[Poppins] text-sm md:text-base leading-relaxed text-justify">
                  {item.fullDetail}
                </p>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                   <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest italic">
                     Satna Vikas Yatra
                   </span>
                   <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                     <ArrowUpRight size={14} className="text-white rotate-180" />
                   </div>
                </div>
              </div>

              {/* Background Index Number */}
              <div className="absolute top-6 right-8 text-5xl font-black text-slate-200/50 select-none group-hover:hidden transition-all">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContributionsSection;