import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import type { Lang } from "@/layouts/MainLayout";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { X, ChevronLeft, ChevronRight, Layers, ArrowUpRight } from "lucide-react";
import { galleryCategories } from "@/data/galleryData";

const GallerySection = () => {
  const { lang } = useOutletContext<{ lang: Lang }>();
  const isHi = lang === "hi";

  const [activeCat, setActiveCat] = useState<typeof galleryCategories[0] | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeCat) {
      timer = setTimeout(() => handleNext(), 5000);
    }
    return () => clearTimeout(timer);
  }, [activeCat, imgIndex]);

  const handleNext = () => {
    if (activeCat) {
      if (imgIndex < activeCat.images.length - 1) {
        setImgIndex(prev => prev + 1);
      } else {
        closeGallery();
      }
    }
  };

  const handlePrev = () => {
    if (imgIndex > 0) setImgIndex(prev => prev - 1);
  };

  const closeGallery = () => {
    setActiveCat(null);
    setImgIndex(0);
  };

  return (
    <section id="gallery" className="relative py-24 bg-[#FCFCFC] overflow-hidden">
      {/* Refined Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-slate-200 rounded-full blur-[120px]" />
      </div>

      <div className="mx-auto w-full px-4 md:px-12 lg:px-20">
        <div className="mb-16">
          <SectionHeading 
            subtitle={isHi ? "विजुअल आर्काइव" : "Visual Archive"} 
            title={isHi ? "जनसेवा की झलकियां" : "Moments of Service"} 
          />
        </div>

        {/* MODERN BENTO GRID - Adjusted Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-auto md:h-[750px] lg:px-12 xl:px-24">
          {galleryCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => { setActiveCat(cat); setImgIndex(0); }}
              className={`group relative overflow-hidden rounded-[2rem] cursor-pointer bg-white shadow-sm border border-slate-100
                ${idx === 0 ? "md:col-span-7 md:row-span-2" : ""} 
                ${idx === 1 ? "md:col-span-5 md:row-span-1" : ""}
                ${idx === 2 ? "md:col-span-2 md:row-span-1" : ""}
                ${idx === 3 ? "md:col-span-3 md:row-span-1" : ""}
              `}
            >
              <img 
                src={cat.thumbnail} 
                className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
                alt={cat.titleEn}
              />
              
              {/* Refined Gradient: Slate to Transparent */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <div className="flex items-end justify-between translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="max-w-[75%]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-primary text-white text-[9px] font-bold uppercase ">
                        {cat.images.length} {isHi ? "फोटोज" : "Photos"}
                      </span>
                    </div>
                    <h3 className="text-white text-xl md:text-2xl font-gotu font-bold leading-tight">
                      {isHi ? cat.titleHi : cat.titleEn}
                    </h3>
                  </div>
                  
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>

              {/* Minimal Glass Tag */}
              <div className="absolute top-6 left-6 px-3 py-1.5 rounded-lg bg-black/20 backdrop-blur-md border border-white/10 text-white text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Layers size={12} className="text-primary" />
                {isHi ? "गैलरी" : "Gallery"}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* STORY VIEWER OVERLAY */}
      <AnimatePresence>
        {activeCat && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-[#0A0A0B] flex items-center justify-center p-0 md:p-10"
          >
            <div className="absolute inset-0 opacity-30 blur-3xl pointer-events-none">
                <img src={activeCat.images[imgIndex]} className="w-full h-full object-cover" alt="" />
            </div>

            {/* Premium Header */}
            <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black to-transparent z-[10005] flex items-center justify-between px-6 md:px-12">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/20">
                    <img src={activeCat.thumbnail} className="w-full h-full object-cover" alt="" />
                </div>
                <div>
                  <h3 className="text-white font-gotu font-bold text-sm md:text-base">{isHi ? activeCat.titleHi : activeCat.titleEn}</h3>
                  <p className="text-primary text-[10px] uppercase font-bold tracking-tighter">{isHi ? "लाइव" : "Live"}</p>
                </div>
              </div>
              
              <button 
                onClick={closeGallery} 
                className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-md border border-white/10"
              >
                <X size={24} />
              </button>
            </div>

            <div className="relative w-full h-full max-w-5xl flex items-center justify-center">
              {/* Progress Bars - Higher contrast */}
              <div className="absolute top-24 inset-x-6 md:inset-x-12 flex gap-1 z-[10004]">
                {activeCat.images.map((_, i) => (
                  <div key={i} className="h-0.5 flex-1 bg-white/20 rounded-full overflow-hidden">
                    {i === imgIndex && (
                      <motion.div 
                        initial={{ width: "0%" }} animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }}
                        className="h-full bg-primary"
                      />
                    )}
                    {i < imgIndex && <div className="h-full w-full bg-primary/60" />}
                  </div>
                ))}
              </div>

              {/* Click Zones */}
              <div className="absolute inset-0 z-[10003] flex">
                <div className="flex-1 cursor-w-resize" onClick={handlePrev} />
                <div className="flex-1 cursor-e-resize" onClick={handleNext} />
              </div>

              <AnimatePresence mode="wait">
                <motion.img 
                  key={imgIndex}
                  src={activeCat.images[imgIndex]}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-[90%] max-h-[70vh] object-contain rounded-2xl z-[10002] shadow-2xl"
                />
              </AnimatePresence>

              <button onClick={handlePrev} className="hidden lg:flex absolute left-[-80px] text-white/20 hover:text-white transition-all z-[10004]">
                <ChevronLeft size={48} strokeWidth={1} />
              </button>
              <button onClick={handleNext} className="hidden lg:flex absolute right-[-80px] text-white/20 hover:text-white transition-all z-[10004]">
                <ChevronRight size={48} strokeWidth={1} />
              </button>
            </div>

            {/* Bottom Caption Area */}
            <div className="absolute bottom-8 inset-x-0 px-6 flex justify-center z-[10004]">
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                 className="px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-center"
               >
                  <p className="text-white/40 text-[9px] uppercase tracking-widest mb-1">
                    {imgIndex + 1} / {activeCat.images.length}
                  </p>
                  <p className="text-white text-sm md:text-base font-Poppins">
                    {isHi ? "स्वर्णिम सतना: जनसेवा और विकास की यात्रा" : "Golden satna: A journey of service & growth"}
                  </p>
               </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection; 