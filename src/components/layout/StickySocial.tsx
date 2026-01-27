import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { motion } from "framer-motion";

const StickySocial = () => {
  const socials = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/17swfiNCF2/",
      color: "#F97316", // Saffron
      hoverBg: "bg-secondary", // Background on hover
      label: "Facebook"
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/ganeshsingh_in",
      color: "#16A34A", // Green
      hoverBg: "bg-red-600",
      label: "Instagram"
    },
    {
      icon: Twitter,
      href: "https://x.com/GaneshSingh_in",
      color: "#F97316",
      hoverBg: "bg-secondary", // Dark for Twitter/X
      label: "Twitter"
    },
    {
      icon: Youtube,
      href: "https://youtube.com/@ganeshsingh_in",
      color: "#16A34A",
      hoverBg: "bg-red-600",
      label: "Youtube"
    },
    {
      icon: FaWhatsapp,
      href: "https://whatsapp.com/channel/0029VaC2vxOI7BeLB9xjC43u",
      color: "#F97316", // Saffron
      hoverBg: "bg-secondary", // Background on hover
      label: "Youtube"
    },
  ];

  return (
    <div className="fixed z-[999] bottom-24 right-4 md:right-6 md:top-1/2 md:-translate-y-1/2 md:bottom-auto">

      {/* MAIN DOCK CONTAINER */}
      <div className="relative p-2 bg-white/80 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col gap-3 md:gap-4 overflow-hidden">

        {/* Top/Bottom Decorative Accents */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-primary/20" />
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-green/20" />

        {socials.map((item, idx) => (
          <motion.a
            key={idx}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, x: -4 }}
            whileTap={{ scale: 0.95 }}
            className="relative group h-7 w-7 md:h-14 md:w-14 flex items-center justify-center rounded-2xl transition-all duration-500"
          >
            {/* Background Layer - Becomes visible on hover */}
            <div className={`absolute inset-0 rounded-2xl scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ${item.hoverBg} shadow-lg shadow-black/10`} />

            {/* Icon - Color changes to White on hover */}
            <item.icon
              className={`w-5 h-5 md:w-6 md:h-6 relative z-10 transition-colors duration-300 group-hover:text-white`}
              style={{ color: item.color }} // Default color (set dynamically)
            />

            {/* Hover Indicator Line */}
            <div className={`absolute -right-2 w-1 h-0 group-hover:h-6 transition-all duration-300 rounded-full ${idx % 2 === 0 ? 'bg-primary' : 'bg-green'}`} />

            {/* Premium Tooltip */}
            <div className="hidden md:flex absolute right-full mr-6 items-center opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-4 group-hover:translate-x-0">
              <div className="bg-secondary text-white text-[10px] font-black uppercase px-4 py-2 rounded-xl shadow-xl whitespace-nowrap">
                {item.label}
              </div>
              <div className="w-2 h-2 bg-secondary rotate-45 -ml-1" />
            </div>
          </motion.a>
        ))}

      </div>
    </div>
  );
};

export default StickySocial;