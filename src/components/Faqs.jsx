import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ChevronDown, MessageCircle, Phone, Mail } from 'lucide-react';

const Faqs = ({ onFaqsLoaded }) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation();
  const { ref: faqsRef, isInView: faqsInView } = useScrollAnimation();
  const { ref: ctaRef, isInView: ctaInView } = useScrollAnimation();

  // Static fallback data
  const staticFaqs = [
    { 
      _id: '1',
      q: "How can I book an appointment at Dr. Akhila's Aesthetics?", 
      a: "Booking is easy and flexible! You can simply WhatsApp us, give us a call, or even walk in directly. We're here to make your skin journey smooth from the very first step." 
    },
    { 
      _id: '2',
      q: "What are the working hours of Dr. Akhila's Aesthetics?", 
      a: "We're open from 11 Am to 8 Pm, Sunday to Monday. Just drop in during those hours, and let's get that glow started." 
    },
    { 
      _id: '3',
      q: "What is the consultation fee at Dr. Akhila's Aesthetics?", 
      a: "Our consultation fee is ₹500, and trust us it's worth every bit for the level of personalized care and expert advice you receive."
    },
    { 
      _id: '4',
      q: "Are treatments at Dr. Akhila's Aesthetics safe and approved?", 
      a: "Absolutely! Every treatment we offer is clinically approved, dermatologist-tested, and performed with top-grade safety standards. Your skin is in expert hands." 
    },
    { 
      _id: '5',
      q: "Are the dermatologists at Dr. Akhila's Aesthetics qualified and experienced?", 
      a: "Yes! Dr. Akhila and the team are highly qualified professionals with years of hands-on experience in treating a wide range of skin concerns. You're not just getting a treatment you're getting expertise" 
    },
    { 
      _id: '6',
      q: "Why choose Dr. Akhila's Aesthetics over other dermatology clinics in Hyderabad?", 
      a: "Because we don't just treat skin we transform confidence. With cutting-edge technology, personalized care, and a calm, luxurious atmosphere, we're redefining skin care standards in Hyderabad." 
    },
    { 
      _id: '7',
      q: "Is treatment at Dr. Akhila's Aesthetics safe for all skin types?", 
      a: "Yes, our treatments are customized to suit every skin type from oily and dry to sensitive and combination. Your skin's uniqueness is always respected and catered to." 
    },
    { 
      _id: '8',
      q: "Are treatments at Dr. Akhila's Aesthetics suitable for sensitive skin?", 
      a: "Definitely. We use gentle, dermatologist-recommended techniques and products that are perfectly safe for even the most sensitive skin types." 
    },
  ];

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/faqs`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFaqs(data);
        if (onFaqsLoaded) {
          onFaqsLoaded(data);
        }
      } catch (error) {
        setFaqs(staticFaqs);
        if (onFaqsLoaded) {
          onFaqsLoaded(staticFaqs);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [onFaqsLoaded]);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/919505985010?text=Hi%20Dr.Akhila's%20Aesthetics%2C%20I%20have%20a%20query`,'_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const accordionVariants = {
    closed: { 
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: { 
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const displayFaqs = loading ? staticFaqs : faqs;

  return (
    <section id="faqs" className="section-padding bg-gradient-to-br from-highlight-pearl to-primary-ivory" aria-labelledby="faqs-heading">
      <div className="container-custom">
        <motion.div 
          ref={titleRef}
          initial={{ opacity: 0, y: 50 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 id="faqs-heading" className="text-5xl sm:text-6xl lg:text-7xl font-bold text-secondary-charcoal mb-8 font-serif">
            Frequently Asked <span style={{ 
              background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Questions</span>
          </h2>
          <p className="text-xl text-neutral-1 max-w-4xl mx-auto leading-relaxed">
            Find answers to common questions about our premium dermatology services, treatments, and procedures.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-accent-gold to-optional-dusty-rose mx-auto rounded-full mt-8"></div>
        </motion.div>

        <motion.div 
          ref={faqsRef}
          variants={containerVariants}
          initial="hidden"
          animate={faqsInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-6">
            {displayFaqs.map((faq, i) => (
              <motion.div 
                key={faq._id || i}
                variants={itemVariants}
                className="card-premium overflow-hidden group"
              >
                <motion.button 
                  className="w-full text-left p-8 flex justify-between items-center hover:bg-accent-gold/5 transition-all duration-300 border-l-4 border-transparent group-hover:border-accent-gold"
                  onClick={() => setOpen(open === i ? null : i)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                  aria-label={`Toggle answer for: ${faq.q}`}
                >
                  <h3 id={`faq-question-${i}`} className="text-xl font-semibold text-secondary-charcoal pr-6 group-hover:text-accent-gold transition-colors duration-300 font-serif">
                    {faq.q}
                  </h3>
                  <div className="flex-shrink-0">
                    <motion.div 
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        open === i 
                          ? 'border-accent-gold bg-accent-gold' 
                          : 'border-neutral-2 group-hover:border-accent-gold'
                      }`}
                      animate={{ rotate: open === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown 
                        className={`w-5 h-5 transition-colors duration-300 ${
                          open === i 
                            ? 'text-white' 
                            : 'text-neutral-2 group-hover:text-accent-gold'
                        }`} 
                      />
                    </motion.div>
                  </div>
                </motion.button>
                
                <AnimatePresence>
                  {open === i && (
                    <motion.div 
                      id={`faq-answer-${i}`}
                      variants={accordionVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="overflow-hidden"
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                    >
                      <div className="px-8 pb-8 text-neutral-1 leading-relaxed text-lg">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          ref={ctaRef}
          initial={{ opacity: 0, y: 50 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="card-premium p-12 max-w-4xl mx-auto relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-accent-gold/5 to-optional-dusty-rose/5 rounded-full -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-optional-dusty-rose/5 to-accent-gold/5 rounded-full translate-x-16 translate-y-16"></div>
            
            <h3 className="text-4xl font-bold text-secondary-charcoal mb-6 font-serif">
              Still Have Questions?
            </h3>
            <p className="text-xl text-neutral-1 mb-8 max-w-2xl mx-auto leading-relaxed">
              Our expert team is here to help. Contact us for personalized assistance and professional medical advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button 
                onClick={handleWhatsAppClick}
                className="btn-primary text-lg px-8 py-4 group"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(212, 175, 55, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </span>
              </motion.button>
              <motion.button 
                className="btn-outline text-lg px-8 py-4 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href=`tel:+919505985010`}
              >
                <span className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  Call Now
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Faqs;