"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fast counter from 0 to 100
    const duration = 2500; // 2.5 seconds total
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="hidden md:flex fixed inset-0 z-[99999] bg-[#020202] items-center justify-center overflow-hidden"
        >
          <motion.div 
            className="hidden md:block text-4xl md:text-6xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-white to-gray-500"
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            MOHAMED ROMY
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
