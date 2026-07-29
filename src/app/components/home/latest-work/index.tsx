"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const LatestWork = () => {
  const { dict, locale } = useLanguage();
  const [workData, setWorkData] = useState<any>(null);

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

  return (
    <section id="latest-works" className="bg-slate-900 text-white selection:bg-primary selection:text-white print:bg-white print:text-black">
      <div className="bg-softGray print:bg-transparent">
        <div className="container">
          <div className="py-16 xl:py-32 print:py-8">
            <div className="flex items-center justify-between gap-2 border-b border-white/20 print:border-slate-200 pb-7 mb-9 md:mb-16 print:mb-8">
              <h2 className="text-white print:text-slate-900">{dict.latestWork.title}</h2>
              <p className="text-xl text-primary">( 04 )</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 xl:gap-y-12">
              {workData?.map((value: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="group flex flex-col gap-3 xl:gap-6"
                  >
                    {/* --- BAGIAN GAMBAR --- */}
                    <div className="relative">
                      <Image
                        src={getImgPath(value?.image)}
                        alt="image"
                        width={570}
                        height={414}
                        className="rounded-lg w-full h-full object-cover"
                      />
                      
                      <Link
                        href={value.slug}
                        target="_blank"
                        rel="noopener noreferrer"
                        // PERUBAHAN DI SINI:
                        // Hapus 'hidden group-hover:flex'
                        // Ganti dengan 'flex opacity-0 group-hover:opacity-100 transition-all duration-300'
                        className="absolute top-0 left-0 backdrop-blur-xs bg-primary/15 w-full h-full flex rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <span className="flex justify-center items-center p-5 w-full h-full">
                          <svg
                            width="65"
                            height="64"
                            viewBox="0 0 65 64"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
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
                      </Link>
                    </div>

                    {/* --- BAGIAN JUDUL --- */}
                    <div className="flex flex-col gap-1 xl:gap-2 mt-2">
                      <div className="flex items-center justify-between">
                        <Link 
                            href={value.slug}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                        >
                          <h5 className="font-semibold text-slate-900">{value?.title?.[locale] || value?.title}</h5>
                        </Link>
                        <Image
                          src={getImgPath("/images/icon/right-arrow-icon.svg")}
                          alt="right-arrow-icon"
                          width={30}
                          height={30}
                          className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                        />
                      </div>
                      <p className="text-slate-500 text-sm">{value?.client}</p>
                      
                      {/* --- SKILLS/TOOLS --- */}
                      {value?.skills && value.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {value.skills.map((skill: string, i: number) => (
                            <span 
                              key={i} 
                              className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium border border-slate-200"
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
  );
};

export default LatestWork;