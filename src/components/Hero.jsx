import React, { useState, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function Hero({ onExplore }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / 30; // dampening factor
      const y = (clientY - window.innerHeight / 2) / 30;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
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
    )
    .fromTo('.hero-floating', 
      { opacity: 0, scale: 0.9, rotate: -5 },
      { opacity: 1, scale: 1, rotate: 0, duration: 1.5, ease: 'power3.out' },
      '-=1.2'
    );

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="hero-section" 
      className="relative min-h-screen flex items-center justify-between px-6 md:px-12 lg:px-24 py-20 select-none overflow-hidden"
    >
      {/* Background vignette with deep contrast overlay for video text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/10 pointer-events-none" />

      {/* Main Text Content */}
      <div className="max-w-4xl z-10 text-white relative">
        <span className="hero-subtitle block text-[10px] tracking-[0.6em] uppercase text-stone-light/80 mb-6 font-semibold">
          FRAMES FURNISHING INTERIORS
        </span>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] select-none mb-8 text-shadow-premium">
          <div className="overflow-hidden py-2">
            <span className="hero-title-line block font-sans font-semibold uppercase tracking-[0.05em]">ARCHITECTURAL PURITY</span>
          </div>
          <div className="overflow-hidden py-2">
            <span className="hero-title-line block font-serif font-extralight italic text-beige-dark">Sensorial Luxury</span>
          </div>
        </h1>
        
        <p className="hero-description text-sm sm:text-base font-light tracking-wide text-beige-light/80 max-w-lg leading-relaxed mb-12 text-shadow-premium">
          Timeless furniture carved from marble and solid American walnut, designed to interact with light and scale. Made in Carrara and Copenhagen.
        </p>

        <div className="hero-actions flex flex-wrap items-center gap-6">
          <button 
            onClick={onExplore}
            className="group px-8 py-4 bg-walnut text-white text-xs tracking-[0.2em] uppercase font-light transition-all duration-500 flex items-center space-x-3 border border-walnut hover:bg-transparent hover:text-white"
          >
            <span>Shop The Curation</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
          
          <button 
            onClick={() => alert("Launching virtual showroom walkthrough...")}
            className="group px-8 py-4 bg-white/5 border border-white/10 text-white text-xs tracking-[0.2em] uppercase font-light hover:bg-white/10 transition-colors flex items-center space-x-3 backdrop-blur-xs"
          >
            <Play className="w-3 h-3 text-beige-dark fill-beige-dark group-hover:scale-110 transition-transform duration-300" />
            <span>Virtual Showroom</span>
          </button>
        </div>
      </div>

      {/* 3D Floating Parallax Panels */}
      <div className="hidden lg:flex items-center justify-center relative w-1/3 h-[500px] z-10 pr-12">
        {/* Floating Detail 1: Material showcase card */}
        <div 
          className="hero-floating glass-card p-6 w-[260px] rounded-2xl absolute transition-transform duration-300 ease-out select-none shadow-2xl"
          style={{
            transform: `translate3d(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px, 0) rotate3d(1, -1, 0, ${mousePos.x * 0.15}deg)`,
            top: '5%',
            left: '-10%'
          }}
        >
          <div className="w-full h-32 rounded-lg overflow-hidden mb-4 border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400&auto=format&fit=crop" 
              alt="Luxury Living Room" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[9px] tracking-[0.3em] uppercase text-stone-light block mb-1">BESPOKE COLLECTION</span>
          <h3 className="text-sm font-light font-serif tracking-wide text-white mb-2">No. 104 Living Atelier</h3>
          <p className="text-[10px] text-stone-light/70 leading-relaxed font-light">
            An integration of fluted walnut veneer and warm Travertine stone shelves.
          </p>
        </div>

        {/* Floating Detail 2: Material texture card (Travertine/Marble close-up) */}
        <div 
          className="hero-floating glass-card-dark p-4 w-[190px] rounded-xl absolute transition-transform duration-300 ease-out select-none shadow-xl border border-white/5"
          style={{
            transform: `translate3d(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px, 0) rotate3d(-1, 1, 0, ${mousePos.x * 0.25}deg)`,
            bottom: '10%',
            right: '-20%'
          }}
        >
          <div className="w-full h-24 rounded-md overflow-hidden mb-3 border border-white/5">
            <img 
              src="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=400&auto=format&fit=crop" 
              alt="Travertine Stone Close-up" 
              className="w-full h-full object-cover grayscale opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="flex justify-between items-center text-[8px] tracking-[0.2em] text-stone-light">
            <span>RAW MATTE TRAVERTINE</span>
            <span className="text-white">ITALY</span>
          </div>
        </div>

        {/* Floating Decorative Sphere/Accent element */}
        <div 
          className="hero-floating absolute w-16 h-16 rounded-full bg-walnut opacity-20 blur-xl transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * -1.8}px, ${mousePos.y * -1.8}px, 0)`,
            top: '40%',
            right: '20%'
          }}
        />
      </div>

      {/* Decorative vertical coordinates overlay typical of museum collections */}
      <div className="absolute right-8 bottom-8 text-[9px] tracking-[0.3em] font-light text-white/40 writing-vertical hidden md:block select-none">
        LAT. 43.7844° N / LONG. 10.1389° E
      </div>
    </section>
  );
}
