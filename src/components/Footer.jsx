import React, { useState } from 'react';
import { ArrowRight, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing! We have registered "${email}" for our Atelier newsletters.`);
    setEmail("");
  };

  const instagramPhotos = [
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=300&auto=format&fit=crop"
  ];

  return (
    <footer 
      id="footer-section" 
      className="bg-luxury-black text-stone-light/80 pt-24 pb-12 px-6 md:px-12 lg:px-24 border-t border-white/5 font-sans select-none"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/5">
        
        {/* Column 1: Brand Info */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-2xl font-light tracking-[0.4em] font-serif text-white uppercase">FRAMES FURNISHING</h2>
          <p className="text-xs font-light leading-relaxed text-stone-light/60">
            A design atelier focusing on architectural purity and premium material sourcing. Sculpted in Carrara and Copenhagen.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 pt-2">
            <a href="#instagram" className="p-2 border border-white/10 rounded-full hover:bg-white/5 text-white transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#pinterest" className="p-2 border border-white/10 rounded-full hover:bg-white/5 text-white transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.4 7.63 11.16-.09-.94-.17-2.39.04-3.41.19-.92 1.22-5.17 1.22-5.17s-.31-.63-.31-1.55c0-1.46.84-2.54 1.89-2.54.89 0 1.32.67 1.32 1.48 0 .9-.57 2.24-.86 3.48-.25 1.04.52 1.88 1.54 1.88 1.85 0 3.27-1.95 3.27-4.76 0-2.49-1.79-4.23-4.35-4.23-2.96 0-4.7 2.22-4.7 4.52 0 .9.34 1.86.77 2.37.08.1.1.18.07.28l-.29 1.18c-.05.18-.16.22-.36.13-1.32-.61-2.14-2.53-2.14-4.08 0-3.32 2.42-6.38 6.96-6.38 3.66 0 6.5 2.61 6.5 6.09 0 3.63-2.29 6.56-5.47 6.56-1.07 0-2.07-.55-2.42-1.21l-.66 2.51c-.24.91-.88 2.05-1.31 2.76 1.12.35 2.3.54 3.53.54 6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
              </svg>
            </a>
            <a href="#vimeo" className="p-2 border border-white/10 rounded-full hover:bg-white/5 text-white transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22.396 7.164c-.1 2.226-1.65 5.271-4.658 9.13-3.107 3.98-5.735 5.97-7.884 5.97-1.33 0-2.454-1.228-3.37-3.685L4.66 10.65c-.67-2.42-1.39-3.63-2.16-3.63-.168 0-.75.35-1.75 1.05L0 6.85c1.1-.967 2.19-1.933 3.28-2.9 1.48-1.29 2.6-1.968 3.34-2.033 1.767-.166 2.85.905 3.24 3.212.42 2.487.71 4.032.87 4.635.48 2.19.998 3.286 1.56 3.286.435 0 1.09-.688 1.96-2.062.865-1.375 1.328-2.42 1.39-3.138.12-1.187-.34-1.782-1.39-1.782-.494 0-1.003.114-1.525.34 1.012-3.317 2.947-4.928 5.804-4.834 2.12.07 3.12 1.437 3.007 4.1z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-[10px] tracking-[0.25em] text-white font-semibold uppercase">The Atelier</h4>
          <ul className="space-y-2.5 text-xs font-light text-stone-light/70">
            <li><a href="#hero-section" className="hover:text-white transition-colors">Home Studio</a></li>
            <li><a href="#products-section" className="hover:text-white transition-colors">Living Curation</a></li>
            <li><a href="#collections-section" className="hover:text-white transition-colors">Material Grid</a></li>
            <li><a href="#about" className="hover:text-white transition-colors">Our Ethos</a></li>
            <li><a href="#showrooms" className="hover:text-white transition-colors">Atelier Locations</a></li>
          </ul>
        </div>

        {/* Column 3: Care & Support */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-[10px] tracking-[0.25em] text-white font-semibold uppercase">Assistance</h4>
          <ul className="space-y-2.5 text-xs font-light text-stone-light/70">
            <li><a href="#care" className="hover:text-white transition-colors">Material Care</a></li>
            <li><a href="#shipping" className="hover:text-white transition-colors">Shadow Delivery</a></li>
            <li><a href="#consultation" className="hover:text-white transition-colors">Private Advising</a></li>
            <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
          </ul>
        </div>

        {/* Column 4: Instagram Grid */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-[10px] tracking-[0.25em] text-white font-semibold uppercase font-sans">Instagram Gallery</h4>
          <div className="grid grid-cols-2 gap-2">
            {instagramPhotos.map((url, idx) => (
              <a 
                href="#instagram" 
                key={idx}
                className="aspect-square bg-white/5 border border-white/10 rounded-lg overflow-hidden group/insta block relative"
              >
                <img 
                  src={url} 
                  alt="Atmospheric Interior detail" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/insta:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/insta:opacity-100 transition-opacity flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Column 5: Newsletter */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-[10px] tracking-[0.25em] text-white font-semibold uppercase">Atelier Society</h4>
          <p className="text-xs font-light text-stone-light/60 leading-relaxed">
            Subscribe to receive private invitations to limited collection releases and custom design guides.
          </p>
          
          <form onSubmit={handleSubscribe} className="relative mt-2 border-b border-white/20 focus-within:border-walnut transition-colors pb-1">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="w-full bg-transparent border-0 text-white placeholder-white/20 text-xs py-1.5 focus:outline-none focus:ring-0"
              required
            />
            <button 
              type="submit" 
              className="absolute right-0 top-1 text-stone-light hover:text-white transition-colors"
              aria-label="Subscribe"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Footer Info */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.25em] text-stone-light/40 space-y-4 md:space-y-0">
        <div className="flex flex-wrap gap-6 justify-center text-center">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-walnut/60" />
            COPENHAGEN / CARRARA
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-olive/60" />
            +45 88 92 104
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-stone-light/40" />
            ATELIER@FRAMESFURNISHING.DESIGN
          </span>
        </div>

        <p className="text-center md:text-right uppercase">
          © 2026 FRAMES FURNISHING. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}