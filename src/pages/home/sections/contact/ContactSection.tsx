import { useState } from "react";
import { useOutletContext } from "react-router-dom"; 
import { motion } from "framer-motion";
import type { Lang } from "@/layouts/MainLayout";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { Send, Mail, Facebook, Twitter, Instagram, CheckCircle2, MapPin } from "lucide-react";

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
    btn: isHi ? "संदेश भेजें" : "Send Message"
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#FCFCFD] py-20 lg:py-32">
      {/* Premium Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-green/10 rounded-full blur-[100px] -z-10" />

      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        {/* Heading Section */}
        <div className="mb-16 lg:mb-24">
          <SectionHeading subtitle={labels.subtitle} title={labels.title} />
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT CONTENT: Info & Socials */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:col-span-5 order-2 lg:order-1 space-y-10"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase ">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isHi ? "सीधा संवाद" : "Direct Connect"}
              </div>
              <h3 className="text-3xl md:text-5xl font-gotu font-bold text-secondary  text-justify ">
                {isHi ? "आप की आवाज़, सतना के विकास की नींव" : "Your Voice, Our Priority"}
              </h3>
              <p className="font-Poppins text-secondary/70 text-lg leading-relaxed">
                {labels.desc}
              </p>
            </div>
            
            <div className="space-y-4">
              {/* Contact Card */}
              <div className="flex items-center gap-5 p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm group hover:border-green/30 transition-all duration-500">
                <div className="h-14 w-14 flex-shrink-0 flex items-center justify-center rounded-2xl bg-green/10 text-green group-hover:bg-green group-hover:text-white transition-all duration-500 shadow-inner">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase  mb-1">Email Official</p>
                  <p className="font-bold text-sm md:text-lg text-secondary break-all ">ganeshsinghsatnamp@gmail.com</p>
                </div>
              </div>

              {/* Location Card (Extra Professionalism) */}
              <div className="flex items-center gap-5 p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm group hover:border-primary/30 transition-all duration-500">
                <div className="h-14 w-14 flex-shrink-0 flex items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase  mb-1">Constituency</p>
                  <p className="font-bold text-sm md:text-lg text-secondary ">{isHi ? "सतना, मध्य प्रदेश" : "Satna, Madhya Pradesh"}</p>
                </div>
              </div>
            </div>

            {/* Modern Social Grid */}
            <div className="pt-4">
              <p className="text-[10px] font-black text-slate-400 uppercase  mb-6 ml-1">{isHi ? "सोशल मीडिया पर जुड़ें" : "Follow on Socials"}</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { Icon: Facebook, link: "https://www.facebook.com/share/17G8ZiAHdx/", color: "hover:bg-[#1877F2]" },
                  { Icon: Twitter, link: "https://x.com/OfficeofGS", color: "hover:bg-black" },
                  { Icon: Instagram, link: "https://www.instagram.com/officeofgs", color: "hover:bg-[#E4405F]" },
                ].map(({ Icon, link, color }, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`h-14 w-14 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-secondary ${color} hover:text-white hover:-translate-y-2 transition-all duration-300 shadow-sm`}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT FORM: The Glass Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:col-span-7 order-1 lg:order-2"
          >
            <div className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-br from-primary/30 via-transparent to-green/30 shadow-2xl overflow-hidden">
              <div className="relative bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem]">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: labels.name, name: "name", type: "text", icon: "green" },
                    { label: labels.phone, name: "phone", type: "tel", icon: "primary" },
                    { label: labels.email, name: "email", type: "email", icon: "green" },
                    { label: labels.city, name: "city", type: "text", icon: "primary" },
                  ].map((field, idx) => (
                    <div key={idx} className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-1">{field.label}</label>
                      <input 
                        type={field.type} 
                        name={field.name} 
                        required 
                        className={`w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 focus:ring-4 ${field.icon === 'green' ? 'focus:ring-green/10 focus:border-green' : 'focus:ring-primary/10 focus:border-primary'} transition-all outline-none font-medium`} 
                        onChange={handleChange} 
                      />
                    </div>
                  ))}
               
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1">{labels.msg}</label>
                    <textarea 
                      name="message" 
                      rows={4} 
                      className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none resize-none font-medium" 
                      onChange={handleChange} 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="md:col-span-2 relative group overflow-hidden bg-green py-5 rounded-2xl transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 text-white font-black text-sm md:text-base uppercase  flex items-center justify-center gap-3">
                      {labels.btn} <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;