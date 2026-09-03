import React, { useState, useEffect } from 'react';

const EventGallery = () => {
  const images = [
    '/gallery-flash-1.jpg',
    '/gallery-flash-2.jpg',
    '/gallery-flash-3.jpg',
    '/gallery-flash-4.jpg',
    '/gallery-flash-5.jpg',
    '/action-6.jpg',
    '/action-7.jpg',
    '/action-8.jpg',
    '/action-9.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="py-24 bg-[#e8e2d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#2d3a2a] mb-4 font-serif">In Action</h2>
          <p className="text-lg text-[#5a6b57] max-w-3xl mx-auto">
            Glimpses of our recent community engagements, events, and fieldwork.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-[#f5f0e8]">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Event Gallery ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              onContextMenu={(e) => e.preventDefault()}
              draggable="false"
            />
          ))}

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventGallery;
