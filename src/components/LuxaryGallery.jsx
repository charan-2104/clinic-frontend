import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const LuxuryGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Static luxury clinic images
  const clinicImages = [
    {
      id: 1,
      img: "https://res.cloudinary.com/dwneh65hw/image/upload/v1755284316/1_lrxl9b.jpg"
    },
    {
      id: 2,
      img: "https://res.cloudinary.com/dwneh65hw/image/upload/v1755285017/11_ypigwz.jpg"
    },
    {
      id: 3,
      img: "https://res.cloudinary.com/dwneh65hw/image/upload/v1755284424/2_mriq7p.jpg"
    },
    {
      id: 4,
      img: "https://res.cloudinary.com/dwneh65hw/image/upload/v1755284927/4_qkua4h.jpg"
    },
    {
      id: 5,
      img: "https://res.cloudinary.com/dwneh65hw/image/upload/v1755285107/5_nsblxb.jpg"
    },
    {
      id: 6,
      img: "https://res.cloudinary.com/dwneh65hw/image/upload/v1755285684/16_u3jejk.jpg"
    },
    {
      id: 7,
      img: "https://res.cloudinary.com/dwneh65hw/image/upload/v1755285318/12_pc4tmd.jpg"
    },
    {
      id: 8,
      img: "https://res.cloudinary.com/dwneh65hw/image/upload/v1755285513/14_w6jcdo.jpg"
    },
    {
      id: 9,
      img: "https://res.cloudinary.com/dwneh65hw/image/upload/v1755285685/15_bs7rfl.jpg"
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      const newCardsPerView = window.innerWidth < 768 ? 1 : 3;
      
      if (newCardsPerView !== cardsPerView) {
        setCardsPerView(newCardsPerView);
        setCurrentIndex(0); 
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cardsPerView]);

  const maxIndex = Math.max(0, clinicImages.length - cardsPerView);

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const maxSlide = Math.max(0, clinicImages.length - cardsPerView);
      return prev <= 0 ? maxSlide : prev - 1;
    });
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const maxSlide = Math.max(0, clinicImages.length - cardsPerView);
      return prev >= maxSlide ? 0 : prev + 1;
    });
    setTimeout(() => setIsTransitioning(false), 500);
  };
    
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="luxury" className="section-padding bg-gradient-to-br from-highlight-pearl to-primary-ivory">
      <div className="container-custom">
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-secondary-charcoal mb-8 font-serif">
            Our <span style={{ 
              background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Luxury Clinic</span>
          </h2>
          <p className="text-xl text-neutral-1 max-w-4xl mx-auto leading-relaxed">
            Step into our world-class facility designed for ultimate comfort and premium care.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-accent-gold to-optional-dusty-rose mx-auto rounded-full mt-8"></div>
        </motion.div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-all duration-700 ease-out"
            style={{
              transform: clinicImages.length > cardsPerView 
                ? `translateX(-${currentIndex * (100 / cardsPerView)}%)`
                : 'translateX(0%)'
            }}
          >
            {clinicImages.map((image, index) => (
              <div 
                key={image.id}
                className={`${cardsPerView === 1 ? 'w-full' : cardsPerView === 2 ? 'w-1/2' : 'w-1/3'} flex-shrink-0 px-4 relative`}
              >
                <div className="px-2 md:px-4">
                  <div className="card-premium p-3 md:p-4 group relative overflow-hidden hover:shadow-2xl transition-all duration-300">
                    {/* Background decorative element */}
                    <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-accent-gold/10 to-optional-dusty-rose/10 rounded-full -translate-y-8 translate-x-8 md:-translate-y-10 md:translate-x-10"></div>
                    
                    <div className="relative">
                      <div className="relative w-full h-80 md:h-80 overflow-hidden rounded-lg">
                        <img 
                          src={image.img} 
                          alt={`Clinic interior ${image.id}`}
                          className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {clinicImages.length > cardsPerView && (
            <div className="flex justify-center items-center space-x-4 mt-12">
              <button
                onClick={handlePrevSlide}
                className="w-12 h-12 rounded-full flex items-center justify-center group shadow-lg transition-all duration-200 hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }}
              >
                <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={handleNextSlide}
                className="w-12 h-12 rounded-full flex items-center justify-center group shadow-lg transition-all duration-200 hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }}
              >
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .section-padding {
          padding: 6rem 0;
        }
        
        .container-custom {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        
        .card-premium {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(212, 175, 55, 0.1);
          border-radius: 1rem;
          transition: all 0.3s ease;
        }
        
        .card-premium:hover {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(212, 175, 55, 0.3);
          transform: translateY(-5px);
        }
        
        .font-serif {
          font-family: 'Playfair Display', Georgia, serif;
        }
        
        /* Color variables simulation */
        .text-secondary-charcoal { color: #2C2C2C; }
        .text-neutral-1 { color: #6B7280; }
        .text-accent-gold { color: #D4AF37; }
        .bg-accent-gold { background-color: #D4AF37; }
        .bg-highlight-pearl { background-color: #F8F6F0; }
        .bg-primary-ivory { background-color: #FFFEF7; }
        .from-accent-gold { --tw-gradient-from: #D4AF37; }
        .to-optional-dusty-rose { --tw-gradient-to: #DCAE96; }
        .from-highlight-pearl { --tw-gradient-from: #F8F6F0; }
        .to-primary-ivory { --tw-gradient-to: #FFFEF7; }
      `}</style>
    </section>
  );
};

export default LuxuryGallery;




















