import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import heroImage from '../assets/hero.png';
import heroVideo from '../assets/hero-video.mp4';

export default function Hero({ onExplore }) {
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    // GSAP text reveal
    const tl = gsap.timeline();
    tl.fromTo('.hero-subtitle', 
      { opacity: 0, y: 15 },
      { opacity: 0.6, y: 0, duration: 1, ease: 'power3.out', delay: 0.4 }
    )
    .fromTo('.hero-title-line', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 1.2, ease: 'power4.out' },
      '-=0.7'
    )
    .fromTo('.hero-description', 
      { opacity: 0, y: 20 },
      { opacity: 0.7, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo('.hero-actions', 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );
  }, []);

  return (
    <section 
      id="hero-section" 
      className="relative min-h-[80vh] sm:min-h-[85vh] lg:min-h-[88vh] flex items-center justify-between px-6 md:px-12 lg:px-24 py-12 sm:py-16 md:py-20 select-none overflow-hidden"
    >
      {/* Background: image always visible underneath, video fades in on top once truly playing */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setIsVideoReady(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isVideoReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      {/* Background vignette with deep contrast overlay for video text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/10 pointer-events-none z-[1]" />

      {/* Main Text Content */}
      <div className="max-w-4xl z-10 text-white relative">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] leading-[1.05] select-none mb-6 sm:mb-8 text-shadow-premium">
          <div className="overflow-hidden py-1 sm:py-2">
            <span className="hero-title-line block font-sans font-semibold uppercase tracking-[0.05em]">FRAMES FURNISHING</span>
          </div>
          <div className="overflow-hidden py-1 sm:py-2">
            <span className="hero-title-line block font-serif font-extralight italic text-beige-dark">Luxurious Furnishing</span>
          </div>
        </h1>
        
        <p className="hero-description text-sm sm:text-base font-light tracking-wide text-beige-light/80 max-w-lg leading-relaxed mb-8 sm:mb-12 text-shadow-premium">
          Frames Furnishing is a home-grown furniture destination based in Modasa, Gujarat, India, offering thoughtfully crafted pieces that bring timeless design and everyday comfort into every home.
        </p>

        <div className="hero-actions flex flex-wrap items-center gap-4 sm:gap-6">
          <button 
            onClick={onExplore}
            className="group px-6 sm:px-8 py-3 sm:py-4 bg-walnut text-white text-xs tracking-[0.2em] uppercase font-light transition-all duration-500 flex items-center space-x-3 border border-walnut hover:bg-transparent hover:text-white"
          >
            <span>Shop</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Decorative vertical coordinates overlay typical of museum collections */}
      <div className="absolute right-8 bottom-8 text-[9px] tracking-[0.3em] font-light text-white/40 writing-vertical hidden md:block select-none z-10">
        LAT. 43.7844° N / LONG. 10.1389° E
      </div>
    </section>
  );
}