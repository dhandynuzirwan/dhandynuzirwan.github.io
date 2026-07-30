"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getImgPath } from "@/utils/image";
import { useLanguage } from "@/app/context/LanguageContext";

interface ProjectModalProps {
  project: any | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { dict, locale } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Reset image index when opening a new project
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  const gallery = project.gallery || [project.image];
  
  // Translation helpers
  const getLocalizedText = (field: any) => {
    if (!field) return "";
    return field[locale] || field.en || field;
  };

  const title = getLocalizedText(project.title);
  const description = getLocalizedText(project.description);
  const goals = getLocalizedText(project.goals);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-5 md:right-5 z-50 w-9 h-9 md:w-10 md:h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white shadow-md transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Scrolling Wrapper for Mobile / Flex Row for Desktop */}
          <div className="flex flex-col md:flex-row w-full h-full overflow-y-auto md:overflow-hidden custom-scrollbar">

            {/* Left Side: Auto-scrolling Gallery */}
            <div className="w-full md:w-1/2 bg-slate-100 relative overflow-hidden h-[240px] sm:h-[300px] md:h-auto md:min-h-full shrink-0">
              <motion.div
                animate={{ y: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: gallery.length * 12, repeat: Infinity }}
                className="flex flex-col w-full"
              >
                {[...gallery, ...gallery].map((img: string, idx: number) => (
                  <div key={idx} className="relative w-full aspect-video shrink-0 border-b-2 border-slate-100">
                    <Image
                      src={getImgPath(img)}
                      alt={`${title} - screenshot ${idx}`}
                      fill
                      className="object-cover"
                      priority={idx < 2}
                    />
                  </div>
                ))}
              </motion.div>
              
              {/* Gradient overlays to soften edges */}
              <div className="absolute top-0 left-0 w-full h-8 md:h-10 bg-gradient-to-b from-slate-100 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-8 md:h-10 bg-gradient-to-t from-slate-100 to-transparent z-10 pointer-events-none" />
            </div>

            {/* Right Side: Project Details */}
            <div className="w-full md:w-1/2 p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col md:max-h-[90vh] md:overflow-y-auto custom-scrollbar">
              <div className="flex-1">
                <p className="text-primary font-medium text-xs md:text-sm mb-1.5">{project.client}</p>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6 leading-tight pr-6">{title}</h2>
                
                {/* Skills */}
                {project.skills && (
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6 md:mb-8">
                    {project.skills.map((skill: string, idx: number) => (
                      <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[11px] sm:text-xs font-semibold border border-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Description */}
                {description && (
                  <div className="mb-5 md:mb-6">
                    <h4 className="text-slate-900 font-semibold mb-2 text-sm md:text-base">{locale === 'id' ? 'Deskripsi Proyek' : 'Project Overview'}</h4>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                      {description}
                    </p>
                  </div>
                )}

                {/* Goals */}
                {goals && (
                  <div className="mb-6 md:mb-8">
                    <h4 className="text-slate-900 font-semibold mb-2 text-sm md:text-base">{locale === 'id' ? 'Tujuan & Hasil' : 'Goals & Impact'}</h4>
                    <div className="p-3.5 md:p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                        {goals}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-5 md:pt-6 border-t border-slate-100 mt-auto">
                <Link
                  href={project.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 md:py-4 bg-slate-900 text-white rounded-full text-sm md:text-base font-medium hover:bg-primary transition-colors hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 duration-300"
                >
                  <span>{locale === 'id' ? 'Kunjungi Proyek' : 'View Live Project'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
