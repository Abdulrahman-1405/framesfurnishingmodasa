import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Data
import { products } from './data/products';

// Components
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Collections from './components/Collections';
import VideoShowcase from './components/VideoShowcase';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import QuickViewModal from './components/QuickViewModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(0);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Initialize Lenis scroll
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync with ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Background transition animations on scroll (unified center-line triggers for phone/desktop)
    const sections = [
      { id: 'hero-section', bg: 'var(--beige)', text: 'var(--charcoal)', video: 0 },
      { id: 'products-section', bg: 'var(--olive)', text: '250, 250, 250', video: 1 },
      { id: 'collections-section', bg: 'var(--walnut)', text: '250, 250, 250', video: 1 },
      { id: 'showcase-section', bg: 'var(--stone)', text: '250, 250, 250', video: 0 },
      { id: 'footer-section', bg: 'var(--charcoal)', text: '245, 241, 232', video: 0 }
    ];

    sections.forEach((sec) => {
      ScrollTrigger.create({
        trigger: `#${sec.id}`,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveVideo(sec.video);
            document.documentElement.style.setProperty('--bg-color', sec.bg);
            document.documentElement.style.setProperty('--text-color', sec.text);
          }
        }
      });
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.ticker.remove(raf);
    };
  }, [isLoading]);

  // Cart operations
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCart((prev) => 
      prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <div className="relative min-h-screen flex flex-col">
          {/* Dynamic Background Room Videos */}
          <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden transition-opacity duration-1000">
            {/* Video 1: Living Room */}
            <video
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c022f4cbaeeab7c394fa968bb03b87ec&profile_id=139&oauth2_token_id=57447761"
              autoPlay
              muted
              loop
              playsInline
              style={{ opacity: activeVideo === 0 ? 0.35 : 0 }}
            />
            {/* Video 2: Dining/Lounge Room */}
            <video
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              src="https://player.vimeo.com/external/435674703.sd.mp4?s=7fdf7c1a1796c3426e25547463f25c79e6027170&profile_id=139&oauth2_token_id=57447761"
              autoPlay
              muted
              loop
              playsInline
              style={{ opacity: activeVideo === 1 ? 0.25 : 0 }}
            />
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/20 pointer-events-none" />
          </div>

          {/* Site Navigation */}
          <Navbar 
            cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
            wishlistCount={wishlist.length}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenWishlist={() => setIsWishlistOpen(true)}
          />

          {/* Page Sections */}
          <main className="flex-grow">
            <Hero onExplore={() => {
              const el = document.getElementById('products-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} />
            <Products 
              products={products}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onAddToCart={addToCart}
              onQuickView={setQuickViewProduct}
            />
            <Collections />
            <VideoShowcase />
          </main>

          {/* Footer */}
          <Footer />

          {/* Modals & Drawers */}
          <CartDrawer 
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onCheckout={() => alert('Proceeding to checkout...')}
          />

          <WishlistDrawer 
            isOpen={isWishlistOpen}
            onClose={() => setIsWishlistOpen(false)}
            wishlist={wishlist}
            onRemove={toggleWishlist}
            onAddToCart={(item) => {
              addToCart(item);
              toggleWishlist(item); // optionally remove from wishlist after adding to cart
            }}
          />

          {quickViewProduct && (
            <QuickViewModal 
              product={quickViewProduct}
              onClose={() => setQuickViewProduct(null)}
              onAddToCart={addToCart}
              isInWishlist={wishlist.some(item => item.id === quickViewProduct.id)}
              onToggleWishlist={toggleWishlist}
            />
          )}
        </div>
      )}
    </>
  );
}