import { useState } from "react";
import { useOutletContext } from "react-router-dom"; 
import { motion } from "framer-motion";
import type { Lang } from "@/layouts/MainLayout";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { Send, Mail, Facebook, Twitter, Instagram, CheckCircle2, MapPin, MessageCircle, ExternalLink } from "lucide-react";
import qr from "@/assets/qr.jpeg"; 

const ContactSection = () => {
  const { lang } = useOutletContext<{ lang: Lang }>(); 
  const isHi = lang === "hi";

  const [form, setForm] = useState({
    name: "", phone: "", email: "", city: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = isHi ? "जनसंपर्क वेबसाइट से नया संदेश" : "New Message";
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nCity: ${form.city}\n\nMessage:\n${form.message}`;
    window.location.href = `mailto:ganeshsinghsatnamp@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const labels = {
    title: isHi ? "अपनी बात हम तक पहुँचाएँ" : "Share Your Message With Us",
    subtitle: isHi ? "संपर्क करें" : "Contact Us",
    desc: isHi ? "सतना के विकास और आपकी समस्याओं के समाधान के लिए हम सदैव तत्पर हैं।" : "We are always ready for the development of Satna and to solve your problems.",
    name: isHi ? "पूरा नाम" : "Full Name",
    phone: isHi ? "मोबाइल नंबर" : "Mobile Number",
    email: isHi ? "ईमेल पता" : "Email Address",
    city: isHi ? "शहर / जिला" : "City / District",
    msg: isHi ? "अपना संदेश लिखें...(वैकल्पिक)" : "Write your message...(optional)",
    btn: isHi ? "संदेश भेजें" : "Send Message",
    qrTitle: isHi ? "व्हाट्सएप चैनल" : "WhatsApp Channel",
    qrDesc: isHi ? "सीधे अपडेट्स पाने के लिए अभी स्कैन करें" : "Scan now for direct updates"
  };

  const whatsappLink = "https://whatsapp.com/channel/0029VaC2vxOI7BeLB9xjC43u";

  return (
    <section id="contact" className="relative overflow-hidden bg-[#FCFCFD] py-16 lg:py-24 font-Poppins">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="mx-auto w-full max-w-[1400px] px-3 lg:px-12">
        <div className="mb-12">
          <SectionHeading subtitle={labels.subtitle} title={labels.title} />
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: Heading & BIG QR */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:col-span-5 space-y-10"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase">
                <CheckCircle2 className="w-4 h-4" />
                {isHi ? "सीधा संवाद" : "Direct Connect"}
              </div>
              <h3 className="text-4xl md:text-5xl font-gotu font-bold text-secondary leading-tight">
                {isHi ? "आप की आवाज़, सतना के विकास की नींव" : "Your Voice, Building Satna"}
              </h3>
              <p className="text-secondary/70 text-lg leading-relaxed">
                {labels.desc}
              </p>
            </div>

            {/* VERY BIG QR CARD */}
            <div className="relative py-2 md:p-10 rounded-[3rem] bg-white border border-slate-100 shadow-2xl shadow-green/10 flex flex-col items-center text-center space-y-6">
              <div className="relative group bg-slate-50 p-2 rounded-3xl border-2 border-dashed border-green/20">
                <img src={qr} alt="WhatsApp QR" className="w-80 h-80 md:w-80 md:h-80 object-contain rounded-2xl  transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute -top-3 -right-3 bg-green text-white p-2 rounded-full animate-bounce shadow-lg">
                  <MessageCircle size={24} />
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-2xl font-bold text-secondary">{labels.qrTitle}</h4>
                <p className="text-secondary/60 max-w-xs mx-auto">{labels.qrDesc}</p>
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-3 bg-green text-white px-8 py-4 rounded-2xl font-bold hover:bg-secondary transition-all shadow-xl shadow-green/20 active:scale-95"
                >
                  {isHi ? "चैनल जॉइन करें" : "Join Channel"} <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Form & Info Below */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:col-span-7 space-y-8"
          >
            {/* THE FORM BOX */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-50">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] text-slate-500 uppercase font-bold ml-1">{labels.name}</label>
                  <input type="text" name="name" required className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium" onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] text-slate-500 uppercase font-bold ml-1">{labels.phone}</label>
                  <input type="tel" name="phone" required className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium" onChange={handleChange} />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[13px] text-slate-500 uppercase font-bold ml-1">{labels.email}</label>
                  <input type="email" name="email" required className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-6 py-4 focus:ring-4 focus:ring-green/10 focus:border-green transition-all outline-none font-medium" onChange={handleChange} />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[13px] text-slate-500 uppercase font-bold ml-1">{labels.msg}</label>
                  <textarea name="message" rows={4} className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none resize-none font-medium" onChange={handleChange} />
                </div>
                <button type="submit" className="md:col-span-2 group h-16 w-full rounded-2xl bg-secondary font-bold text-white transition-all shadow-xl shadow-secondary/20 flex items-center justify-center gap-3">
                  <span className="uppercase tracking-widest">{labels.btn}</span>
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>

            {/* INFO & SOCIALS UNDER FORM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Email Card - Now Clickable */}
  <a 
  target="_blank"
    href="mailto:ganeshsinghsatnamp@gmail.com"
    className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:border-green/30 hover:shadow-md group"
  >
    <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-green/10 text-green group-hover:bg-green group-hover:text-white transition-all">
      <Mail size={20} />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] text-slate-400 uppercase font-bold">Email Official</p>
      <p className="text-sm text-secondary font-medium break-all">ganeshsinghsatnamp@gmail.com</p>
    </div>
  </a>

  {/* Constituency Card */}
 <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:border-primary/30 hover:shadow-md group cursor-default">
  <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
    <MapPin size={20} />
  </div>
  <div>
    <p className="text-[10px] text-slate-400 uppercase font-bold">Constituency</p>
    <p className="text-sm text-secondary font-medium">{isHi ? "सतना, मध्य प्रदेश" : "Satna, Madhya Pradesh"}</p>
  </div>
</div>
</div>
            {/* SOCIAL MEDIA ICONS */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <p className="text-xs font-bold text-slate-400 uppercase mr-2 tracking-widest">{isHi ? "कार्यालय सोशल मीडिया:" : "Office Social Media:"}</p>
              {[
                { Icon: Facebook, link: "https://www.facebook.com/share/17G8ZiAHdx/", color: "hover:bg-[#1877F2]" },
                { Icon: Twitter, link: "https://x.com/OfficeofGS", color: "hover:bg-black" },
                { Icon: Instagram, link: "https://www.instagram.com/officeofgs", color: "hover:bg-[#E4405F]" },
              ].map(({ Icon, link, color }, i) => (
                <a key={i} href={link} target="_blank" rel="noopener noreferrer" className={`h-12 w-12 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-secondary ${color} hover:text-white transition-all shadow-sm hover:-translate-y-1`}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;