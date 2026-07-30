"use client";

import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { GitBranch } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

const GithubContribution = () => {
  const { locale } = useLanguage();
  
  // Ganti username ini dengan username GitHub kamu
  const githubUsername = "dhandynuzirwan"; 

  const selectLastHalfYear = contributions => {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const shownMonths = 12;
    
      return contributions.filter(activity => {
          const date = new Date(activity.date);
          const monthOfDay = date.getMonth();
          return (
            date.getFullYear() === currentYear &&
            monthOfDay > currentMonth - shownMonths &&
            monthOfDay <= currentMonth
          );
      });
  };

  return (
    <div className="mt-6 relative z-10 print:hidden w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full bg-white border border-slate-100 rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl shadow-slate-200/40 flex justify-center"
        >
          <div className="w-full flex justify-center [&>article]:w-full [&>article]:max-w-full">
            <GitHubCalendar 
              username={githubUsername} 
              colorScheme="light"
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
