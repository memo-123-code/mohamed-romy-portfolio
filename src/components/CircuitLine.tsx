"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function CircuitLine() {
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-4 md:left-12 bottom-0 w-24 z-[-1] pointer-events-none hidden sm:block">
      <svg 
        viewBox="0 0 100 1000" 
        preserveAspectRatio="xMidYMin slice" 
        className="w-full h-full opacity-30"
      >
        <path
          d="M 50,0 L 50,200 L 80,230 L 80,400 L 20,460 L 20,600 L 50,630 L 50,800 L 90,840 L 90,1000"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        />
        <motion.path
          d="M 50,0 L 50,200 L 80,230 L 80,400 L 20,460 L 20,600 L 50,630 L 50,800 L 90,840 L 90,1000"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="4"
          style={{ pathLength }}
          className="drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00f3ff" />
            <stop offset="100%" stopColor="#b026ff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
