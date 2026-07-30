"use client";
import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { GitBranch } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

import { useTheme } from "next-themes";

const GithubContribution = () => {
  const { locale } = useLanguage();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Ganti username ini dengan username GitHub kamu
  const githubUsername = "dhandynuzirwan"; 

  if (!mounted) return null;

  return (
    <div className="mt-6 relative z-10 print:hidden w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl shadow-slate-200/40 dark:shadow-none flex justify-center"
        >
          <div className="w-full flex justify-center [&>article]:w-full [&>article]:max-w-full">
            <GitHubCalendar 
              username={githubUsername} 
              colorScheme={theme === "dark" ? "dark" : "light"}
              blockSize={14}
              blockMargin={5}
              fontSize={14}
              labels={{
                totalCount: locale === "id" ? "{{count}} kontribusi dalam setahun terakhir" : "{{count}} contributions in the last year",
              }}
            />
          </div>
        </motion.div>
    </div>
  );
};

export default GithubContribution;
