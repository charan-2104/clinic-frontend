import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Star, Clock, Users } from 'lucide-react';
import { gtagReportConversion } from '../utils/gtag';

const useScrollAnimation = () => ({
  ref: React.useRef(),
  isInView: true 
});

const OurServices = () => {
  const [activeCategory, setActiveCategory] = useState('skin');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [servicesData, setServicesData] = useState({ skin: [], hair: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { ref: titleRef, isInView: titleInView } = useScrollAnimation();
  const { ref: servicesRef, isInView: servicesInView } = useScrollAnimation();
  const { ref: ctaRef, isInView: ctaInView } = useScrollAnimation();

useEffect(() => {
  const handleResize = () => {
    const newCardsPerView = window.innerWidth < 768 ? 1 : 3;
    
    if (newCardsPerView !== cardsPerView) {
      setCardsPerView(newCardsPerView);
      setCurrentSlide(0); 
    }
  };

  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [cardsPerView]);

  const whatsappUrl ="https://wa.me/919063271426?text=Hi%20Akhilas%20Aesthetics%2C%20I%20have%20a%20query";
  const handleWhatsAppClick = () => {
      gtagReportConversion(whatsappUrl);
  };

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    let isMounted = true;
    
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await fetch(`${API_URL}/api/services`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (isMounted) {
          const groupedServices = data.reduce((acc, service) => {
            const category = service.category || 'skin';
            
            if (!acc[category]) {
              acc[category] = [];
            }
            
            acc[category].push({
              id: service._id,
              name: service.title,
              image: service.img,
              description: service.description
            });
            
            return acc;
          }, { skin: [], hair: [] });

          setServicesData(groupedServices);
          setIsVisible(true);
        }
        
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching services:', error);
          setError(`Failed to load services: ${error.message}`);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchServices();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const currentTreatments = servicesData[activeCategory] || [];
  const totalSlides = Math.max(0, currentTreatments.length - cardsPerView);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentSlide(0);
    setHoveredCard(null);
  };

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      const maxSlide = Math.max(0, currentTreatments.length - cardsPerView);
      return prev >= maxSlide ? 0 : prev + 1;
    });
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      const maxSlide = Math.max(0, currentTreatments.length - cardsPerView);
      return prev <= 0 ? maxSlide : prev - 1;
    });
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const customStyles = `
    .section-padding { padding: 5rem 0; }
    .container-custom { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    .text-gradient-luxury { 
      background: linear-gradient(135deg, #D4AF37, #E6A8B8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .bg-gradient-pearl { background: linear-gradient(135deg, #F8F6F0, #FFFEF7); }
    .bg-gradient-gold-rose { background: linear-gradient(135deg, #D4AF37, #E6A8B8); }
    .text-secondary-charcoal { color: #333333; }
    .text-accent-gold { color: #D4AF37; }
    .text-optional-dusty-rose { color: #E6A8B8; }
    .text-neutral-1 { color: #666666; }
    .text-neutral-2 { color: #999999; }
    .border-accent-gold { border-color: #D4AF37; }
    .bg-accent-gold { background-color: #D4AF37; }
    .bg-optional-dusty-rose { background-color: #E6A8B8; }
    .bg-highlight-pearl { background-color: #F8F6F0; }
    .bg-primary-ivory { background-color: #FFFEF7; }
    .hover\\:text-accent-gold:hover { color: #D4AF37; }
    .hover\\:bg-accent-gold:hover { background-color: #D4AF37; }
    .group:hover .group-hover\\:text-accent-gold { color: #D4AF37; }
    .group:hover .group-hover\\:scale-105 { transform: scale(1.05); }
    .group:hover .group-hover\\:translate-x-1 { transform: translateX(0.25rem); }
    .group:hover .group-hover\\:-translate-x-1 { transform: translateX(-0.25rem); }
    
    .carousel-container {
      transition: transform 0.5s ease-in-out;
    }
    
    .carousel-slide {
      transition: all 0.5s ease-in-out;
    }
  `;

  // Loading state
  if (loading) {
    return (
      <>
        <style>{customStyles}</style>
        <section className="section-padding bg-gradient-pearl">
          <div className="container-custom">
            <div className="flex justify-center items-center min-h-96">
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="w-16 h-16 border-4 border-yellow-200 border-t-yellow-600 rounded-full animate-spin mx-auto"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-pink-300 rounded-full animate-ping mx-auto"></div>
                </div>
                <p className="text-neutral-1 text-xl font-medium">Loading premium treatments...</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Error state
  if (error && servicesData.skin.length === 0 && servicesData.hair.length === 0) {
    return (
      <>
        <style>{customStyles}</style>
        <section className="section-padding bg-gradient-to-br from-red-50 to-red-100">
          <div className="container-custom">
            <div className="flex justify-center items-center min-h-96">
              <div className="text-center">
                <div className="text-red-500 mb-6">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-secondary-charcoal mb-4 font-serif">Oops! Something went wrong</h3>
                <p className="text-neutral-1 mb-6 text-lg">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-gradient-gold-rose text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <style>{customStyles}</style>
      <section id='treatments' className="section-padding bg-gradient-pearl" aria-labelledby="treatments-heading">
        <div className="container-custom">
          {/* Section Title */}
          <div className="text-center mb-20">
            <h2 id="treatments-heading" className="text-5xl sm:text-6xl lg:text-7xl font-bold text-secondary-charcoal mb-8 font-serif">
              Our{' '}
              <span style={{ 
              background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Treatments</span>
            </h2>
            
            {/* Category Tabs */}
            <div className="flex justify-center mb-12">
              <div className="backdrop-blur-md rounded-2xl p-2 inline-flex shadow-xl border" style={{ 
                backgroundColor: 'rgba(255, 255, 240, 0.8)',
                borderColor: 'rgba(212, 175, 55, 0.2)'
              }}>
                {[
                  { id: 'skin', label: 'Skin Treatments' },
                  { id: 'hair', label: 'Hair Treatments' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleCategoryChange(tab.id)}
                    className={`relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform ${
                      activeCategory === tab.id ? 'shadow-lg scale-105' : 'hover:scale-102'
                    }`}
                    style={{
                      background: activeCategory === tab.id 
                        ? 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)'
                        : 'transparent',
                      color: activeCategory === tab.id ? 'white' : '#BFA6A0'
                    }}
                    onMouseEnter={(e) => {
                      if (activeCategory !== tab.id) {
                        e.target.style.color = '#333333';
                        e.target.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeCategory !== tab.id) {
                        e.target.style.color = '#BFA6A0';
                        e.target.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <span className="relative z-10">{tab.label}</span>
                    {activeCategory === tab.id && (
                      <div className="absolute inset-0 rounded-xl blur opacity-30" style={{
                        background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)'
                      }}></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Description */}
            <div>
              <p className="text-xl text-neutral-1 max-w-4xl mx-auto leading-relaxed">
                {activeCategory === 'skin' 
                  ? "Transform your skin with advanced dermatology & aesthetic treatments. Experience the Science of Beauty with FDA-approved technology and expert care for radiant, healthy skin you'll love."
                  : "Restore your confidence with comprehensive hair restoration solutions. From advanced transplantation to innovative therapies, achieve natural-looking results that last a lifetime."
                }
              </p>
            </div>
          </div>

          {/* Treatment Cards */}
          {currentTreatments.length > 0 ? (
            <div className="relative">
              <div className="relative overflow-hidden">
                  <div 
                    className="flex transition-all duration-700 ease-out"
                    style={{
                      transform: currentTreatments.length > cardsPerView 
                        ? `translateX(-${currentSlide * (100 / cardsPerView)}%)`
                        : 'translateX(0%)'
                    }}
                  >
                    {currentTreatments.map((treatment, index) => (
                    <div
                      key={`${activeCategory}-${treatment.id}`}
                      className={`${cardsPerView === 1 ? 'w-full' : cardsPerView === 2 ? 'w-1/2' : 'w-1/3'} flex-shrink-0 px-4 relative group cursor-pointer`}
                      onMouseEnter={() => setHoveredCard(treatment.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Card Container */}
                      <div className="relative overflow-hidden rounded-3xl mb-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '2px solid rgba(255, 255, 255, 0.8)',
                        height: '420px'
                      }}>
                        {/* Animated Border */}
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                          background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
                          padding: '2px'
                        }}>
                          <div className="w-full h-full rounded-3xl" style={{
                            background: 'rgba(255, 255, 255, 0.98)'
                          }}></div>
                        </div>
                        {/* Inner Content */}
                        <div className="relative inset-1 bg-white rounded-3xl overflow-hidden h-full" style={{
                          background: 'rgba(255, 255, 255, 0.98)'
                        }}>
                          {/* Treatment Image */}
                          <div className="absolute inset-4 rounded-2xl overflow-hidden" style={{
                            background: 'linear-gradient(135deg, rgba(191, 166, 160, 0.1) 0%, rgba(191, 166, 160, 0.2) 100%)'
                          }}>
                            {treatment.image ? (
                              <img 
                                src={treatment.image} 
                                alt={treatment.name}
                                style={{
                                  width: '100%', 
                                  height: '100%', 
                                  objectFit: 'cover',
                                  objectPosition: '50% 10%'
                                }}
                                className=" transition-all duration-500 group-hover:scale-105"
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=face';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center" style={{
                                background: 'linear-gradient(135deg, rgba(191, 166, 160, 0.1) 0%, rgba(191, 166, 160, 0.2) 100%)'
                              }}>
                                <Sparkles className="w-16 h-16" style={{ color: '#BFA6A0' }} />
                              </div>
                            )}
                          </div>

                          {/* Hover Description Overlay */}
                          {hoveredCard === treatment.id && (
                            <div className="absolute inset-4 bg-gradient-to-t from-gray-900/95 via-gray-900/70 to-transparent flex items-end rounded-2xl transition-opacity duration-200">
                              <div className="text-white p-6">
                                <p className="text-gray-200 text-sm leading-relaxed">
                                  {treatment.description}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Treatment Name */}
                      <h3 className="text-center font-bold text-xl font-serif transition-all duration-200" style={{
                        color: hoveredCard === treatment.id ? '#D4AF37' : '#333333'
                      }}>
                        {treatment.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons - Below Cards */}
              {currentTreatments.length > cardsPerView &&  (
                <div className="flex justify-center items-center space-x-4 mt-12">
                  <button
                    onClick={handlePrevSlide}
                    className="w-12 h-12 rounded-full flex items-center justify-center group shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
                      color: 'white'
                    }}
                    onMouseEnter={(e) => {
                      if (!isTransitioning) {
                        e.target.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" />
                  </button>

                  <button
                    onClick={handleNextSlide}
                    className="w-12 h-12 rounded-full flex items-center justify-center group shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
                      color: 'white'
                    }}
                    onMouseEnter={(e) => {
                      if (!isTransitioning) {
                        e.target.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.4)';
                      }
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
          ) : (
            <div className="text-center py-20">
              <div className="text-neutral-2 mb-6">
                <Sparkles className="w-20 h-20 mx-auto mb-6" />
              </div>
              <h3 className="text-2xl font-semibold text-neutral-1 mb-3 font-serif">
                No {activeCategory} treatments available
              </h3>
              <p className="text-neutral-2">
                Please check back later or contact us for more information.
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center mt-20">
            <div className="backdrop-blur-md p-12 max-w-4xl mx-auto relative overflow-hidden rounded-2xl shadow-xl border" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderColor: 'rgba(212, 175, 55, 0.2)'
            }}>
              {/* Background decorative elements */}
              <div className="absolute top-0 left-0 w-40 h-40 rounded-full -translate-x-20 -translate-y-20 opacity-60" style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(220, 174, 150, 0.05) 100%)'
              }}></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full translate-x-16 translate-y-16 opacity-60" style={{
                background: 'linear-gradient(135deg, rgba(220, 174, 150, 0.05) 0%, rgba(212, 175, 55, 0.05) 100%)'
              }}></div>
              
              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-6 font-serif" style={{ color: '#333333' }}>
                  Ready to Transform Your Look?
                </h3>
                <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: '#BFA6A0' }}>
                  Book a consultation with our expert dermatologists and aesthetic specialists to create a personalized treatment plan just for you.
                </p>
                <button 
                  onClick={handleWhatsAppClick}
                  className="font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 text-lg group transform hover:scale-105 hover:shadow-xl"
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
                  Book Your Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurServices;






