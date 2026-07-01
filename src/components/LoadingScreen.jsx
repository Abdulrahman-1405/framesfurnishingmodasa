import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Animate progress number
    const obj = { value: 0 };
    gsap.to(obj, {
      value: 100,
      duration: 2.2,
      ease: 'power2.out',
      onUpdate: () => {
        setProgress(Math.floor(obj.value));
      },
      onComplete: () => {
        // Animate out
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = '';
            onComplete();
          }
        });

        tl.to('.loader-brand span', {
          letterSpacing: '1.5em',
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          stagger: 0.02
        })
        .to('.loader-progress', {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in'
        }, '-=0.6')
        .to('.loader-container', {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', // top wipe curtain transition
          duration: 1.0,
          ease: 'power4.inOut'
        }, '-=0.3');
      }
    });

    // Subtitle / Brand characters entry
    gsap.fromTo('.loader-brand span', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }, [onComplete]);

  const brandText = "FRAMES FURNISHING";

  return (
    <div className="loader-container fixed inset-0 z-[9999] flex flex-col justify-between p-12 bg-luxury-charcoal text-beige-light select-none font-sans" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
      {/* Top Header */}
      <div className="flex justify-between items-center text-xs tracking-[0.3em] text-stone-light opacity-60">
        <div>DESIGN ATELIER</div>
        <div>EST. 2026</div>
      </div>

      {/* Center Brand */}
      <div className="text-center">
        <h1 className="loader-brand text-4xl md:text-6xl font-light tracking-[0.8em] font-serif text-white flex justify-center items-center">
          {brandText.split("").map((char, index) => (
            <span key={index} className="inline-block" style={{ marginRight: char === " " ? "1.5rem" : "0" }}>
              {char}
            </span>
          ))}
        </h1>
        <p className="text-[10px] tracking-[0.5em] text-stone-light mt-4 uppercase opacity-40">
          Cinematic Living & Bespoke Spaces
        </p>
      </div>

      {/* Bottom Progress */}
      <div className="flex justify-between items-end border-t border-white/10 pt-6">
        <div className="text-xs tracking-[0.2em] text-stone-light opacity-50">
          LOADING EXPERIENCES
        </div>
        <div className="loader-progress text-5xl md:text-7xl font-light font-serif text-stone-light">
          {progress.toString().padStart(3, '0')}%
        </div>
      </div>
    </div>
  );
}
