"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fast counter from 0 to 100
    const duration = 1500; // 1.5 seconds total
    
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
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-[#020202]/95 backdrop-blur-2xl flex flex-col items-center justify-center overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-28 h-28 md:w-40 md:h-40 mb-6 rounded-full overflow-hidden border border-white/20 shadow-[0_0_40px_rgba(0,243,255,0.2)]"
          >
            <img src="/images/profile.jpg" alt="Mohamed Romy" className="w-full h-full object-cover" />
          </motion.div>
          
          <motion.div 
            className="text-2xl md:text-5xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            MOHAMED ROMY
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
