"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import ProjectModal from "./ProjectModal";

const LatestWork = () => {
  const { dict, locale } = useLanguage();
  const [workData, setWorkData] = useState<any>(null);
  
  // Modal State
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/work-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setWorkData(data?.workData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Wait for exit animation
  };

  return (
    <>
      <section id="latest-works">
        <div className="bg-softGray dark:bg-slate-900 print:bg-transparent">
          <div className="container">
            <div className="py-16 xl:py-32 print:py-8">
              <div className="flex items-center justify-between gap-2 border-b border-slate-900 dark:border-white print:border-slate-200 pb-7 mb-9 md:mb-16 print:mb-8">
                <h2 className="text-slate-900 dark:text-white">{dict.latestWork.title}</h2>
                <p className="text-xl text-primary">( 04 )</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 xl:gap-y-12">
                {workData?.map((value: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="group flex flex-col gap-3 xl:gap-6 cursor-pointer"
                      onClick={() => openModal(value)}
                    >
                      {/* --- BAGIAN GAMBAR --- */}
                      <div className="relative overflow-hidden rounded-lg">
                        <Image
                          src={getImgPath(value?.image)}
                          alt="image"
                          width={570}
                          height={414}
                          className="rounded-lg w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        <div
                          className="absolute top-0 left-0 backdrop-blur-xs bg-primary/15 w-full h-full flex rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <span className="flex justify-center items-center p-5 w-full h-full">
                            <svg
                              width="65"
                              height="64"
                              viewBox="0 0 65 64"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="scale-75 group-hover:scale-100 transition-transform duration-500"
                            >
                              <rect
                                x="0.333374"
                                width="64"
                                height="64"
                                rx="32"
                                fill="#2563eb"
                              />
                              <path
                                d="M25.6667 25.3333H39M39 25.3333V38.6666M39 25.3333L25.6667 38.6666"
                                stroke="#FFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      {/* --- BAGIAN JUDUL --- */}
                      <div className="flex flex-col gap-1 xl:gap-2 mt-2">
                        <div className="flex items-center justify-between">
                          <button 
                            className="hover:text-primary transition-colors text-left"
                          >
                            <h5 className="font-semibold text-slate-900 dark:text-white">{value?.title?.[locale] || value?.title}</h5>
                          </button>
                          <Image
                            src={getImgPath("/images/icon/right-arrow-icon.svg")}
                            alt="right-arrow-icon"
                            width={30}
                            height={30}
                            className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 dark:invert"
                          />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">{value?.client}</p>
                        
                        {/* --- SKILLS/TOOLS --- */}
                        {value?.skills && value.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {value.skills.map((skill: string, i: number) => (
                              <span 
                                key={i} 
                                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md text-xs font-medium border border-slate-200 dark:border-slate-700"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  );
};

export default LatestWork;