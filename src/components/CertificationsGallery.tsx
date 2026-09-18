"use client";

import { motion, Variants } from "framer-motion";
import { BadgeCheck, Images } from "lucide-react";
import FallbackImage from "./FallbackImage";
import { portfolioData } from "@/lib/data";
import TiltCard from "./TiltCard";
import { useLightbox } from "./LightboxProvider";

export default function CertificationsGallery() {
  const { certifications } = portfolioData;
  const { openLightbox } = useLightbox();

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 50, rotateX: 15 },
    visible: { opacity: 1, scale: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 60, damping: 20 } }
  };

  return (
    <section id="certifications" className="w-full max-w-6xl mx-auto py-16 md:py-24 px-6 mb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="flex flex-col items-center text-center mb-16"
      >
        <div className="p-3 rounded-full glass mb-4">
          <BadgeCheck className="w-8 h-8 text-neon-cyan" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <div className="overflow-hidden inline-block py-2">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              viewport={{ once: false }}
              className="inline-block"
            >
              Licenses & Certifications
            </motion.span>
          </div>
        </h2>
        <p className="text-gray-400 max-w-xl">Verified credentials demonstrating expertise across software development and mechanical engineering domains.</p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 pb-8 sm:pb-0"
      >
        {certifications.map((cert, index) => (
          <motion.div 
            key={index}
            variants={item}
            className="w-full h-full"
          >
            <TiltCard className="h-full">
              <div className="glass-card animated-border rounded-2xl overflow-hidden group transition-all transform-gpu will-change-transform duration-500 h-full flex flex-col relative z-10 bg-black/60 backdrop-blur-2xl sm:bg-[#0a0a0c]/80 sm:backdrop-blur-none active:scale-95 hover:shadow-[0_0_30px_rgba(0,243,255,0.15)]">
                {/* Image Section */}
                <div className="w-full h-40 bg-black/40 border-b border-white/5 relative overflow-hidden flex-shrink-0 group/image">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] to-transparent z-10 pointer-events-none" />
                  
                  <div className="w-full h-full relative z-0">
                    <FallbackImage 
                      src={cert.images[0]} 
                      alt={cert.name} 
                      fill 
                      className="object-cover opacity-70 group-hover/image:opacity-100 group-hover/image:scale-110 transition-all duration-700" 
                    />
                  </div>

                  {/* View Gallery Overlay */}
                  <div 
                    className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 opacity-0 group-hover/image:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm"
                    onClick={() => openLightbox(cert.images, 0, cert.name)}
                  >
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/20 transition-colors">
                      <Images className="w-4 h-4" />
                      View Gallery ({cert.images.length})
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col relative z-20">
                  <h3 className="font-bold text-white leading-snug mb-2 group-hover:text-neon-cyan transition-colors line-clamp-2">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-auto">
                    {cert.issuer}
                  </p>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
