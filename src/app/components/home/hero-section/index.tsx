"use client";

import { getImgPath } from "@/utils/image";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

const HeroSection = () => {
  const { dict } = useLanguage();
  const containerVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden print:pt-10 print:pb-10 min-h-screen flex items-center">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center justify-between print:flex-row print:items-center">
          <motion.div 
            className="flex flex-col gap-6 lg:gap-8 max-w-2xl w-full z-10 print:gap-4 print:w-2/3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="space-y-3 print:space-y-1">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[2px] bg-primary rounded-full print:hidden"></span>
                <span className="text-primary font-semibold tracking-widest uppercase text-sm">
                  {dict.hero.welcome}
                </span>
              </div>
              <div className="flex items-center gap-4 md:gap-6 mt-2 print:mt-1">
                <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 dark:text-white print:text-4xl">
                  {dict.hero.im}
                </h1>
                <motion.div 
                  className="inline-block origin-[70%_70%] print:hidden"
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                >
                  <Image
                    src={getImgPath("/images/home/banner/wave-icon.svg")}
                    alt="wave-icon"
                    width={56}
                    height={56}
                    className="drop-shadow-sm w-10 h-10 md:w-14 md:h-14"
                  />
                </motion.div>
              </div>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-300 dark:to-slate-400 print:text-2xl print:text-slate-600">
                {dict.hero.role}
              </h2>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-normal max-w-xl leading-relaxed print:text-sm"
            >
              {dict.hero.description}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4 print:hidden">
               <button 
                 onClick={() => document.getElementById('latest-works')?.scrollIntoView({ behavior: 'smooth' })}
                 className="px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1 cursor-pointer"
               >
                 {dict.hero.viewProjects}
               </button>
               <button 
                 onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                 className="px-8 py-3.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full font-medium hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-all duration-300 hover:shadow-sm cursor-pointer"
               >
                 {dict.hero.contactMe}
               </button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="w-full lg:w-1/2 relative flex justify-center lg:justify-end print:w-1/3 print:justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* Glowing orb behind the person to make them pop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] lg:w-[650px] h-[300px] md:h-[500px] lg:h-[650px] bg-gradient-to-tr from-primary/20 to-blue-300/20 rounded-full blur-[80px] -z-10 print:hidden" />
            
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative z-10 print:transform-none"
            >
              <Image
                src={getImgPath("/images/home/banner/banner-dhandy.png")}
                alt="Dhandy Professional"
                width={800}
                height={800}
                className="w-full max-w-[450px] md:max-w-[600px] lg:max-w-[750px] xl:max-w-[850px] h-auto drop-shadow-2xl scale-110 origin-bottom print:max-w-[150px] print:scale-100"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
