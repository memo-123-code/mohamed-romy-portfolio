"use client";

import { motion, Variants } from "framer-motion";
import { GraduationCap, Award, BookOpen, User } from "lucide-react";
import { portfolioData } from "@/lib/data";

export default function AboutEducation() {
  const { education } = portfolioData;

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="about" className="w-full max-w-6xl mx-auto py-24 px-6 relative">
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.15 }}
        variants={fadeIn}
        className="flex items-center gap-4 mb-12"
      >
        <div className="p-3 rounded-2xl glass text-neon-cyan">
          <User className="w-6 h-6" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">About & Education</h2>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-border-card to-transparent ml-4" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false }}
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }
          }}
          className="glass-card animated-border rounded-3xl p-8 relative overflow-hidden group z-10"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-[80px] -z-10 group-hover:bg-neon-cyan/20 transition-colors duration-500" />
          
          <div className="relative z-20">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-neon-cyan" />
              <div className="overflow-hidden inline-block py-1">
                <motion.span
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                  viewport={{ once: false }}
                  className="inline-block"
                >
                  Engineering Focus
                </motion.span>
              </div>
            </h3>
            <p className="text-gray-300 leading-relaxed space-y-4">
              <span className="block mb-4">
                I specialize in bridging the gap between hardware and software. Through <strong>Hardware-Software Co-design</strong>, I build systems that don't just exist in the digital realm but interact physically with the real world.
              </span>
              <span className="block">
                My expertise spans across robust mechanical design in SOLIDWORKS and architecting distributed automation ecosystems. From conceptualizing a mechanical part to deploying LLM-powered analytics backends, I thrive at the intersection of disciplines.
              </span>
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false }}
          variants={{
            hidden: { opacity: 0, x: 30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.4 } }
          }}
          className="glass-card animated-border rounded-3xl p-8 relative overflow-hidden group z-10"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-neon-purple/5 rounded-full blur-[80px] -z-10 group-hover:bg-neon-purple/20 transition-colors duration-500" />
          
          <div className="relative z-20">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-neon-purple" />
              <div className="overflow-hidden inline-block py-1">
                <motion.span
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                  viewport={{ once: false }}
                  className="inline-block"
                >
                  Academic Excellence
                </motion.span>
              </div>
            </h3>
            
            <div className="space-y-6">
              <div className="border-l-2 border-neon-purple/30 pl-6 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0a0a0c] border-2 border-neon-purple" />
                <h4 className="text-xl font-medium text-white">{education.degree}</h4>
                <p className="text-neon-cyan font-medium mt-1">{education.university}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">{education.duration}</span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-white bg-neon-purple/20 px-3 py-1 rounded-full">
                    <Award className="w-4 h-4 text-neon-purple" />
                    GPA: {education.gpa}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
