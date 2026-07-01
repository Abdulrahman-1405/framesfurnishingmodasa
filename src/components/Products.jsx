import React, { useState } from 'react';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Products({ products, wishlist, onToggleWishlist, onAddToCart, onQuickView }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Living Room", "Bedroom", "Dining", "Office", "Decor"];

  const filteredProducts = activeFilter === "All"
    ? products
    : products.filter(p => p.category === activeFilter);

  // 3D Tilt Effect Handlers
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Mouse coords relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation limits (-8deg to 8deg)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    // Apply 3D transform and lifting scale
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.4)';
    
    // Move reflection overlay slightly
    const reflection = card.querySelector('.card-reflection');
    if (reflection) {
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;
      reflection.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    card.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    
    const reflection = card.querySelector('.card-reflection');
    if (reflection) {
      reflection.style.background = 'transparent';
    }
  };

  return (
    <section 
      id="products-section" 
      className="py-24 px-6 md:px-12 lg:px-24 transition-colors duration-1000"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-current/10 pb-8">
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase opacity-60 block mb-2 font-semibold">
              BESPOKE ATELIER
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-wide font-serif">
              Featured Furnishings
            </h2>
          </div>

          {/* Categories Filter Bar */}
          <div className="flex flex-wrap gap-2 mt-8 md:mt-0 text-[10px] tracking-[0.2em] uppercase">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 border rounded-full transition-all duration-300 ${
                  activeFilter === cat 
                    ? 'bg-walnut border-walnut text-white shadow-md' 
                    : 'border-current/20 hover:border-current text-current bg-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const isInWishlist = wishlist.some(item => item.id === product.id);
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  key={product.id}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => onQuickView(product)}
                  className="group bg-white/5 rounded-2xl border border-white/5 p-3 sm:p-4 flex flex-col justify-between transition-all duration-500 cursor-pointer shadow-md select-none transform-style-3d relative overflow-hidden"
                >
                  {/* Glass Reflection sheet for 3D depth */}
                  <div className="card-reflection absolute inset-0 pointer-events-none transition-all duration-300 z-10" />

                  <div>
                    {/* Image Area */}
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-3 sm:mb-5 bg-white/5 border border-white/5 flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      
                      {/* Wishlist Icon */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product);
                        }}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-sm border border-white/10 hover:scale-110 transition-all duration-300 focus:outline-none"
                        aria-label="Add to wishlist"
                      >
                        <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-colors ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-white'}`} />
                      </button>

                      {/* Quick View and Add to Cart overlays (animated on card hover) */}
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center space-x-3.5">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onQuickView(product);
                          }}
                          className="p-3 bg-white text-luxury-charcoal hover:bg-beige hover:scale-105 rounded-full shadow-lg transition-all focus:outline-none"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4 stroke-[2]" />
                        </button>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product);
                          }}
                          className="p-3 bg-walnut text-white hover:bg-walnut-light hover:scale-105 rounded-full shadow-lg transition-all focus:outline-none"
                          title="Add To Cart"
                        >
                          <ShoppingCart className="w-4 h-4 stroke-[2]" />
                        </button>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex justify-between items-start mb-2 px-1">
                      <div className="max-w-[70%]">
                        <h3 className="text-xs sm:text-base font-light tracking-wide font-serif text-current group-hover:text-beige-dark transition-colors line-clamp-1 sm:line-clamp-none">
                          {product.name}
                        </h3>
                        <p className="text-[8px] sm:text-[10px] tracking-widest uppercase opacity-50 mt-0.5">
                          {product.category}
                        </p>
                      </div>
                      <span className="text-xs sm:text-base font-light font-serif text-current">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Rating & Action Button */}
                  <div className="flex justify-between items-center mt-3 sm:mt-4 border-t border-current/10 pt-3 px-1">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-walnut fill-walnut" />
                      <span className="text-[10px] font-medium text-current/80">{product.rating}</span>
                      <span className="text-[9px] opacity-40 hidden sm:inline">({product.reviews})</span>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="text-[8px] sm:text-[9px] tracking-[0.15em] sm:tracking-[0.2em] font-semibold text-current uppercase hover:text-walnut transition-colors focus:outline-none"
                    >
                      + ADD<span className="hidden sm:inline"> TO CART</span>
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
