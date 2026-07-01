import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer({ isOpen, onClose, cart, onRemove, onUpdateQuantity, onCheckout }) {
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

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
                <ShoppingBag className="w-5 h-5 text-walnut" />
                <h2 className="text-lg font-light tracking-[0.2em] font-serif uppercase">Your Cart</h2>
                <span className="text-[10px] bg-white/10 px-2.5 py-0.5 rounded-full tracking-widest text-stone-light">
                  {cart.reduce((qty, i) => qty + i.quantity, 0)} ITEMS
                </span>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 border border-white/10 rounded-full hover:bg-white/5 transition-colors focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6 scroll-thin">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-4 py-12">
                  <div className="p-4 bg-white/5 rounded-full border border-white/5">
                    <ShoppingBag className="w-8 h-8 text-stone-light opacity-40" />
                  </div>
                  <h3 className="text-base font-light tracking-widest font-serif">YOUR CART IS VACANT</h3>
                  <p className="text-xs text-stone-light/60 max-w-[240px] leading-relaxed">
                    Explore our curation of ultra-premium furniture and custom interiors.
                  </p>
                  <button 
                    onClick={onClose}
                    className="mt-4 px-6 py-2.5 bg-walnut hover:bg-walnut-light text-white text-xs tracking-[0.2em] uppercase transition-colors rounded-none"
                  >
                    Return to Atelier
                  </button>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
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
                        <span className="text-sm font-light font-serif">${product.price * quantity}</span>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-white/10 rounded-full py-0.5 px-2">
                          <button 
                            onClick={() => onUpdateQuantity(product.id, -1)}
                            className="p-1 hover:text-walnut transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-light">{quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(product.id, 1)}
                            className="p-1 hover:text-walnut transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove button */}
                        <button 
                          onClick={() => onRemove(product.id)}
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

            {/* Footer / Summary */}
            {cart.length > 0 && (
              <div className="p-6 md:p-8 bg-luxury-black/60 border-t border-white/10 space-y-4">
                <div className="space-y-2 text-xs tracking-wider text-stone-light">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-light font-serif text-white">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Tax (8%)</span>
                    <span className="font-light font-serif text-white">${tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/10 my-2 pt-2 flex justify-between text-sm tracking-widest text-white">
                    <span>TOTAL</span>
                    <span className="font-medium font-serif text-walnut">${total.toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  onClick={onCheckout}
                  className="w-full py-4 bg-walnut hover:bg-walnut-light text-white text-xs tracking-[0.25em] uppercase font-light transition-all duration-300 relative group overflow-hidden"
                >
                  <span className="relative z-10">PROCEED TO SECURE CHECKOUT</span>
                  <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
                <p className="text-[10px] text-center text-stone-light/50 tracking-widest uppercase">
                  FREE WHITE-GLOVE SHADOW DELIVERY ON ALL FURNITURE
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
