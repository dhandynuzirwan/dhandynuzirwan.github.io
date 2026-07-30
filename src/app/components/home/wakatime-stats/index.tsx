"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Code2, Activity, Calendar } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

interface StatItem {
  name: string;
  text: string;
  percent: number;
}

interface WakatimeData {
  total_time: string;
  daily_average: string;
  best_day: {
    date: string;
    text: string;
  } | null;
  languages: StatItem[];
}

const WakatimeStats = () => {
  const { locale } = useLanguage();
  const [data, setData] = useState<WakatimeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/wakatime");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Failed to fetch WakaTime stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !data) return null;

  // Format date helper
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateStr).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", options);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="mt-20 md:mt-28 relative z-10 print:hidden w-full">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
        >
          {/* Card 1: Total Time */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[280px]">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6 text-slate-300">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/5">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <span className="text-lg font-medium">
                  {locale === "id" ? "Total 7 Hari" : "Total 7 Days"}
                </span>
              </div>
            </div>
            
            <div className="relative z-10 mt-auto">
              <h4 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
                {data.total_time}
              </h4>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl w-fit border border-white/5">
                <Activity className="w-5 h-5 text-green-400" />
                <span className="text-slate-200 text-sm">
                  {locale === "id" ? "Rata-rata Harian: " : "Daily Average: "} 
                  <strong className="text-white">{data.daily_average}</strong>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Languages */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col min-h-[280px]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
                <Code2 className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-slate-800 font-semibold text-lg">
                {locale === "id" ? "Bahasa Teratas" : "Top Languages"}
              </p>
            </div>
            <div className="space-y-6 mt-auto">
              {data.languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-slate-700">{lang.name}</span>
                    <span className="text-slate-500">{lang.text}</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Best Day */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col min-h-[280px] relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/5 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out" />
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-100">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-slate-800 font-semibold text-lg">
                {locale === "id" ? "Hari Terproduktif" : "Most Productive Day"}
              </p>
            </div>
            
            <div className="relative z-10 mt-auto flex flex-col justify-end">
              <p className="text-slate-500 mb-2">
                {locale === "id" ? "Rekor ngoding terlama:" : "Longest coding record:"}
              </p>
              <h4 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                {data.best_day?.text || "-"}
              </h4>
              <div className="inline-block px-4 py-2.5 bg-amber-50 border border-amber-100 rounded-xl w-fit">
                <p className="text-sm font-semibold text-amber-600">
                  {data.best_day ? formatDate(data.best_day.date) : ""}
                </p>
              </div>
            </div>
          </motion.div>

        </motion.div>
    </div>
  );
};

export default WakatimeStats;
