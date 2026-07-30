"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const EducationSkills = () => {
  const { dict, locale } = useLanguage();
  const [educationData, setEductionData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/page-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEductionData(data?.educationData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="border-t border-softGray dark:border-slate-800 overflow-hidden">
        <div className="container relative z-10">
          <Image
            src={getImgPath(
              "/images/home/education-skill/edu-skill-vector.svg"
            )}
            alt="vector"
            width={260}
            height={170}
            className="no-print absolute top-0 left-0 transform -translate-y-1/2 dark:invert dark:opacity-20"
          />
          <div className="relative z-10 py-16 md:py-32 print:py-8">
            <div className="flex items-center justify-between gap-2 border-b border-slate-900 dark:border-white pb-7 mb-9 xl:mb-16 print:mb-8">
              <h2 className="text-slate-900 dark:text-white">{dict.educationSkills.title}</h2>
              <p className="text-xl text-primary">( 03 )</p>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-10 xl:gap-20">
              <div className="w-full lg:max-w-md flex flex-col gap-0 xl:gap-8">
                {educationData?.education?.map((value: any, index: any) => {
                  return (
                    <div key={index} className="flex items-start gap-6">
                      <div className="no-print mt-2.5 w-3.5 h-3.5 rounded-full border-1 bg-white dark:bg-slate-950 flex items-center justify-center border-slate-900 dark:border-slate-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-slate-500"></div>
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <h5 className="text-slate-900 dark:text-white">{value?.title?.[locale] || value?.title}</h5>
                        <p className="font-normal text-slate-600 dark:text-slate-400">{value?.description?.[locale] || value?.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 xs:grid-cols-3 gap-5 xl:gap-7 w-full">
                {educationData?.skills?.map((value: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="group relative overflow-hidden p-6 xl:p-8 border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50 rounded-2xl flex flex-col items-center justify-center hover:border-primary/40 dark:hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
                    >
                      {/* Shining Effect Overlay */}
                      <div className="absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-white/80 dark:via-slate-700/50 to-transparent group-hover:animate-shine z-10 pointer-events-none" />
                      
                      <div className="flex flex-col items-center gap-4 relative z-20">
                        <Image
                          src={getImgPath(value?.icon)}
                          alt={value?.name}
                          width={60}
                          height={60}
                          className="group-hover:scale-110 transition-transform duration-300 drop-shadow-sm"
                        />
                        <p className="text-slate-800 dark:text-slate-200 font-medium text-center">{value?.name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSkills;
