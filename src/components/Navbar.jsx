import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, User, Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ cartCount, wishlistCount, onOpenCart, onOpenWishlist }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState("Home");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#hero-section" },
    { name: "Living Room", href: "#products-section" },
    { name: "Bedroom", href: "#products-section" },
    { name: "Dining", href: "#products-section" },
    { name: "Office", href: "#products-section" },
    { name: "Collections", href: "#collections-section" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (linkName) => {
    setActiveItem(linkName);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'py-4 glass-nav-dark shadow-2xl text-white' 
            : 'py-6 bg-transparent text-luxury-charcoal'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#hero-section" 
            onClick={() => handleNavClick("Home")}
            className="text-xl md:text-2xl font-light tracking-[0.4em] font-serif hover:opacity-85 transition-opacity"
          >
            FRAMES
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-[11px] font-sans tracking-[0.25em] uppercase">
            {navLinks.map((link) => {
              const isActive = activeItem === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavClick(link.name)}
                  className={`relative py-2 group transition-colors duration-300 ${
                    isActive 
                      ? isScrolled ? 'text-white' : 'text-walnut' 
                      : isScrolled ? 'text-stone-light/70 hover:text-white' : 'text-luxury-charcoal/70 hover:text-luxury-charcoal'
                  }`}
                >
                  {link.name}
                  
                  {/* Underline Hover Animation */}
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-walnut scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                    isActive ? 'scale-x-100 bg-walnut' : ''
                  }`} />
                  
                  {/* Glow effect on hover */}
                  <span className="absolute inset-0 -z-10 bg-walnut/5 opacity-0 group-hover:opacity-100 blur-sm rounded-lg transition-opacity duration-300" />
                </a>
              );
            })}
          </nav>

          {/* Desktop Icons */}
          <div className="flex items-center space-x-5 md:space-x-6">
            {/* Search Toggle */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-1 hover:scale-105 transition-transform duration-200 focus:outline-none"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px] stroke-[1.5]" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-1 hover:scale-105 transition-transform duration-200 focus:outline-none"
                aria-label="User profile"
              >
                <User className="w-[18px] h-[18px] stroke-[1.5]" />
              </button>
              
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-48 py-2 glass-modal text-white text-xs tracking-wider rounded-lg shadow-xl font-sans"
                  >
                    <a href="#profile" className="block px-4 py-2 hover:bg-white/10 transition-colors">My Profile</a>
                    <a href="#orders" className="block px-4 py-2 hover:bg-white/10 transition-colors">Orders & Bespoke Designs</a>
                    <a href="#settings" className="block px-4 py-2 hover:bg-white/10 transition-colors">Settings</a>
                    <div className="border-t border-white/10 my-1"></div>
                    <button onClick={() => alert("Logged out")} className="w-full text-left px-4 py-2 hover:bg-red-500/10 hover:text-red-300 transition-colors">Sign Out</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist Toggle */}
            <button 
              onClick={onOpenWishlist}
              className="p-1 hover:scale-105 transition-transform duration-200 relative focus:outline-none"
              aria-label="Wishlist"
            >
              <Heart className="w-[18px] h-[18px] stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[9px] w-4 h-4 bg-walnut text-white flex items-center justify-center rounded-full font-sans font-medium scale-90 animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Toggle */}
            <button 
              onClick={onOpenCart}
              className="p-1 hover:scale-105 transition-transform duration-200 relative focus:outline-none"
              aria-label="Cart"
            >
              <ShoppingBag className="w-[18px] h-[18px] stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[9px] w-4 h-4 bg-olive text-white flex items-center justify-center rounded-full font-sans font-medium scale-90 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1 hover:scale-105 transition-transform duration-200 focus:outline-none"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 stroke-[1.5]" /> : <Menu className="w-5 h-5 stroke-[1.5]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.45, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-luxury-charcoal text-white flex flex-col justify-between p-12 lg:hidden font-sans"
          >
            <div className="flex justify-between items-center mt-6">
              <span className="text-xl font-light tracking-[0.4em] font-serif">FRAMES</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 border border-white/10 rounded-full hover:bg-white/5 transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 text-2xl font-light tracking-widest font-serif text-center my-auto">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavClick(link.name)}
                  className="hover:text-walnut transition-colors py-2 block"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col items-center space-y-4 border-t border-white/10 pt-8 text-center text-xs tracking-widest text-stone-light/70">
              <div className="flex items-center space-x-2">
                <Globe className="w-3.5 h-3.5" />
                <span>GLOBAL ATELIER</span>
              </div>
              <p>© 2026 FRAMES FURNISHING. ALL RIGHTS RESERVED.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Search Overlay Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-luxury-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <button 
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
              className="absolute top-8 right-8 p-3 border border-white/10 rounded-full hover:bg-white/10 text-white transition-colors focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full max-w-2xl text-center">
              <p className="text-[10px] tracking-[0.4em] text-stone-light uppercase mb-4">EXPLORE OUR COLLECTIONS</p>
              <form onSubmit={(e) => { e.preventDefault(); alert(`Searching for "${searchQuery}"...`); setIsSearchOpen(false); }} className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Sonder Chair, Plinth Sofa, Walnut Table..." 
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-2xl md:text-3xl font-light text-white placeholder-white/30 text-center tracking-wide focus:outline-none focus:border-walnut transition-colors"
                  autoFocus
                />
                <button type="submit" className="absolute right-0 bottom-4 text-white hover:text-walnut transition-colors">
                  <Search className="w-6 h-6 stroke-[1.5]" />
                </button>
              </form>
              <div className="mt-8 flex justify-center flex-wrap gap-3 text-xs tracking-wider text-stone-light/80">
                <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 cursor-pointer transition-colors" onClick={() => setSearchQuery("Lounge Chair")}>Lounge Chairs</span>
                <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 cursor-pointer transition-colors" onClick={() => setSearchQuery("Walnut")}>Walnut Wood</span>
                <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 cursor-pointer transition-colors" onClick={() => setSearchQuery("Plinth")}>Plinth Sofas</span>
                <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 cursor-pointer transition-colors" onClick={() => setSearchQuery("Travertine")}>Travertine Tables</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
