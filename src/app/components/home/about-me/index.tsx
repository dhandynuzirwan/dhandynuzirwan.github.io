"use client";

import { getImgPath } from "@/utils/image";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

const AboutMe = () => {
  const { dict, locale, setLocale } = useLanguage();
  return (
    <section className="py-20 md:py-32 relative bg-slate-50 overflow-hidden print:py-8 print:bg-white">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 -right-1/4 w-1/2 h-1/2 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between border-b border-slate-200 pb-6 mb-12 lg:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">{dict.about.title}</h2>
          <p className="text-lg md:text-xl font-medium text-primary bg-primary/10 px-4 py-1 rounded-full">01</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-sm lg:w-[400px] aspect-[3/4] relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 bg-white"
          >
            <Image
              src={getImgPath("/images/home/about-me/wisuda.JPG")}
              alt="About Dhandy"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 w-full space-y-6"
          >
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 relative overflow-hidden">
              <div className="absolute -top-6 -left-2 text-8xl text-slate-100 font-serif pointer-events-none">"</div>
              
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed relative z-10 mb-6 pb-6 border-b border-slate-100">
                <strong className="text-slate-900 font-semibold">{dict.about.gradText}</strong> {dict.about.gradSub}
              </p>
              
              <div className="max-h-[300px] overflow-y-auto pr-2 sm:pr-4 custom-scrollbar relative z-10">
                <p className="text-slate-600 text-lg leading-relaxed">
                  {dict.about.desc1}
                </p>
                
                <p className="text-slate-600 text-lg leading-relaxed mt-5">
                  {dict.about.desc2}
                </p>

                <p className="text-slate-600 text-lg leading-relaxed mt-5">
                  {dict.about.desc3}
                </p>

                <p className="text-slate-600 text-lg leading-relaxed mt-5">
                  {dict.about.desc4}
                </p>

                <p className="text-slate-600 text-lg leading-relaxed mt-5">
                  {dict.about.desc5}
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-6 print:hidden">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Image
                      src={getImgPath("/images/icon/lang-icon.svg")}
                      alt="Language"
                      width={24}
                      height={24}
                    />
                  </div>
                  <p className="text-slate-900 font-medium">{dict.about.languages}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setLocale("en")}
                    className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                      locale === "en" ? "bg-primary text-white border-primary" : "bg-slate-50 text-slate-700 border-slate-200 hover:border-primary hover:text-primary"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLocale("id")}
                    className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                      locale === "id" ? "bg-primary text-white border-primary" : "bg-slate-50 text-slate-700 border-slate-200 hover:border-primary hover:text-primary"
                    }`}
                  >
                    Indonesia
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
