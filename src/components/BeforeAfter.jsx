import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Star, Heart, Award } from 'lucide-react';

const useScrollAnimation = () => ({
  ref: React.useRef(),
  isInView: true
});

const BeforeAfter = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { ref: titleRef, isInView: titleInView } = useScrollAnimation();
  const { ref: casesRef, isInView: casesInView } = useScrollAnimation();
  const { ref: ctaRef, isInView: ctaInView } = useScrollAnimation();

useEffect(() => {
  const handleResize = () => {
    const newCardsPerView = window.innerWidth < 768 ? 1 : 3;
    
    if (newCardsPerView !== cardsPerView) {
      setCardsPerView(newCardsPerView);
      setCurrentSlide(0);
    }
  };

  // Set initial value
  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [cardsPerView]);

  // Static fallback data
  const staticCases = [
    {
      _id: '1',
      title: 'Skin Whitening',
      img: 'https://res.cloudinary.com/dwneh65hw/image/upload/v1755360083/beforeAfter/beforeafter-1755360081069-428402909.jpg',
    },
    {
      _id: '2',
      title: 'Skin Whitening',
      img: 'https://res.cloudinary.com/dwneh65hw/image/upload/v1755360102/beforeAfter/beforeafter-1755360100113-35825878.jpg',
    },
    {
      _id: '3',
      title: 'Carbon Laser',
      img: 'https://res.cloudinary.com/dwneh65hw/image/upload/v1755360152/beforeAfter/beforeafter-1755360150468-453010808.jpg',
    },
    {
      _id: '4',
      title: 'Carbon Laser',
      img: 'https://res.cloudinary.com/dwneh65hw/image/upload/v1755360249/beforeAfter/beforeafter-1755360243606-843336782.jpg',
    },
    {
      _id: '5',
      title: 'Carbon Laser',
      img: 'https://res.cloudinary.com/dwneh65hw/image/upload/v1755360268/beforeAfter/beforeafter-1755360264821-489513856.jpg',
    },
    {
      _id: '6',
      title: 'Follitech Hair Regrowth',
      img: 'https://res.cloudinary.com/dwneh65hw/image/upload/v1755360345/beforeAfter/beforeafter-1755360342101-958862349.jpg',
    },
    {
      _id: '6',
      title: 'Follitech Hair Regrowth',
      img: 'https://res.cloudinary.com/dwneh65hw/image/upload/v1755360360/beforeAfter/beforeafter-1755360357318-398430458.jpg',
    },
  ];
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let isMounted = true;
    
    const fetchBeforeAfterData = async () => {
      try {
        setLoading(true);
        setError('');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const response = await fetch(`${API_URL}/api/beforeAfter`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (isMounted) {
          if (data && Array.isArray(data) && data.length > 0) {
            setCases(data);
            setIsVisible(true);
          } else {
            setCases(staticCases);
            setIsVisible(true);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching beforeafter data:', error);
          setError(`Failed to load success stories: ${error.message}`);
          setCases(staticCases);
          setIsVisible(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBeforeAfterData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const totalSlides = Math.max(0, cases.length - cardsPerView);

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      const maxSlide = Math.max(0, cases.length - cardsPerView);
      return prev >= maxSlide ? 0 : prev + 1;
    });
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      const maxSlide = Math.max(0, cases.length - cardsPerView);
      return prev <= 0 ? maxSlide : prev - 1;
    });
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/919505985010?text=Hi%20Dr.Akhila's%20Aesthetics%2C%20I%20have%20a%20query`,'_blank');
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
                <p className="text-neutral-1 text-xl font-medium">Loading success stories...</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Error state
  if (error && cases.length === 0) {
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
      <section id="beforeAfter" className="section-padding bg-gradient-pearl" aria-labelledby="before-after-heading">
        <div className="container-custom">
          {/* Section Title */}
          <div className="text-center mb-20">
            <h2 id="before-after-heading" className="text-5xl sm:text-6xl lg:text-7xl font-bold text-secondary-charcoal mb-8 font-serif">
              Success{' '}
              <span style={{ 
                background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Stories</span>
            </h2>
            <p className="text-xl text-neutral-1 max-w-4xl mx-auto leading-relaxed">
              See the remarkable transformations and positive outcomes our patients have experienced through our premium dermatology care. Real results from real people who trusted us with their journey.
            </p>
            <div className="w-32 h-1 mx-auto rounded-full mt-8" style={{
              background: 'linear-gradient(90deg, #D4AF37 0%, #DCAE96 100%)'
            }}></div>
          </div>

          {/* Success Story Cards */}
          {cases.length > 0 ? (
            <div className="relative">
              <div className="relative overflow-hidden">
                  <div 
                    className="flex transition-all duration-700 ease-out"
                    style={{
                      transform: cases.length > cardsPerView 
                        ? `translateX(-${currentSlide * (100 / cardsPerView)}%)`
                        : 'translateX(0%)'
                    }}
                  >
                    {cases.map((caseItem, index) => (
                    <div
                      key={`case-${caseItem._id || index}`}
                      className={`${cardsPerView === 1 ? 'w-full' : cardsPerView === 2 ? 'w-1/2' : 'w-1/3'} flex-shrink-0 px-4 relative group cursor-pointer`}
                      onMouseEnter={() => setHoveredCard(caseItem._id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Card Container */}
                      <div className="relative overflow-hidden rounded-3xl aspect-square mb-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '2px solid rgba(255, 255, 255, 0.8)'
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
                          {/* Success Story Image */}
                          <div className="absolute inset-4 rounded-2xl overflow-hidden" style={{
                            background: 'linear-gradient(135deg, rgba(191, 166, 160, 0.1) 0%, rgba(191, 166, 160, 0.2) 100%)'
                          }}>
                            {caseItem.img ? (
                              <img 
                                src={caseItem.img && caseItem.img.startsWith('http') ? caseItem.img : `${API_URL}/uploads/${caseItem.img}`} 
                                alt={`Before and after results for ${caseItem.title} treatment`}
                                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                                loading="lazy"
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

                          {/* Success Badge */}
                          <div className="absolute top-4 left-4 z-10">
                            <span className="text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg text-white" style={{
                              background: 'linear-gradient(90deg, #D4AF37 0%, #DCAE96 100%)'
                            }}>
                              ✨ Success
                            </span>
                          </div>

                          {/* Hover Description Overlay */}
                          {hoveredCard === caseItem._id && (
                            <div className="absolute inset-4 bg-gradient-to-t from-gray-900/95 via-gray-900/70 to-transparent flex items-end rounded-2xl transition-opacity duration-200">
                              <div className="text-white p-6">
                                <p className="text-gray-200 text-sm leading-relaxed mb-3">
                                  {caseItem.description || "Amazing transformation achieved through our expert care and advanced treatment methods."}
                                </p>
                                
                                {/* Success indicators */}
                                <div className="flex items-center space-x-1">
                                  {[...Array(caseItem.rating || 5)].map((_, index) => (
                                    <Star key={index} className="w-3 h-3 fill-current" style={{ color: '#D4AF37' }} />
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Case Title */}
                      <h3 className="text-center font-bold text-xl font-serif transition-all duration-200" style={{
                        color: hoveredCard === caseItem._id ? '#D4AF37' : '#333333'
                      }}>
                        {caseItem.title || 'Success Story'}
                      </h3>
                      {caseItem.category && (
                        <p className="text-center text-sm mt-2" style={{ color: '#999999' }}>
                          {caseItem.category}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons - Below Cards */}
              {totalSlides > 0 && (
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
                <Award className="w-20 h-20 mx-auto mb-6" />
              </div>
              <h3 className="text-2xl font-semibold text-neutral-1 mb-3 font-serif">
                No success stories available yet
              </h3>
              <p className="text-neutral-2">
                Check back soon to see amazing transformations from our patients.
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
                  Ready to Start Your Success Story?
                </h3>
                <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: '#666666' }}>
                  Join thousands of patients who have experienced life-changing results. Book a consultation with our expert team and begin your transformation journey today.
                </p>
                <button 
                  onClick={handleWhatsAppClick}
                  className="font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 text-lg group transform hover:scale-105 hover:shadow-xl inline-flex items-center gap-3"
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
                  <Heart className="w-5 h-5" />
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

export default BeforeAfter;