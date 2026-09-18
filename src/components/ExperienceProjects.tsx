"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform } from "framer-motion";
import { Briefcase, ExternalLink, FolderGit2, Images } from "lucide-react";
import FallbackImage from "./FallbackImage";
import { portfolioData } from "@/lib/data";
import TiltCard from "./TiltCard";
import { useLightbox } from "./LightboxProvider";

const TimelineNode = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 70%"]
  });
  
  const [active, setActive] = useState(false);
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0 && !active) {
      setActive(true);
    } else if (latest <= 0 && active) {
      setActive(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      animate={{
        backgroundColor: active ? "#00f3ff" : "#111111",
        borderColor: active ? "#050505" : "#333333",
        boxShadow: active 
          ? ["0 0 15px rgba(0,243,255,0.8)", "0 0 30px rgba(0,243,255,0.4)", "0 0 15px rgba(0,243,255,0.8)"] 
          : "0 0 0px rgba(0,243,255,0)",
        scale: active ? [1.2, 1.4, 1.2] : 1,
      }}
      transition={{
        scale: active ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : { type: "spring", stiffness: 300, damping: 15 },
        boxShadow: active ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : { duration: 0.1 },
        backgroundColor: { duration: 0.1 },
        borderColor: { duration: 0.1 }
      }}
      className="absolute left-[-9px] md:left-1/2 md:transform md:-translate-x-1/2 w-5 h-5 rounded-full border-4 z-10"
    />
  );
};

export default function ExperienceProjects() {
  const { experience } = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 70%"],
  });

  const { openLightbox } = useLightbox();

  const timelineItems = [
    ...experience.map(e => ({ type: 'experience', ...e, title: e.role, year: e.date }))
  ];

  return (
    <section id="projects" className="w-full max-w-5xl mx-auto py-16 md:py-24 px-6 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="text-center mb-20"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <div className="overflow-hidden inline-block py-2">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              viewport={{ once: false }}
              className="inline-block"
            >
              Experience & Internships
            </motion.span>
          </div>
        </h2>
        <p className="text-gray-400">A timeline of my professional journey and hands-on training.</p>
      </motion.div>

      <div ref={containerRef} className="relative md:mx-auto">
        {/* Mobile Snake Line (Draws downwards on scroll) */}
        <div className="block md:hidden absolute left-[1px] top-0 bottom-0 w-[2px] bg-white/5 z-0">
          <motion.div 
            className="w-full bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-cyan drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]"
            style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          />
        </div>

        {/* Central Snake SVG Line for desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-12 transform -translate-x-1/2 pointer-events-none">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 1000" preserveAspectRatio="none">
            {/* The Dim Background Path */}
            <path 
              d="M 50,0 Q 35,50 50,100 T 50,200 T 50,300 T 50,400 T 50,500 T 50,600 T 50,700 T 50,800 T 50,900 T 50,1000" 
              fill="none" 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="2" 
            />
            
            {/* The Trail */}
            <motion.path 
              d="M 50,0 Q 35,50 50,100 T 50,200 T 50,300 T 50,400 T 50,500 T 50,600 T 50,700 T 50,800 T 50,900 T 50,1000" 
              fill="none" 
              stroke="url(#timeline-gradient)" 
              strokeWidth="4" 
              style={{ pathLength: scrollYProgress }}
              className="drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]"
            />

            {/* The Snake Head (Energy Pulse) */}
            <motion.path 
              d="M 50,0 Q 35,50 50,100 T 50,200 T 50,300 T 50,400 T 50,500 T 50,600 T 50,700 T 50,800 T 50,900 T 50,1000" 
              fill="none" 
              stroke="#00f3ff" 
              strokeWidth="6" 
              style={{ 
                pathLength: 0.05, 
                pathOffset: scrollYProgress,
                opacity: useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0])
              }}
              className="drop-shadow-[0_0_15px_rgba(0,243,255,1)]"
            />
            
            <defs>
              <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00f3ff" />
                <stop offset="50%" stopColor="#b026ff" />
                <stop offset="100%" stopColor="#00f3ff" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="space-y-12">
          {timelineItems.map((item, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: 15, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ type: "spring", stiffness: 60, damping: 20, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} items-center w-full pl-8 md:pl-0`}
              >
                {/* Node */}
                <TimelineNode />
                
                {/* Content Side */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                  <TiltCard>
                    <div className="glass-card animated-border rounded-2xl relative overflow-hidden group transition-all transform-gpu will-change-transform duration-500 bg-[#0a0a0c]/80 z-20 flex flex-col hover:shadow-[0_0_30px_rgba(0,243,255,0.15)]">
                      
                      {/* Image Wrapper at the top of the card */}
                      {item.images && (
                        <div 
                          className="relative w-full h-48 mb-4 border-b border-white/5 overflow-hidden group/image flex-shrink-0 cursor-pointer"
                          onClick={() => openLightbox(item.images, 0, item.title)}
                        >
                          <FallbackImage 
                            src={item.images[0]} 
                            alt={item.title} 
                            fill 
                            className="object-cover opacity-80 group-hover/image:opacity-100 group-hover/image:scale-105 transition-all duration-500" 
                          />
                          
                          {/* View Gallery Overlay */}
                          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 opacity-0 group-hover/image:opacity-100 transition-opacity backdrop-blur-sm">
                            <div className="flex flex-col items-center gap-2 bg-white/10 px-3 py-2 rounded-xl border border-white/20 text-white font-medium text-xs hover:bg-white/20 transition-colors text-center">
                              <Images className="w-4 h-4" />
                              View Gallery
                              <span className="text-[10px] text-gray-300">({item.images.length} items)</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="p-6 pt-2 relative z-20 flex flex-col flex-1">
                        {/* Hover Glow */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-neon-cyan/10 rounded-full blur-[50px] -z-10 group-hover:scale-150 transition-transform duration-500`} />
                      
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`p-2 rounded-lg bg-background border border-neon-cyan/30 text-neon-cyan`}>
                            <Briefcase className="w-5 h-5" />
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            {item.year}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                        {'company' in item && item.company && <h4 className="text-neon-cyan font-medium mb-3">{item.company as string}</h4>}
                        
                        <p className="text-gray-300 text-sm leading-relaxed mb-0">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
