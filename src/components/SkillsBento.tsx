"use client";

import { motion, Variants } from "framer-motion";
import { Cpu, Wrench, Code2, BrainCircuit } from "lucide-react";
import { portfolioData } from "@/lib/data";
import TiltCard from "./TiltCard";

const iconMap = {
  mechanical: <Wrench className="w-8 h-8 text-orange-400" />,
  software: <Code2 className="w-8 h-8 text-blue-400" />,
  automation: <Cpu className="w-8 h-8 text-green-400" />,
  ai: <BrainCircuit className="w-8 h-8 text-purple-400" />
};

const titleMap = {
  mechanical: "Mechanical Design",
  software: "Software Engineering",
  automation: "Automation & Control",
  ai: "Artificial Intelligence"
};

const colorMap = {
  mechanical: "from-orange-500/20 to-transparent",
  software: "from-blue-500/20 to-transparent",
  automation: "from-green-500/20 to-transparent",
  ai: "from-purple-500/20 to-transparent"
};

const shadowMap = {
  mechanical: "hover:shadow-[0_0_30px_rgba(251,146,60,0.15)]",
  software: "hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]",
  automation: "hover:shadow-[0_0_30px_rgba(74,222,128,0.15)]",
  ai: "hover:shadow-[0_0_30px_rgba(192,132,252,0.15)]"
};

export default function SkillsBento() {
  const { skills } = portfolioData;
  const categories = Object.keys(skills) as Array<keyof typeof skills>;

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariant: Variants = {
    hidden: (index: number) => {
      const isLeft = index % 2 === 0;
      const isTop = index < 2;
      return { 
        opacity: 0, 
        x: isLeft ? -60 : 60, 
        y: isTop ? -60 : 60, 
        scale: 0.9 
      };
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section id="skills" className="w-full max-w-6xl mx-auto py-16 md:py-24 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="text-center mb-16"
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
              Technical Arsenal
            </motion.span>
          </div>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A comprehensive toolkit spanning mechanical design, software engineering, and intelligent automation.
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {categories.map((category, index) => (
          <motion.div 
            key={category}
            custom={index}
            variants={cardVariant}
            className={`h-full ${
              index === 0 || index === 3 ? "md:col-span-2 lg:col-span-1" : "md:col-span-1"
            } ${index === 1 || index === 2 ? "lg:col-span-2 lg:row-span-2" : ""}`}
          >
            <TiltCard className="h-full">
              <div className={`glass-card animated-border rounded-3xl p-6 relative overflow-hidden group transition-all duration-300 ease-out hover:-translate-y-2 h-full bg-[#0a0a0c]/80 z-10 ${shadowMap[category]}`} style={{ transformStyle: "preserve-3d" }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[category]} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative z-20 h-full flex flex-col" style={{ transformStyle: "preserve-3d" }}>
                  <div className="mb-6 bg-black/40 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5 transition-transform duration-500 group-hover:translate-z-40">
                    {iconMap[category]}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 transition-transform duration-500 group-hover:translate-z-50">{titleMap[category]}</h3>
                  
                  <ul className="space-y-3 mt-auto transition-transform duration-500 group-hover:translate-z-30">
                    {skills[category].map((skill, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-cyan shrink-0" />
                        <span className="text-sm font-medium">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
