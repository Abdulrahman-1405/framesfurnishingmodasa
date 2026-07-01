import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WishlistDrawer({ isOpen, onClose, wishlist, onRemove, onAddToCart }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-luxury-charcoal text-white shadow-2xl flex flex-col justify-between border-l border-white/5 font-sans"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Heart className="w-5 h-5 text-walnut fill-walnut" />
                <h2 className="text-lg font-light tracking-[0.2em] font-serif uppercase">Your Wishlist</h2>
                <span className="text-[10px] bg-white/10 px-2.5 py-0.5 rounded-full tracking-widest text-stone-light">
                  {wishlist.length} ITEMS
                </span>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 border border-white/10 rounded-full hover:bg-white/5 transition-colors focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Wishlist Items List */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6 scroll-thin">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-4 py-12">
                  <div className="p-4 bg-white/5 rounded-full border border-white/5">
                    <Heart className="w-8 h-8 text-stone-light opacity-40" />
                  </div>
                  <h3 className="text-base font-light tracking-widest font-serif">WISHLIST IS VACANT</h3>
                  <p className="text-xs text-stone-light/60 max-w-[240px] leading-relaxed">
                    Save pieces you love to build your future tailored spaces.
                  </p>
                  <button 
                    onClick={onClose}
                    className="mt-4 px-6 py-2.5 bg-walnut hover:bg-walnut-light text-white text-xs tracking-[0.2em] uppercase transition-colors rounded-none"
                  >
                    Explore Curated Pieces
                  </button>
                </div>
              ) : (
                wishlist.map((product) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    key={product.id}
                    className="flex space-x-4 border-b border-white/5 pb-6 last:border-b-0 last:pb-0"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-light tracking-wide font-serif">{product.name}</h4>
                          <p className="text-[10px] text-stone-light/60 tracking-wider mt-0.5">{product.category}</p>
                        </div>
                        <span className="text-sm font-light font-serif">${product.price}</span>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        {/* Quick Add to Cart */}
                        <button 
                          onClick={() => onAddToCart(product)}
                          className="flex items-center space-x-1.5 px-3 py-1 bg-white/5 border border-white/10 hover:bg-walnut hover:border-walnut text-[10px] tracking-wider uppercase transition-all duration-300"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add To Cart</span>
                        </button>

                        {/* Remove button */}
                        <button 
                          onClick={() => onRemove(product)}
                          className="text-stone-light/50 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Bottom Note */}
            <div className="p-6 md:p-8 bg-luxury-black/40 border-t border-white/10">
              <p className="text-[10px] text-center text-stone-light/40 tracking-widest leading-relaxed uppercase">
                YOUR CURATED PORTFOLIO STAYS SAVED TO YOUR PROFILE.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
