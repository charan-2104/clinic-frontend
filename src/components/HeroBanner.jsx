import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, ArrowRight } from 'lucide-react';

// Desktop slides
const desktopSlides = [
  {
    img: 'https://res.cloudinary.com/dwneh65hw/image/upload/v1755286204/ban1_t6tq3o.jpg',
    title: 'Dr.Akhila\'s Aesthetics',
    subtitle: 'Glow with Confidence',
    description: 'Experience premium skincare and aesthetic treatments in an environment designed for your comfort and confidence.',
    cta: 'Book Consultation',
    secondary: 'Our Treatments'
  },
  {
    img: 'https://res.cloudinary.com/dwneh65hw/image/upload/v1755708297/new-doc-banner_z4gad5.jpg',
    title: 'Expert Dermatologists',
    subtitle: 'Your Skin, Our Expertise',
    description: 'Our board-certified dermatologists combine medical excellence with aesthetic artistry.',
    cta: 'Schedule Call',
    secondary: 'Meet Our Doctors'
  },
  {
    img: 'https://res.cloudinary.com/dwneh65hw/image/upload/v1755285352/13_bqkpx0.jpg',
    title: 'Advanced Treatments',
    subtitle: 'Innovation in Aesthetics',
    description: 'State-of-the-art technology meets personalized care for optimal results.',
    cta: 'Explore Treatments',
    secondary: 'Before & After'
  },
  {
    img: 'https://res.cloudinary.com/dwneh65hw/image/upload/v1755284424/2_mriq7p.jpg',
    title: 'Luxury Experience',
    subtitle: 'Spa Meets Medicine',
    description: 'Indulge in a premium experience where every detail is crafted for your comfort.',
    cta: 'Experience Luxury',
    secondary: 'Patient Stories'
  },
];

// Mobile slides
const mobileSlides = [
  {
    img: 'https://res.cloudinary.com/dwneh65hw/image/upload/v1755871293/mobile-home_vyj2nb.jpg', 
    title: 'Akhila\'s Aesthetics',
    subtitle: 'Glow with Confidence',
    description: 'Experience premium skincare and aesthetic treatments in an environment designed for your comfort and confidence.',
    cta: 'Book Consultation',
    secondary: 'Our Treatments'
  },
  {
    img: 'https://res.cloudinary.com/dwneh65hw/image/upload/v1755795973/doctor-ban-phone_fvjybz.jpg', 
    title: 'Expert Dermatologists',
    subtitle: 'Our Expertise',
    description: 'Our board-certified dermatologists combine medical excellence with aesthetic artistry.',
    cta: 'Schedule Call',
    secondary: 'Meet Our Doctors'
  },
  {
    img: 'https://res.cloudinary.com/dwneh65hw/image/upload/v1755795656/new-mobile-treat_rrflrp.jpg', 
    title: 'Advanced Treatments',
    subtitle: 'Innovation in Aesthetics',
    description: 'State-of-the-art technology meets personalized care for optimal results.',
    cta: 'Explore Treatments',
    secondary: 'Before & After'
  },
  {
    img: 'https://res.cloudinary.com/dwneh65hw/image/upload/v1755284424/2_mriq7p.jpg', 
    title: 'Luxury Experience',
    subtitle: 'Spa Meets Medicine',
    description: 'Indulge in a premium experience where every detail is crafted for your comfort.',
    cta: 'Experience Luxury',
    secondary: 'Patient Stories'
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); 
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const slides = isMobile ? mobileSlides : desktopSlides;
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    setCurrent(0);
  }, [isMobile]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6, 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, 
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.03, 
      transition: {
        duration: 0.2, 
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.97 
    }
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden bg-secondary-charcoal" role="banner" aria-label="Hero Banner">
      <AnimatePresence mode="wait">
        {slides.map((slide, idx) => (
          idx === current && (
            <motion.div
              key={`${isMobile ? 'mobile' : 'desktop'}-${idx}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }} 
              className="absolute inset-0"
              role="img"
              aria-label={`Slide ${idx + 1}: ${slide.title}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.img}
                  alt={`${slide.title} - ${slide.subtitle}`}
                  className="w-full h-full object-cover object-center"
                  draggable="false"
                  loading="eager"
                />
                {/* Luxury Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-charcoal/85 via-secondary-charcoal/70 to-secondary-charcoal/50"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-charcoal/60 via-transparent to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative z-20 h-full flex items-center">
                <div className="container-custom section-padding">
                  <motion.div 
                    className="max-w-5xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  > 
                    <motion.div variants={itemVariants} className="mb-6">
                      <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight font-serif">
                        {slide.title}
                      </h1>
                      <p className="text-2xl sm:text-3xl text-accent-gold mb-4 font-medium">
                        {slide.subtitle}
                      </p>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="mb-8">
                      <p className="text-xl sm:text-2xl text-neutral-2 mb-8 max-w-3xl leading-relaxed">
                        {slide.description}
                      </p>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
                      <motion.button 
                        className="btn-primary text-lg px-10 py-5 group bg-opacity-80"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => {
                          if (slide.cta === "Book Consultation") {
                            window.open(`https://wa.me/919505985010?text=Hi%20Dr.Akhila's%20Aesthetics%2C%20I%20have%20a%20query`,'_blank'); //WhatsApp link
                          } else if (slide.cta === "Schedule Call") {
                            window.location.href=`tel:+919505985010`
                          } else if (slide.cta === "Explore Treatments") {
                            document.getElementById("treatments")?.scrollIntoView({ behavior: "smooth" });
                          } else if (slide.cta === "Experience Luxury") {
                            document.getElementById("luxury")?.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        aria-label={`${slide.cta} - ${slide.title}`}
                      >
                        <span className="flex items-center gap-3">
                          {slide.cta}
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                      </motion.button>
                      
                      <motion.button 
                        className="btn-outline text-lg px-10 py-5 group"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => {
                          if (slide.secondary === "Our Treatments") {
                            document.getElementById("treatments")?.scrollIntoView({ behavior: "smooth" });
                          } else if (slide.secondary === "Meet Our Doctors") {
                            document.getElementById("doctors")?.scrollIntoView({ behavior: "smooth" });
                          } else if (slide.secondary === "Before & After") {
                            document.getElementById("beforeAfter")?.scrollIntoView({ behavior: "smooth" });
                          } else if (slide.secondary === "Patient Stories") {
                            document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        aria-label={`${slide.secondary} - ${slide.title}`}
                      >
                        <span className="flex items-center gap-3">
                          {slide.secondary}
                          <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                        </span>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-30">
        {slides.map((_, idx) => (
          <motion.button
            key={idx}
            className={`w-3 h-3 rounded-full border-2 border-accent-gold transition-all duration-200 ${
              idx === current 
                ? 'bg-accent-gold shadow-lg shadow-accent-gold/50' 
                : 'bg-transparent hover:bg-accent-gold/50'
            }`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;