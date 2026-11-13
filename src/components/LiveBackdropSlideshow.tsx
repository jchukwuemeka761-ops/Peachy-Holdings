import React, { useEffect, useState } from 'react';

interface LiveBackdropSlideshowProps {
  images: string[];
  intervalMs?: number;
  imageClassName?: string;
  overlayClassName?: string;
  showIndicators?: boolean;
}

export const LiveBackdropSlideshow: React.FC<LiveBackdropSlideshowProps> = ({
  images,
  intervalMs = 4200,
  imageClassName = 'opacity-70',
  overlayClassName = 'bg-gradient-to-b from-black/60 via-black/45 to-[#090909]/85',
  showIndicators = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [images.length, intervalMs]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {images.map((src, idx) => {
        const isActive = idx === activeIndex;
        return (
          <img
            key={`${src}-${idx}`}
            src={src}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-out ${imageClassName} ${
              isActive ? 'opacity-100 scale-105' : '!opacity-0 scale-100'
            }`}
          />
        );
      })}
      <div className={`absolute inset-0 ${overlayClassName}`} />
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-3 right-4 z-10 flex items-center gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-6 bg-[#C8A45D]' : 'w-2 bg-white/35'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
