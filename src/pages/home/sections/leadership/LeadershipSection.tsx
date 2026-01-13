import { motion } from "framer-motion";
import type { Lang } from "@/layouts/MainLayout";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { 
  Users, 
  ShieldCheck, 
  History, 
  GitMerge, 
  SearchCheck,
  ChevronRight,
  Zap
} from "lucide-react";

interface LeadershipSectionProps {
  lang: Lang;
}

const LeadershipSection = ({ lang }: LeadershipSectionProps) => {
  const isHi = lang === "hi";

  const points = [
    {
      titleHi: "अनुभव आधारित नेतृत्व",
      titleEn: "Experience-Driven Leadership",
      descHi: "जमीनी राजनीति से लेकर संसद तक की उनकी यात्रा ने उन्हें व्यावहारिक और संतुलित निर्णय लेने की क्षमता प्रदान की है।",
      descEn: "His journey from grassroots to Parliament has equipped him with a practical and balanced decision-making approach.",
      icon: <History className="w-6 h-6" />,
      color: "from-blue-500 to-blue-700",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
      span: "lg:col-span-8" // Desktop पर बड़ा कार्ड
    },
    {
      titleHi: "जनसंपर्क और संवाद",
      titleEn: "Public Engagement",
      descHi: "जनता से निरंतर संवाद को प्राथमिकता देते हैं। नियमित क्षेत्रीय भ्रमण से वे नागरिकों की समस्याओं को समझते हैं।",
      descEn: "Emphasis on public engagement. Through regular visits, he understands and solves public concerns.",
      icon: <Users className="w-6 h-6" />,
      color: "from-orange-500 to-orange-700",
      lightColor: "bg-orange-50",
      textColor: "text-orange-600",
      span: "lg:col-span-4" // Desktop पर छोटा कार्ड
    },
    {
      titleHi: "स्थिरता और निरंतरता",
      titleEn: "Stability & Consistency",
      descHi: "लगातार पाँच बार सांसद निर्वाचित होना उनके नेतृत्व की स्थिरता और विश्वसनीयता का सबसे बड़ा प्रमाण है।",
      descEn: "Being elected five consecutive times reflects the stability and reliability of his leadership.",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "from-emerald-500 to-emerald-700",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      span: "lg:col-span-4"
    },
    {
      titleHi: "संगठन और समन्वय",
      titleEn: "Coordination",
      descHi: "पार्टी संगठन और प्रशासन के बीच प्रभावी समन्वय स्थापित करते हुए योजनाओं का बेहतर क्रियान्वयन सुनिश्चित करते हैं।",
      descEn: "Effectively bridges organization and administration for smoother policy implementation.",
      icon: <GitMerge className="w-6 h-6" />,
      color: "from-purple-500 to-purple-700",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600",
      span: "lg:col-span-8"
    }
  ];

  return (
    <section className="relative py-16 md:py-32 bg-white overflow-hidden">
      {/* Background Orbs for visual depth */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Container: Changed px-24 to responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADING SECTION */}
        <div className="mb-16 md:mb-24">
          <SectionHeading
            subtitle={isHi ? "32+ वर्षों का अटूट विश्वास" : "32+ Years of Trusted Leadership"}
            title={isHi ? "विजनरी नेतृत्व" : "Visionary Leadership"}
          />
        </div>

        {/* PILLARS BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {points.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${item.span} group relative h-full`}
            >
              <div className="h-full bg-[#fcfcfd] border border-slate-100 rounded-[2.5rem] p-8 md:p-12 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:bg-white">
                
                <div className="flex justify-between items-start mb-10">
                  <div className={`p-4 rounded-2xl ${item.lightColor} ${item.textColor} shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                    {item.icon}
                  </div>
                  <span className="text-5xl font-black text-slate-100/60 font-gotu group-hover:text-primary/10 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-gotu font-bold text-secondary leading-tight">
                    {isHi ? item.titleHi : item.titleEn}
                  </h3>
                  <p className="font-martel text-base md:text-lg text-slate-500 leading-relaxed text-justify">
                    {isHi ? item.descHi : item.descEn}
                  </p>
                </div>

                <div className={`mt-10 h-1 w-12 bg-gradient-to-r ${item.color} rounded-full group-hover:w-full transition-all duration-700`} />
              </div>
            </motion.div>
          ))}

          {/* PUBLIC ACCOUNTABILITY - HIGHLIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-12 relative rounded-[3rem] bg-secondary p-8 md:p-16 overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] -mr-20 -mt-20 rounded-full" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                  <SearchCheck className="w-4 h-4" />
                  {isHi ? "सार्वजनिक उत्तरदायित्व" : "Public Accountability"}
                </div>
                <h3 className="text-3xl md:text-5xl font-gotu font-bold text-white mb-6">
                  {isHi ? "पारदर्शिता और जवाबदेही" : "Transparency & Accountability"}
                </h3>
                <p className="text-white/60 font-martel text-lg leading-relaxed">
                  {isHi 
                    ? "एक जनप्रतिनिधि के रूप में वे सार्वजनिक उत्तरदायित्व को सर्वोपरि मानते हैं और पारदर्शिता पर विशेष ध्यान देते हैं।"
                    : "As a representative, he prioritizes public responsibility and maintains high standards of transparency."}
                </p>
              </div>

              <div className="flex-shrink-0 text-center">
                <div className="relative inline-block">
                   <div className="absolute inset-0 bg-primary blur-3xl opacity-20 animate-pulse" />
                   <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-2 border-white/10 flex flex-col items-center justify-center relative bg-white/5 backdrop-blur-sm group-hover:border-primary/50 transition-colors duration-700">
                      <Zap className="text-primary w-6 h-6 mb-2" />
                      <span className="text-white font-gotu text-4xl md:text-5xl font-bold">100%</span>
                      <span className="text-white/40 text-[10px] uppercase font-bold tracking-tighter">Verified</span>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* MINIMAL FOOTER */}
        <div className="mt-20 text-center">
           <button className="inline-flex items-center gap-3 bg-white border border-slate-100 px-8 py-4 rounded-2xl text-secondary font-gotu font-bold hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 shadow-sm">
             {isHi ? "नेतृत्व का सफर देखें" : "Explore Leadership Journey"}
             <ChevronRight className="w-5 h-5" />
           </button>
        </div>

      </div>
    </section>
  );
};

export default LeadershipSection;