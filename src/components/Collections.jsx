import React from 'react';
import { collections } from '../data/products';
import { ArrowUpRight } from 'lucide-react';

export default function Collections() {
  return (
    <section 
      id="collections-section" 
      className="py-24 px-6 md:px-12 lg:px-24 transition-colors duration-1000"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-[10px] tracking-[0.4em] uppercase opacity-60 block mb-2 font-semibold">
            DESIGN SEGMENTS
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-wide font-serif text-white">
            Atelier Collections
          </h2>
          <p className="text-xs text-stone-light/75 max-w-md mx-auto mt-4 font-light leading-relaxed">
            Every category represents a design ethos, crafted in limited runs with selective timber and honed marbles.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((col) => (
            <div 
              key={col.id}
              onClick={() => alert(`Navigating to ${col.name} catalog...`)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-white/5 select-none"
            >
              {/* Background Cover Image */}
              <img 
                src={col.image} 
                alt={col.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 group-hover:via-black/45 transition-colors duration-500 z-10" />

              {/* Card Contents */}
              <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-between items-start text-white">
                
                {/* Top: Models Count Badge */}
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[9px] tracking-widest uppercase font-medium">
                  {col.count}
                </span>

                {/* Bottom: Title & Callout Link */}
                <div className="w-full flex justify-between items-end">
                  <div>
                    <span className="text-[9px] tracking-[0.25em] text-stone-light uppercase font-semibold block mb-1">
                      CURATED LINE
                    </span>
                    <h3 className="text-xl md:text-2xl font-light tracking-wide font-serif">
                      {col.name}
                    </h3>
                  </div>
                  
                  {/* Floating Action Button */}
                  <div className="p-3 bg-white/10 border border-white/10 rounded-full hover:bg-white hover:text-luxury-charcoal transition-all duration-300 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

              </div>

              {/* Border shine sheet on hover */}
              <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none z-30 group-hover:border-white/20 transition-colors" />

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
