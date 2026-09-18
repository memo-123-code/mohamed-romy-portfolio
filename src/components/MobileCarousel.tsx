"use client";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MobileCarousel({ children }: { children: React.ReactNode[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.clientWidth;
    // Calculate which item is mostly in view
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({ left: width * index, behavior: "smooth" });
  };

  return (
    <div className="relative w-full sm:hidden pt-4 pb-8">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 px-2 pb-4 relative z-20"
        style={{ scrollBehavior: 'smooth' }}
      >
        {children.map((child, idx) => (
          <div key={idx} className="snap-center shrink-0 w-full h-full">
            {child}
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
        disabled={activeIndex === 0}
        className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full glass bg-black/80 text-white z-30 transition-opacity ${activeIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-black'}`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={() => scrollTo(Math.min(children.length - 1, activeIndex + 1))}
        disabled={activeIndex === children.length - 1}
        className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full glass bg-black/80 text-white z-30 transition-opacity ${activeIndex === children.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-black'}`}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {children.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-neon-cyan w-6 shadow-[0_0_8px_rgba(0,243,255,0.8)]' : 'bg-gray-600 w-2 hover:bg-gray-400'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
