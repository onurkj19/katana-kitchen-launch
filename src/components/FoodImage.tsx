import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface FoodImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function FoodImage({ src, alt, className = "" }: FoodImageProps) {
  const [errored, setErrored] = useState(false);
  const isPlaceholder = !src || src === "/placeholder.svg" || errored;

  if (isPlaceholder) {
    return (
      <div className={`aspect-[4/3] bg-gradient-to-br from-secondary to-background flex flex-col items-center justify-center border-b border-border ${className}`}>
        <ImageIcon className="h-10 w-10 text-muted-foreground/30 mb-2" />
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50 px-4 text-center">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`aspect-[4/3] overflow-hidden border-b border-border ${className}`}>
      <img
        src={src}
        alt={alt}
        onError={() => setErrored(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
}
