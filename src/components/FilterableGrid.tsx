"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FallbackImage from "./FallbackImage";
import { portfolioData } from "@/lib/data";
import TiltCard from "./TiltCard";
import { ExternalLink, BadgeCheck, FolderGit2, Images } from "lucide-react";
import { useLightbox } from "./LightboxProvider";

type Tab = "All" | "Web Dev" | "Mechanical" | "Automation";

export default function FilterableGrid() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const { openLightbox } = useLightbox();
  const { projects } = portfolioData;

  // Add categories based on keywords
  const allItems = [
    ...projects.map(p => ({
      ...p,
      type: "project",
      category: p.title.includes("Django") || p.description.includes("Django") ? "Web Dev" : "Automation"
    }))
  ];

  const tabs: Tab[] = ["All", "Web Dev", "Mechanical", "Automation"];

  const filteredItems = allItems.filter(
    (item) => activeTab === "All" || item.category === activeTab
  );

  return (
    <section id="work" className="w-full max-w-7xl mx-auto py-24 px-6 relative z-10">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text text-gradient">
          <div className="overflow-hidden inline-block py-2">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              viewport={{ once: false }}
              className="inline-block"
            >
              Selected Work
            </motion.span>
          </div>
        </h2>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-2 glass-card rounded-full border border-white/5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 border border-white/20 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {filteredItems.map((item, index) => {
            const isFeaturedProject = item.type === "project";
            
            return (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.15 }}
                className={`${isFeaturedProject ? "md:col-span-2 lg:col-span-2 row-span-2" : "col-span-1"}`}
              >
                <TiltCard className="h-full">
                  <div className="glass-card animated-border rounded-3xl p-1 relative overflow-hidden group transition-all duration-500 h-full flex flex-col bg-[#050505]/90 hover:shadow-[0_0_30px_rgba(0,243,255,0.15)]" style={{ transformStyle: "preserve-3d" }}>
                    
                    {/* Image Placeholder */}
                    <div className={`w-full bg-black/60 relative overflow-hidden rounded-t-3xl transition-transform duration-500 group-hover:translate-z-20 ${isFeaturedProject ? "h-64" : "h-40"}`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
                      
                      <div className="w-full h-full relative z-0">
                        <FallbackImage 
                          src={item.images[0]} 
                          alt={item.title} 
                          fill 
                          className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                        />
                      </div>

                      <div 
                        className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm"
                        onClick={() => openLightbox(item.images, 0, item.title)}
                      >
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/20 transition-colors">
                          <Images className="w-4 h-4" />
                          View Gallery ({item.images.length})
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col relative z-20" style={{ transformStyle: "preserve-3d" }}>
                      <div className="flex items-center justify-between mb-4 transition-transform duration-500 group-hover:translate-z-40">
                        <span className="text-xs font-semibold uppercase tracking-wider text-neon-cyan bg-neon-cyan/10 px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                        {item.type === "project" && 'link' in item && typeof item.link === 'string' && (
                          <a href={`https://${item.link}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                      
                      <h3 className="font-bold text-xl text-white leading-snug mb-3 group-hover:text-neon-cyan transition-transform duration-500 group-hover:translate-z-50">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-auto leading-relaxed line-clamp-3 transition-transform duration-500 group-hover:translate-z-20">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
