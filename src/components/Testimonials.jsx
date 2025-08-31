import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Star, User, Quote, Heart, Award } from 'lucide-react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation();
  const { ref: testimonialsRef, isInView: testimonialsInView } = useScrollAnimation();
  const { ref: ratingRef, isInView: ratingInView } = useScrollAnimation();

  // Static fallback data
  const staticTestimonials = [
    {
      _id: '1',
      name: 'Ravina Panchal',
      role: 'Patient',
      rating: 5,
      review: "I've been getting my hair treatment at this clinic and the results have been great so far. Dr. Akhila is a kind and knowledgeable professional who recommends the right treatments based on your condition. Geeta is friendly, and her head massages are incredibly soothing – they've become one of my favorite parts of the treatment. Overall, I’ve had a great experience and would definitely recommend this clinic.",
    },
    {
      _id: '2',
      name: 'Rapole Suman',
      role: 'Patient',
      rating: 5,
      review: "I have been to India for a month and went to Dr. Akhila for my skin concerns.. She is an amazing Doctor who listened to all my skin concerns and treated me so well with Ultra glow facials.. And my skin is glowing so well that I feel I don’t need any makeup on, my pigmentation and my pimples are all gone..If someone asks me for my suggestions for their skin concerns. I would definitely recommend Dr.Akhila. Thank you so much mam for all your help 🙏. Now I feel so confident with my skin..💕"
    },
    {
      _id: '3',
      name: 'Samena Begum',
      role: 'Patient',
      rating: 5,
      review: "Dr. Akhila understands your query about skin and hair. Let you understand the approach towards your treatment just to get comfortable and ease with it. I've been consulting doctor from past six months for the combination treatment of MNRF, ultra whitening and hydra facial it gave me the best results. Doctor helps you to achieve the better version of yourself with every possible way she could do. The services she provides gives you the best results",
    },
    {
      _id: '4',
      name: 'ANIL KUMAR GUPTA (YASH)',
      role: 'Patient',
      rating: 5,
      review: "Excellent Laser Hair Removal Service! Tried laser hair removal at Dr. Akhila’s Aesthetics, and the results are amazing! No more waxing or shaving – my skin is smoother than ever. The staff is very friendly, and the clinic is clean and well-maintained. Highly recommended!",
    },
    {
      _id: '5',
      name: 'Poonam Gupta',
      role: 'Patient',
      rating: 5,
      review: "Amazing Skin & Hair Treatment! I had an incredible experience at Dr. Akhila’s Aesthetics! The staff is highly professional, and the treatments are top-notch. My skin feels so much healthier after the facial and laser treatment. Highly recommended for anyone looking for expert skincare solutions",
    },
    {
      _id: '6',
      name: 'Preethi Mallanagari',
      role: 'Patient',
      rating: 5,
      review: "I have visited this studio for laser hair removal as I had strawberry skin. After 2 sessions only I could see 50% change in my skin. Dr. Akhila explains everything and very good at her work. I have also done hydra facial and my face looks so radiant.",
    },
  ];
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_URL}/api/testimonials`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        setTestimonials(staticTestimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % staticTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [staticTestimonials.length]);

  const displayTestimonials = loading ? staticTestimonials : testimonials;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2, 
        when: "beforeChildren",
        staggerChildren: 0.02 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 }, 
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15, 
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hover: {
      y: -2, 
      transition: {
        duration: 0.1, 
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id='testimonials' className="py-20" style={{ background: 'linear-gradient(135deg, #FAF9F6 0%, #FFFFF0 50%, #FAF9F6 100%)' }} aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={titleRef}
          initial={{ opacity: 0, y: 15 }} 
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.2 }} 
          className="text-center mb-20"
        >
          <h2 id="testimonials-heading" className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 font-serif" style={{ color: '#333333' }}>
            What Our <span style={{ 
              background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Patients Say</span>
          </h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: '#BFA6A0' }}>
            Don't just take our word for it. Here's what our patients have to say about their transformative experience at Dr.Akhila's Aesthetics.
          </p>
          <div className="w-32 h-1 mx-auto rounded-full mt-8" style={{ 
            background: 'linear-gradient(90deg, #D4AF37 0%, #DCAE96 100%)' 
          }}></div>
        </motion.div>

        {/* Featured Testimonial Carousel */}
        <motion.div 
          ref={testimonialsRef}
          variants={containerVariants}
          initial="hidden"
          animate={testimonialsInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }} 
                transition={{ duration: 0.15 }} 
                className="bg-white rounded-2xl overflow-hidden shadow-xl border p-8 sm:p-12 text-center relative"
                style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}
              >
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-32 h-32 rounded-full -translate-x-16 -translate-y-16 opacity-60" style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(220, 174, 150, 0.05) 100%)'
                }}></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full translate-x-12 translate-y-12 opacity-60" style={{
                  background: 'linear-gradient(135deg, rgba(220, 174, 150, 0.05) 0%, rgba(212, 175, 55, 0.05) 100%)'
                }}></div>
                {/* Quote Icon */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg" style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)'
                }}>
                  <Quote className="w-8 h-8 text-white" />
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center mb-6">
                  {Array.from({ length: displayTestimonials[currentIndex].rating }).map((_, idx) => (
                    <Star key={idx} className="w-6 h-6 fill-current" style={{ color: '#D4AF37' }} />
                  ))}
                </div>

                {/* Review */}
                <blockquote className="text-lg sm:text-xl leading-relaxed italic font-serif mb-8" style={{ color: '#BFA6A0' }}>
                  "{displayTestimonials[currentIndex].review}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full mr-6 flex items-center justify-center shadow-lg" style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)'
                  }}>
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg" style={{ color: '#333333' }}>{displayTestimonials[currentIndex].name}</h4>
                    <p style={{ color: '#BFA6A0' }}>{displayTestimonials[currentIndex].role}</p>
                    <p className="text-sm font-medium" style={{ color: '#D4AF37' }}>{displayTestimonials[currentIndex].treatment}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-3 mt-8">
              {displayTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-150 ${
                    currentIndex === index 
                      ? 'scale-125' 
                      : 'hover:opacity-80'
                  }`}
                  style={{
                    background: currentIndex === index 
                      ? 'linear-gradient(90deg, #D4AF37 0%, #DCAE96 100%)' 
                      : '#BFA6A0'
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={testimonialsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2 }} 
          className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20"
        >
          {displayTestimonials.slice(0, 6).map((testimonial, i) => (
            <motion.div 
              key={testimonial._id || i} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: i * 0.02 }}
              whileHover="hover"
              className="bg-white rounded-2xl overflow-hidden shadow-xl border p-8 group relative"
              style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}
            >
              {/* Background decorative element */}
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-10 translate-x-10 opacity-60" style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(220, 174, 150, 0.1) 100%)'
              }}></div>
              
              {/* Rating */}
              <div className="flex items-center mb-6">
                {Array.from({ length: testimonial.rating }).map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-current" style={{ color: '#D4AF37' }} />
                ))}
              </div>

              {/* Review */}
              <blockquote className="leading-relaxed italic text-lg mb-6" style={{ color: '#BFA6A0' }}>
                "{testimonial.review}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full mr-4 flex items-center justify-center shadow-lg" style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)'
                }}>
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: '#333333' }}>{testimonial.name}</h4>
                  <p className="text-sm" style={{ color: '#BFA6A0' }}>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Overall Rating */}
        <motion.div 
          ref={ratingRef}
          initial={{ opacity: 0, y: 15 }} 
          animate={ratingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.2, delay: 0.05 }} 
          className="text-center"
        >
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl border p-8 sm:p-12 max-w-4xl mx-auto relative"
               style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}>
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full -translate-x-20 -translate-y-20 opacity-60" style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(220, 174, 150, 0.05) 100%)'
            }}></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full translate-x-16 translate-y-16 opacity-60" style={{
              background: 'linear-gradient(135deg, rgba(220, 174, 150, 0.05) 0%, rgba(212, 175, 55, 0.05) 100%)'
            }}></div>
            
            <div className="flex items-center justify-center mb-6">
              <div className="text-4xl sm:text-6xl font-bold mr-6" style={{ 
                background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>4.9</div>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="w-6 sm:w-8 h-6 sm:h-8 fill-current" style={{ color: '#D4AF37' }} />
                ))}
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 font-serif" style={{ color: '#333333' }}>
              Average Patient Rating
            </h3>
            <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#BFA6A0' }}>
              Based on 2,500+ verified patient reviews and trusted experiences.
            </p>
            <motion.button 
              className="font-bold py-4 px-8 sm:px-10 rounded-full shadow-lg transition-all duration-300 text-base sm:text-lg group transform hover:scale-105 hover:shadow-xl"
              style={{ 
                background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
                color: 'white'
              }}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => window.open('https://www.google.com/search?sxsrf=AE3TifM4QMkYQwESig4wrm7x1kySLKbW-A:1753718287684&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E_juqvfn68GOi0fBgKWAUvj0YFPCkz9y1wzkBvGKjsqSi8LdXn1nOHyyC5ik9cg3KgzEL9an6v4wNbNT7i2h6XC13rxKXSmbZpZLRUrPVKXM8sIuBW7Z9Rb50QuDYbxZbMgyS0GrOJjzhxczj862GL8-rihaACozSS01Q8i5tEJwi2pqhQ%3D%3D&q=Dr.+Akhila%E2%80%99s+Aesthetics+Skin+Hair+Laser+Permanent+Makeup+Studio+Reviews', '_blank')}
            >
              <span className="flex items-center gap-3">
                <Award className="w-5 h-5" />
                Read All Reviews
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;