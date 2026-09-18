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
      
      {/* Pagination & Arrows Container */}
      <div className="flex items-center justify-between px-6 mt-4">
        {/* Left Arrow */}
        <button 
          onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          className={`p-2 rounded-full glass bg-black/80 text-white transition-opacity ${activeIndex === 0 ? 'opacity-30' : 'opacity-100 hover:bg-black'}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2">
          {children.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-neon-cyan w-6 shadow-[0_0_8px_rgba(0,243,255,0.8)]' : 'bg-gray-600 w-2 hover:bg-gray-400'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scrollTo(Math.min(children.length - 1, activeIndex + 1))}
          disabled={activeIndex === children.length - 1}
          className={`p-2 rounded-full glass bg-black/80 text-white transition-opacity ${activeIndex === children.length - 1 ? 'opacity-30' : 'opacity-100 hover:bg-black'}`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
