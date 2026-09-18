"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import FallbackImage from "./FallbackImage";

interface LightboxContextType {
  openLightbox: (images: string[], initialIndex?: number, caption?: string) => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export const useLightbox = () => {
  const context = useContext(LightboxContext);
  if (!context) throw new Error("useLightbox must be used within a LightboxProvider");
  return context;
};

export const LightboxProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [caption, setCaption] = useState<string | undefined>(undefined);

  const openLightbox = useCallback((newImages: string[], initialIndex = 0, newCaption?: string) => {
    if (newImages.length === 0) return;
    setImages(newImages);
    setCurrentIndex(initialIndex);
    setCaption(newCaption);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setImages([]);
      setCaption(undefined);
    }, 300); // clear after animation
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  // Keyboard Navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    // Prevent scrolling when open
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, closeLightbox, nextImage, prevImage]);

  return (
    <LightboxContext.Provider value={{ openLightbox }}>
      {children}
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-[#020202]/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-10"
          >
            {/* Top Bar */}
            <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
              <span className="text-white/50 text-sm font-mono tracking-widest bg-black/50 px-4 py-2 rounded-full border border-white/10">
                {currentIndex + 1} / {images.length}
              </span>
              <button 
                onClick={closeLightbox}
                className="p-3 rounded-full bg-white/5 hover:bg-white/20 transition-colors border border-white/10 group"
              >
                <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="relative w-full h-full max-w-6xl max-h-[80vh] flex items-center justify-center mt-12">
              
              {/* Prev Button */}
              {images.length > 1 && (
                <button 
                  onClick={prevImage}
                  className="absolute left-0 md:-left-12 z-50 p-4 rounded-full bg-black/50 hover:bg-neon-cyan/20 border border-white/10 hover:border-neon-cyan transition-all group backdrop-blur-md"
                >
                  <ChevronLeft className="w-8 h-8 text-white group-hover:-translate-x-1 transition-transform" />
                </button>
              )}

              {/* The Image Container */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative w-full h-full flex flex-col items-center justify-center bg-black/40 rounded-3xl border border-white/5 overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.1)] absolute"
                >
                  {/* Actual Image */}
                  <div className="absolute inset-0 w-full h-full">
                    <FallbackImage 
                      src={images[currentIndex]} 
                      alt={caption || `Gallery Image ${currentIndex + 1}`} 
                      fill 
                      className="object-contain" 
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Next Button */}
              {images.length > 1 && (
                <button 
                  onClick={nextImage}
                  className="absolute right-0 md:-right-12 z-50 p-4 rounded-full bg-black/50 hover:bg-neon-purple/20 border border-white/10 hover:border-neon-purple transition-all group backdrop-blur-md"
                >
                  <ChevronRight className="w-8 h-8 text-white group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/50 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative w-16 h-12 rounded-xl border-2 overflow-hidden transition-all duration-300 ${idx === currentIndex ? 'border-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.5)] scale-110' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                  >
                    <div className="w-full h-full bg-white/5 relative flex items-center justify-center">
                      <FallbackImage 
                        src={img} 
                        alt={`Thumbnail ${idx + 1}`} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            {/* Optional Caption */}
            {caption && (
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
                <span className="bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-white font-medium text-sm drop-shadow-xl inline-block">
                  {caption}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}
