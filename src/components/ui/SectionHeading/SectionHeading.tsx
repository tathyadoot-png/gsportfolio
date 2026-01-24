import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => {
  const words = title.split(" ");

  return (
    <div className="relative w-full max-w-5xl mx-auto mb-11 md:mb-28 px-6 text-center overflow-visible">
      
      {/* 1. FLOATING DECOR (Background Watermark) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-[0.03] select-none pointer-events-none">
        <h3 className="text-[15vw] font-black uppercase leading-none text-secondary">
          {words[0]}
        </h3>
      </div>

      <div className="relative z-10">
        {/* 2. SUBTITLE: Minimal with Diamond Accents */}
        {subtitle && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-green" />
            <span className="text-[9px] md:text-[18px]  uppercase  text-green">
              {subtitle}
            </span>
            <span className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-green" />
          </motion.div>
        )}

        {/* 3. MAIN TITLE: Premium Spacing & Custom Colors */}
        <h2 className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-6 gap-y-2">
          {words.map((word, i) => (
            <motion.span 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
              className={`font-[Gotu] text-4xl md:text-5xl lg:text-5xl font-[1000] uppercase 
                ${i === 0 ? "text-primary" : i === 1 ? "text-green" : "text-secondary"}
              `}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        {/* 4. INNOVATIVE FLOATING ACCENT BAR */}
        <div className="relative mt-3 md:mt-4 flex justify-center">
          <motion.div 
             initial={{ width: 0 }}
             whileInView={{ width: "200px" }}
             transition={{ duration: 1.2, ease: "circOut" }}
             className="h-[2px] bg-slate-100 relative"
          >
            {/* Moving Indicator Dot */}
            <motion.div 
              animate={{ x: [-100, 100, -100] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[3px] left-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#ff9933]"
            />
            {/* Static Tri-color center piece */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1 bg-white px-2">
               <div className="w-2 h-2 rounded-full bg-primary" />
               <div className="w-2 h-2 rounded-full bg-slate-200" />
               <div className="w-2 h-2 rounded-full bg-green" />
            </div>
          </motion.div>
        </div>

        {/* 5. LEGACY CAPTION */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-2"
        >
          <div className="inline-block px-6 py-2 rounded-full border border-slate-100 bg-slate-50/50 backdrop-blur-sm">
             <p className="text-[7px] md:text-[8px] font-bold text-secondary/60 uppercase ">
               <span className="text-secondary">3 decades</span> of serving Satna
             </p>
          </div>
        </motion.div>
      </div>

      {/* 6. CORNER ACCENTS (Modern Frame Feel) */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/10" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green/10" />
    </div>
  );
};

export default SectionHeading;