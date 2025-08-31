import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#doctors', label: 'Doctors' },
    { href: '#treatments', label: 'Treatments' },
    { href: '#testimonials', label: 'Stories' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleWhatsAppClick = () => {
    window.open(
      `https://wa.me/919505985010?text=Hi%20Dr.Akhila's%20Aesthetics%2C%20I%20have%20a%20query`,
      '_blank'
    );
  };

  const handleNavClick = (e, href) => {
  e.preventDefault(); 
  const id = href.replace("#", "");
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const handleMobileNavClick = (e, href) => {
  e.preventDefault(); 
  const id = href.replace("#", "");
  const section = document.getElementById(id);
  if (section) {
    const yOffset = -80; 
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
  setIsMobileMenuOpen(false);
};


  const navVariants = {
    hidden: { opacity: 0, y: -10 }, 
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, 
        ease: "easeOut"
      }
    }
  };

  const linkVariants = {
    hover: {
      y: -1, 
      transition: {
        duration: 0.15,
        ease: "easeInOut"
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -10, 
      transition: {
        duration: 0.2, 
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3, 
        ease: "easeOut",
        staggerChildren: 0.05, 
        delayChildren: 0.05 
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -10 }, 
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2, 
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${ 
        isScrolled || isMobileMenuOpen
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-accent-gold/20 py-3' 
          : 'bg-transparent py-6'
      }`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-1 flex-shrink-0 z-50 cursor-pointer"
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.15 }} 
            onClick={() => {
              const el = document.getElementById('home');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {/* LOGO */}
            <div className="flex items-center">
              <img 
                src="https://res.cloudinary.com/dwneh65hw/image/upload/v1754491750/logo-gold_iwaplf.png" 
                alt="Dr. Akhila's Aesthetics Logo" 
                className="w-12 h-12 md:w-20 md:h-20 object-contain filter drop-shadow-2xl contrast-125"
                loading="lazy"
              />
              <span className={`font-serif font-bold text-lg md:text-xl ml-0 md:-ml-3 transition-colors duration-200 ${ 
                isScrolled || isMobileMenuOpen ? 'text-accent-gold' : 'text-accent-gold'
              }`}>
                Dr.Akhila's Aesthetics
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-medium transition-all duration-200 relative group text-base lg:text-lg px-3 py-2 ${ 
                  isScrolled ? 'text-secondary-charcoal' : 'text-white'
                }`}
                variants={linkVariants}
                whileHover="hover"
                style={{
                  animationDelay: `${index * 0.05}s`
                }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-gold transition-all duration-200 group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>

          {/* Desktop WhatsApp Button */}
          <div className="hidden md:block flex-shrink-0">
            <motion.button 
              onClick={handleWhatsAppClick}
              className="w-12 h-12 bg-accent-gold hover:bg-accent-gold/90 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95" 
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }} 
              aria-label="Contact us on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="md:hidden p-2 rounded-lg transition-all duration-200 hover:bg-white/20 active:scale-95 z-50" 
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -45, opacity: 0 }} 
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.15 }} 
                >
                  <X className={`w-6 h-6 ${
                    isScrolled || isMobileMenuOpen ? 'text-secondary-charcoal' : 'text-white'
                  }`} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 45, opacity: 0 }} 
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -45, opacity: 0 }} 
                  transition={{ duration: 0.15 }} 
                >
                  <Menu className={`w-6 h-6 ${
                    isScrolled || isMobileMenuOpen ? 'text-secondary-charcoal' : 'text-white'
                  }`} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden fixed left-0 right-0 top-full z-50"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="bg-white/95 backdrop-blur-md shadow-2xl border-t border-accent-gold/20 mx-4 rounded-b-2xl overflow-hidden">
                <div className="py-6 space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleMobileNavClick(e, link.href)}
                      className="flex items-center space-x-4 px-6 py-4 font-medium text-secondary-charcoal hover:text-accent-gold hover:bg-accent-gold/5 transition-all duration-200 transform" 
                      variants={mobileItemVariants}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-2 h-2 bg-accent-gold rounded-full"></div>
                      <span className="text-lg">{link.label}</span>
                      <div className="flex-1"></div>
                      <div className="w-4 h-4 border-r-2 border-t-2 border-accent-gold/30 transform rotate-45"></div>
                    </motion.a>
                  ))}

                  {/* Mobile WhatsApp Button */}
                  <motion.div 
                    className="px-6 pt-4"
                    variants={mobileItemVariants}
                  >
                    <motion.button 
                      onClick={() => {
                        handleWhatsAppClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-accent-gold to-accent-gold/90 hover:from-accent-gold/90 hover:to-accent-gold text-white py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform"
                      whileHover={{ scale: 1.01 }} 
                      whileTap={{ scale: 0.98 }}
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-semibold">WhatsApp Consultation</span>
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden fixed inset-0 bg-secondary-charcoal/10 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;