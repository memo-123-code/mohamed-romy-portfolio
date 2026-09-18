"use client";

import { useEffect } from "react";
import { motion, Variants, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Download, Mail, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import FallbackImage from "@/components/FallbackImage";
import { portfolioData } from "@/lib/data";

import NeuralBackground from "@/components/canvas/NeuralBackground";
import AboutEducation from "@/components/AboutEducation";
import SkillsBento from "@/components/SkillsBento";
import ExperienceProjects from "@/components/ExperienceProjects";
import FilterableGrid from "@/components/FilterableGrid";
import CertificationsGallery from "@/components/CertificationsGallery";
import WorkshopsGallery from "@/components/WorkshopsGallery";
import CircuitLine from "@/components/CircuitLine";
import MagneticElement from "@/components/MagneticElement";
import { useLightbox } from "@/components/LightboxProvider";

export default function Home() {
  const { personal } = portfolioData;
  const { openLightbox } = useLightbox();

  // 3D Profile Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // Dynamic Page Title
    const originalTitle = document.title;
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        document.title = "👀 Missing you already! | Mohamed Romy";
      } else {
        document.title = "Mohamed Romy | Portfolio";
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Mouse Tracking for Profile
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const rotateX = useTransform(mouseY, [-1, 1], [25, -25]);
  const rotateY = useTransform(mouseX, [-1, 1], [-25, 25]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 20, mass: 1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 20 },
    },
  };

  return (
    <div className="w-full flex flex-col relative z-0">
      <NeuralBackground />
      <CircuitLine />

      {/* Dynamic Background Mesh (Optimized for performance) */}
      <motion.div 
        className="fixed inset-0 z-[-2] pointer-events-none mix-blend-screen transform-gpu will-change-transform"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(0, 243, 255, 0.05) 0%, transparent 60%), radial-gradient(circle at 100% 100%, rgba(176, 38, 255, 0.05) 0%, transparent 50%)"
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Grid Pattern overlay for depth */}
      <div className="fixed inset-0 z-[-1] bg-grid-pattern opacity-[0.1] pointer-events-none" />

      <main className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-32 md:pt-32 z-10">
        <motion.div
          className="w-full max-w-5xl mx-auto flex flex-col items-center text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Image with Spinning & Pulsing Glow */}
          <motion.div 
            variants={itemVariants} 
            whileTap={{ scale: 0.95 }}
            onClick={() => openLightbox(["/images/profile.jpg"], 0, "Mohamed Ahmed Romy")}
            onContextMenu={(e) => e.preventDefault()}
            className="relative w-32 h-32 md:w-40 md:h-40 mb-4 group perspective-1000 cursor-pointer"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <motion.div 
              animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-3 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple blur-[20px] -z-10" 
            />
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple opacity-70 blur-xl group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-spin-slow" style={{ animationDuration: '8s' }} />
            <div className="relative w-full h-full rounded-full border-2 border-white/20 overflow-hidden bg-[#050505]">
              <FallbackImage 
                src="/images/profile.jpg" 
                alt="Profile Picture" 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Availability Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full border border-neon-cyan/30">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-cyan"></span>
            </span>
            <span className="text-sm font-medium tracking-wide text-gray-300">Available for Opportunities</span>
          </motion.div>

          {/* Ambient Glow Orb */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-[600px] md:h-[600px] bg-gradient-to-tr from-neon-cyan/20 to-neon-purple/20 rounded-full blur-[100px] pointer-events-none -z-10"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-[clamp(1.5rem,8.5vw,4.5rem)] md:text-7xl font-bold tracking-tight overflow-hidden leading-tight whitespace-nowrap">
              <motion.span 
                className="text-transparent bg-clip-text text-gradient inline-block"
                variants={textVariants}
              >
                Mohamed
              </motion.span>{" "}
              <motion.span 
                className="text-transparent bg-clip-text text-gradient inline-block"
                variants={textVariants}
              >
                Ahmed
              </motion.span>{" "}
              <motion.span 
                className="text-transparent bg-clip-text text-gradient inline-block"
                variants={textVariants}
              >
                Romy
              </motion.span>
            </h1>
            <motion.h2 variants={textVariants} className="text-xl md:text-3xl font-medium text-gray-300">
              {personal.title}
            </motion.h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed"
          >
            {personal.summary}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 pt-6 z-20 relative">
            <MagneticElement>
              <a
                href="#work"
                className="group relative px-8 py-3 rounded-full bg-white text-black font-semibold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.4)] block"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </MagneticElement>
            
            <MagneticElement>
              <a
                href="/Mohamed_Romy_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Mohamed_Romy_CV.pdf"
                className="conic-button px-8 py-3 rounded-full text-white font-medium flex items-center gap-2 group shadow-[0_0_20px_rgba(176,38,255,0.2)] active:scale-95 transition-transform block"
              >
                <Download className="w-4 h-4 relative z-10 group-hover:-translate-y-1 transition-transform" />
                <span className="relative z-10">Download CV</span>
              </a>
            </MagneticElement>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4 pt-12 text-gray-400 z-20 relative">
            <MagneticElement>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan transition-colors p-3 block">
                <FaGithub className="w-6 h-6" />
              </a>
            </MagneticElement>
            
            <MagneticElement>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan transition-colors p-3 block">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </MagneticElement>
            
            <MagneticElement>
              <a href={`mailto:${personal.email}`} className="hover:text-neon-cyan transition-colors p-3 block">
                <Mail className="w-6 h-6" />
              </a>
            </MagneticElement>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-5 h-8 border border-gray-500 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-1 bg-gray-500 rounded-full" />
          </motion.div>
        </motion.div>
      </main>

      <AboutEducation />
      <SkillsBento />
      <FilterableGrid />
      <ExperienceProjects />
      <CertificationsGallery />
      <WorkshopsGallery />
      
      {/* Footer CTA */}
      <section className="w-full max-w-4xl mx-auto py-24 px-6 text-center z-10 relative">
        <div className="glass-card animated-border rounded-3xl p-12 relative overflow-hidden bg-[#050505]/90 border border-neon-cyan/20 shadow-[0_0_40px_rgba(0,243,255,0.1)]">
          <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/10 to-transparent pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">Ready to build something amazing?</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto relative z-10">
            Looking for a Mechatronics & Software expert to bring your next big idea to life? Let's collaborate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <MagneticElement>
              <a 
                href="mailto:romememo541@gmail.com"
                className="conic-button px-8 py-4 rounded-full text-white font-medium shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_40px_rgba(0,243,255,0.5)] transition-all flex items-center justify-center gap-2 block"
              >
                <Mail className="w-5 h-5" />
                Get In Touch
              </a>
            </MagneticElement>
            <MagneticElement>
              <a 
                href="tel:+201030663478"
                className="px-8 py-4 rounded-full border border-white/10 hover:border-white/30 text-white transition-colors bg-white/5 flex items-center justify-center gap-2 block"
              >
                <Phone className="w-5 h-5" />
                01030663478
              </a>
            </MagneticElement>
          </div>
        </div>
      </section>

      {/* Footer Spacer for Floating Dock */}
      <div className="h-24 w-full" />
    </div>
  );
}
