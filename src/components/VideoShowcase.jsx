import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoShowcase() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    const text = textRef.current;

    // Zoom-in scroll animation
    gsap.fromTo(video, 
      { scale: 0.85, borderRadius: '32px' },
      {
        scale: 1.0,
        borderRadius: '0px',
        ease: 'power1.out',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'center center',
          scrub: true,
        }
      }
    );

    // Text slide up reveal
    gsap.fromTo(text,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top center',
          toggleActions: 'play none none reverse'
        }
      }
    );

  }, []);

  return (
    <section 
      ref={containerRef}
      id="showcase-section" 
      className="relative min-h-[90vh] flex flex-col justify-center items-center py-20 overflow-hidden select-none"
    >
      {/* Scroll-Scale Video Container */}
      <div className="w-full h-[65vh] md:h-[75vh] overflow-hidden relative">
        <video
          ref={videoRef}
          className="w-full h-full object-cover origin-center"
          src="https://player.vimeo.com/external/409240899.sd.mp4?s=d85d774a3f12e873752e50d68f7b53df4bc5fa20&profile_id=139&oauth2_token_id=57447761"
          autoPlay
          muted
          loop
          playsInline
        />
        
        {/* Subtle dark glare overlay */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        
        {/* Lens reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-black/10 pointer-events-none" />
      </div>

      {/* Floating Description Copy */}
      <div 
        ref={textRef}
        className="max-w-2xl text-center mt-12 px-6 text-white"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-stone-light block mb-3 font-semibold">
          HONED CRAFTSMANSHIP
        </span>
        
        <h2 className="text-2xl md:text-4xl font-light tracking-wide font-serif mb-4 text-white">
          Sourced globally. Shaped by hand.
        </h2>
        
        <p className="text-xs text-stone-light/80 leading-relaxed font-light">
          Each AURA design is carved individually by seasoned artisans in our Copenhagen and Carrara workshops. We respect natural imperfections, ensuring no two monolithic surfaces are identical.
        </p>

        {/* Brand Signoff */}
        <div className="mt-8 flex justify-center items-center space-x-3 opacity-60">
          <div className="w-8 h-[1px] bg-stone-light" />
          <span className="text-[9px] tracking-[0.3em] uppercase">The Atelier Standard</span>
          <div className="w-8 h-[1px] bg-stone-light" />
        </div>
      </div>

    </section>
  );
}
