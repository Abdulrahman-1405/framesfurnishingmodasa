import React from 'react';
import { X, Heart, ShoppingBag, Star, ShieldCheck, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuickViewModal({ product, onClose, onAddToCart, isInWishlist, onToggleWishlist }) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-4xl bg-luxury-charcoal text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10 flex flex-col md:flex-row font-sans"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 bg-black/40 hover:bg-black/60 rounded-full border border-white/10 text-white transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left: Image Box */}
          <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-[550px] relative bg-white/5 border-r border-white/5 flex items-center justify-center overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            {/* Soft lighting overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/5 pointer-events-none" />
          </div>

          {/* Right: Info Details */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between overflow-y-auto h-[450px] md:h-[550px] scroll-thin">
            <div>
              {/* Category & Wishlist */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] tracking-[0.3em] text-stone-light uppercase font-semibold">
                  {product.category}
                </span>
                
                <button 
                  onClick={() => onToggleWishlist(product)}
                  className="flex items-center space-x-1.5 text-stone-light hover:text-white transition-colors focus:outline-none"
                >
                  <Heart className={`w-4 h-4 ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-stone-light'}`} />
                  <span className="text-[10px] tracking-wider uppercase">
                    {isInWishlist ? 'Wishlisted' : 'Save Piece'}
                  </span>
                </button>
              </div>

              {/* Title & Price */}
              <h3 className="text-2xl md:text-3xl font-light tracking-wide font-serif text-white mb-2">
                {product.name}
              </h3>
              <p className="text-xl font-light font-serif text-walnut-light mb-6">
                ${product.price.toLocaleString()}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-walnut fill-walnut' 
                          : 'text-stone-dark'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-xs text-white/80 font-medium">{product.rating}</span>
                <span className="text-xs text-stone-light">({product.reviews} reviews)</span>
              </div>

              {/* Description */}
              <p className="text-xs text-stone-light leading-relaxed mb-6 font-light">
                {product.description}
              </p>

              {/* Material Details list */}
              <div className="space-y-2 mb-8 bg-white/5 p-4 rounded-xl border border-white/5">
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-white font-medium mb-2">
                  SPECIFICATIONS & FINISH
                </h4>
                <ul className="space-y-1 text-[11px] text-stone-light/90 font-light list-disc pl-3 leading-relaxed">
                  {product.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Bottom */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="flex-1 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs tracking-[0.2em] uppercase font-light transition-all duration-300 flex justify-center items-center space-x-2 relative group overflow-hidden"
                >
                  <span>ADD TO CART</span>
                </button>
                
                <button 
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                    setTimeout(() => {
                      alert(`Direct Checkout triggered for: ${product.name}\nTotal: $${product.price.toLocaleString()}\nProceeding to secure payment...`);
                    }, 400);
                  }}
                  className="flex-1 py-4 bg-walnut hover:bg-walnut-light text-white text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 flex justify-center items-center space-x-2 relative group overflow-hidden"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>CHECKOUT NOW</span>
                </button>
              </div>

              {/* Shipping info */}
              <div className="grid grid-cols-2 gap-4 text-[9px] tracking-wider uppercase text-stone-light/60">
                <div className="flex items-center space-x-2">
                  <Truck className="w-3.5 h-3.5 text-walnut" />
                  <span>White-Glove Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-olive" />
                  <span>Lifetime Guarantee</span>
                </div>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
