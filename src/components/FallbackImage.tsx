"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { ImageOff } from "lucide-react";

interface FallbackImageProps extends ImageProps {
  fallbackText?: string;
}

export default function FallbackImage({ src, alt, fallbackText, className, ...rest }: FallbackImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#111] to-[#050505] text-gray-500 ${className}`}>
        <ImageOff className="w-8 h-8 mb-2 opacity-30" />
        <span className="text-xs font-mono opacity-50 px-2 text-center truncate w-full">
          {fallbackText || alt || "Image unavailable"}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...rest}
    />
  );
}
