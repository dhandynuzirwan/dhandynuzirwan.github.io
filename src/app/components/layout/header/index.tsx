"use client";

import { useState } from "react";
import Logo from "../logo";
import { useLanguage } from "@/app/context/LanguageContext";
import { ThemeToggle } from "./theme-toggle";

const Header = () => {
    const { dict, locale, setLocale } = useLanguage();
    
    const handleDownloadPDF = () => {
        window.print();
    };
    
    return (
        <header className="navbar fixed top-0 left-0 z-50 w-full bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300 print:hidden">
            <div className="container">
                <nav className="py-4 md:py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <Logo />
                        </div>
                        <div className="flex items-center gap-4 md:gap-6">
                            <ThemeToggle />
                            <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-slate-700">
                                <button 
                                    onClick={() => setLocale("en")}
                                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${locale === "en" ? "bg-white dark:bg-slate-700 shadow-sm text-primary dark:text-blue-400" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`}
                                >
                                    EN
                                </button>
                                <button 
                                    onClick={() => setLocale("id")}
                                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${locale === "id" ? "bg-white dark:bg-slate-700 shadow-sm text-primary dark:text-blue-400" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`}
                                >
                                    ID
                                </button>
                            </div>
                            <button
                                onClick={handleDownloadPDF}
                                className="relative overflow-hidden cursor-pointer w-fit py-2 px-5 md:px-6 bg-primary text-white font-medium rounded-full hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
                            >
                                <span className="relative z-10 text-sm md:text-base">
                                    {dict.header.downloadResume}
                                </span>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
