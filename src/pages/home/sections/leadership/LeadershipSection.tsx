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
      descHi: "सार्वजनिक जीवन के अनुभव और निरंतर जनसेवा के प्रति अटूट संकल्प के साथ, सामाजिक अनुभव आधारित यह प्रतिबद्धता सतना के समग्र विकास, क्षेत्र की जनता की सेवा और भारतीय जनता पार्टी के उद्देश्यों की पूर्ति हेतु किए जाने वाले प्रयासों का आधारस्तंभ है। यही निष्ठा और समर्पण जनहित के कार्यों को प्रभावी रूप से आगे बढ़ाने की प्रेरणा देता है।",
      descEn: "With his vast experience in public life and an unwavering resolve toward continuous public service, this commitment—rooted in social experience—forms the foundation of all efforts aimed at the holistic development of Satna, the service of its people, and the fulfillment of the Bharatiya Janata Party's objectives. This very loyalty and dedication provide the inspiration to effectively carry forward works of public interest.",
      icon: <History className="w-6 h-6" />,
      color: "from-blue-500 to-blue-700",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
      span: "lg:col-span-8" // Desktop पर बड़ा कार्ड
    },
    {
      titleHi: "जनसंपर्क और संवाद",
      titleEn: "Public Engagement",
      descHi: "जनता से निरंतर संवाद ही मेरी प्राथमिकता है। सतना के जन-जन का विश्वास ही मेरी निस्वार्थ सेवा की प्रेरणा है।",
      descEn: "Constant communication with the public is my priority. The trust of the people of Satna is the inspiration for my selfless service.",
      icon: <Users className="w-6 h-6" />,
      color: "from-orange-500 to-orange-700",
      lightColor: "bg-orange-50",
      textColor: "text-orange-600",
      span: "lg:col-span-4" // Desktop पर छोटा कार्ड
    },
    {
      titleHi: "स्थिरता और निरंतरता",
      titleEn: "Stability & Consistency",
      descHi: "सतना के विकास के ध्येय को पूर्ण करने हेतु जनसेवा के प्रति निरंतर प्रतिबद्ध और सतना के विकास को स्थिरता प्रदान करने के लिए सदैव समर्पित।",
      descEn: "Constantly committed to public service to fulfill the goal of development of Satna and always dedicated to providing stability to the development of Satna.",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "from-emerald-500 to-emerald-700",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      span: "lg:col-span-4"
    },
    {
      titleHi: "संगठन और समन्वय",
      titleEn: "Coordination",
      descHi: "भारतीय जनता पार्टी के प्रति पूर्ण समर्पण के साथ, संगठन को मजबूत करना और उसके उद्देश्यों एवं मूल्यों को जन-जन तक पहुँचाना ही मेरी सर्वोच्च प्राथमिकता है। संगठन के प्रति मेरी पूर्ण निष्ठा और समर्पण ही मेरे जनसेवा के कार्यों का आधार है। यही मुझे मेरे कर्तव्यों को ईमानदारी और प्रतिबद्धता के साथ निभाने की प्रेरणा देता है।",
      descEn: "Constantly committed to public service to fulfill the goal of development of Satna and always dedicated to providing stability to the development of Satna. This is what inspires me to perform my duties with honesty and commitment. ",
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
            subtitle={isHi ? "3+ दशक का अटूट विश्वास" : "3+ decades of Trusted Leadership"}
            title={isHi ? "दूरदर्शी नेतृत्व" : "Visionary Leadership"}
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
                  <p className="font-Poppins text-base md:text-lg text-slate-500 leading-relaxed text-justify">
                    {isHi ? item.descHi : item.descEn}
                  </p>
                </div>

                <div className={`mt-10 h-1 w-12 bg-gradient-to-r ${item.color} rounded-full group-hover:w-full transition-all duration-700`} />
              </div>
            </motion.div>
          ))}

          {/* PUBLIC ACCOUNTABILITY - HIGHLIGHT CARD */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-12 relative rounded-[3rem] bg-secondary p-8 md:p-16 overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] -mr-20 -mt-20 rounded-full" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-primary text-[10px] font-black uppercase  mb-6">
                  <SearchCheck className="w-4 h-4" />
                  {isHi ? "सार्वजनिक उत्तरदायित्व" : "Public Accountability"}
                </div>
                <h3 className="text-3xl md:text-5xl font-gotu font-bold text-white mb-6">
                  {isHi ? "पारदर्शिता और जवाबदेही" : "Transparency & Accountability"}
                </h3>
                <p className="text-white/60 font-Poppins text-lg leading-relaxed">
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
                      <span className="text-white/40 text-[10px] uppercase font-bold ">Verified</span>
                   </div>
                </div>
              </div>
            </div>
          </motion.div> */}
        </div>

        {/* MINIMAL FOOTER */}
        <div className="mt-20 text-center">
          <a href="#journey">

           <button className="inline-flex items-center gap-3 bg-white border border-slate-100 px-8 py-4 rounded-2xl text-secondary font-gotu font-bold hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 shadow-sm">
             {isHi ? "नेतृत्व का सफर देखें" : "Explore Leadership Journey"}
             <ChevronRight className="w-5 h-5" />
           </button>
          </a>
        </div>

      </div>
    </section>
  );
};

export default LeadershipSection;