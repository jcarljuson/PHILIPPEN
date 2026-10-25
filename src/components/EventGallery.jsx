import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const EventGallery = () => {
  const images = [
    { src: '/gallery-flash-1.jpg', alt: 'Community consultation with tribal leaders' },
    { src: '/gallery-flash-2.jpg', alt: 'Field assembly and communal planning' },
    { src: '/gallery-flash-3.jpg', alt: 'Distribution of agricultural inputs and supplies' },
    { src: '/gallery-flash-4.jpg', alt: 'Cooperative members inspecting heirloom crops' },
    { src: '/gallery-flash-5.jpg', alt: 'On-site agricultural training workshop' },
    { src: '/action-6.jpg', alt: 'Field preparation on ancestral farmland' },
    { src: '/action-7.jpg', alt: 'Demonstration of mechanized cultivation tools' },
    { src: '/action-8.jpg', alt: 'Cooperative harvest and seed sorting' },
    { src: '/action-9.jpg', alt: 'Community unity gathering in the field' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback((e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToIndex = (index, e) => {
    if (e) e.stopPropagation();
    setCurrentIndex(index);
  };

  // Auto-play slideshow timer with smooth fade
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      goToNext();
    }, 4000); // 4 seconds per slide

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [goToNext, isPaused, currentIndex]);

  return (
    <section id="action" className="py-20 sm:py-24 bg-[#e8e2d5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2d3a2a] mb-3 font-serif">In Action</h2>
          <p className="text-base sm:text-lg text-[#5a6b57] max-w-2xl mx-auto">
            Glimpses of our recent community engagements, mechanization turnovers, and fieldwork on ancestral lands.
          </p>
        </div>

        {/* Main Slideshow Container */}
        <div
          className="relative max-w-5xl mx-auto aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-[#f5f0e8] group select-none cursor-pointer"
          onClick={goToNext}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          aria-label="Click to view next photo"
        >
          {/* Fading Slides */}
          {images.map((item, index) => (
            <img
              key={index}
              src={item.src}
              alt={item.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              onContextMenu={(e) => e.preventDefault()}
              draggable="false"
            />
          ))}

          {/* Slide Counter Badge */}
          <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-xs font-medium tracking-wider">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={goToPrev}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/35 hover:bg-black/65 text-white/90 hover:text-white backdrop-blur-sm transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-105 active:scale-95"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/35 hover:bg-black/65 text-white/90 hover:text-white backdrop-blur-sm transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-105 active:scale-95"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Click to Next Hint (desktop hover) */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-black/30 backdrop-blur-xs text-white/70 text-[11px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
            Click photo or arrows to advance
          </div>

          {/* Clickable Dots Indicator */}
          <div
            className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 sm:space-x-2 z-20 px-3 py-1.5 rounded-full bg-black/25 backdrop-blur-xs"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => goToIndex(index, e)}
                className="p-1 sm:p-1.5 group/dot focus:outline-none"
                aria-label={`Go to photo ${index + 1}`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-6 sm:w-8 h-2 sm:h-2.5 bg-white shadow-sm'
                      : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 group-hover/dot:bg-white/80'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventGallery;
