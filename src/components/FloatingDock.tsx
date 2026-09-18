"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Home, User, Briefcase, Award, Menu, X } from "lucide-react";

export default function FloatingDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("#");
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() || 0;
    if (current > previous && current > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      // Offset by 1/3 of the window height so it triggers when section is in upper third
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "#";

      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop;
        const height = (section as HTMLElement).offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          currentSection = `#${section.id}`;
        }
      });

      // Override if near the very top of the page
      if (window.scrollY < 100) {
        currentSection = "#";
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "#", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Projects", href: "#work", icon: Briefcase },
    { name: "Certifications", href: "#certifications", icon: Award },
  ];

  return (
    <>
      {/* Desktop Dock */}
      <motion.div 
        initial={{ y: 100, opacity: 0, x: "-50%" }}
        animate={{ 
          y: isVisible ? 0 : 150, 
          opacity: isVisible ? 1 : 0, 
          x: "-50%" 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
        className="hidden md:flex fixed bottom-8 left-1/2 z-50 items-center gap-2 px-4 py-3 rounded-full glass-card border border-white/10 shadow-[0_10px_40px_rgba(0,243,255,0.1)] backdrop-blur-2xl bg-[#050505]/60"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-neon-cyan to-neon-purple p-0.5 ml-1 mr-2">
          <div className="w-full h-full rounded-full bg-[#0a0a0c] flex items-center justify-center text-white font-bold tracking-tighter">
            MR
          </div>
        </div>
        
        <div className="w-[1px] h-8 bg-white/10 mr-2" />
        
        {links.map((link) => {
          const isActive = activeSection === link.href;
          
          return (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(link.href)}
              className="group relative p-3 rounded-full transition-colors flex items-center justify-center"
            >
              {isActive && (
                <motion.div 
                  layoutId="activeDockPill"
                  className="absolute inset-0 bg-white/10 rounded-full -z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <link.icon className={`w-5 h-5 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.8)] ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-neon-cyan'}`} />
              <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-md bg-[#111] backdrop-blur-md text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none shadow-xl">
                {link.name}
              </span>
            </motion.a>
          );
        })}
      </motion.div>

      {/* Mobile Floating Hamburger */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.85 }}
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full glass-card border border-neon-cyan/40 text-white shadow-[0_0_20px_rgba(0,243,255,0.4)] active:scale-95 transition-transform"
      >
        <Menu className="w-5 h-5" />
      </motion.button>

      {/* Premium Glassmorphic Side Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
            />
            
            {/* Side Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="md:hidden fixed top-0 right-0 bottom-0 z-[100] w-64 bg-[#050505]/80 backdrop-blur-3xl border-l border-white/10 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] flex flex-col px-6 py-20"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full glass hover:bg-white/10 transition-colors text-white active:scale-95"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex flex-col gap-8 mt-8">
                {links.map((link, i) => {
                  const isActive = activeSection === link.href;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className={`text-2xl font-bold flex items-center gap-4 transition-all active:scale-95 ${isActive ? 'text-neon-cyan drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]' : 'text-gray-300 hover:text-white'}`}
                    >
                      <link.icon className="w-5 h-5" />
                      {link.name}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
