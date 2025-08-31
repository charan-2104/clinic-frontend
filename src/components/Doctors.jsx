import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Award, Star, MessageCircle, Calendar, Users } from 'lucide-react';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false); 
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation();
  const { ref: doctorsRef, isInView: doctorsInView } = useScrollAnimation();
  const { ref: ctaRef, isInView: ctaInView } = useScrollAnimation();
  const API_URL = import.meta.env.VITE_API_URL;
  // Static fallback data with luxury theme
  const staticDoctors = [
    {
      _id: '1',
      name: 'Dr. K.Akhila Sai ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎',
      degree: 'Founder and Director',
      expertise: '‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎',
      experience: '5+ years',
      img: 'https://res.cloudinary.com/dwneh65hw/image/upload/v1755358641/doctors/doctor-1755358637859-88142525.jpg',
    },
    {
      _id: '2',
      name: 'Dr. Raja Shekar Madala',
      degree: 'MS, M.Ch',
      expertise: 'Consultant Plastic & Cosmetic Surgeon',
      experience: '5+ years',
      img: 'https://res.cloudinary.com/dwneh65hw/image/upload/v1753721498/doctors/doctor-1753721496632-362841009.png',
    },
    {
      _id: '3',
      name: 'Dr.K.S.N. Ravi Teja',
      degree: 'MBBS, MD (DVL)',
      expertise: 'Venerologist & cosmetologist',
      experience: '5+ years',
      img: 'https://res.cloudinary.com/dwneh65hw/image/upload/v1753721102/doctors/doctor-1753721101955-819491987.jpg',
    },
    {
      _id: '4',
      name: 'Dr.R.Aravind Reddy',
      degree: 'MBBS, MD (DVL)',
      expertise: '‎ ‎ ‎ ‎ Consultant Doctor ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎',
      experience: '3+ years',
      img: 'https://res.cloudinary.com/dwneh65hw/image/upload/v1753721620/doctors/doctor-1753721618739-919958953.png',
    },
  ];

  useEffect(() => {
    setDoctors(staticDoctors);
    const fetchDoctors = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000); 
        const response = await fetch(`${API_URL}/api/doctors`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setDoctors(data); 
          }
        }
      } catch (error) {
        console.log('Using static data');
      }
    };
    setTimeout(fetchDoctors, 50);
  }, []);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/919505985010?text=Hi%20Dr.Akhila's%20Aesthetics%2C%20I%20have%20a%20query`,'_blank');
  };

  const displayDoctors = doctors;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };

  return (
    <section id="doctors" className="section-padding bg-gradient-to-br from-highlight-pearl to-primary-ivory" aria-labelledby="doctors-heading">
      <div className="container-custom">
        <motion.div 
          ref={titleRef}
          variants={fadeInUp}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <h2 id="doctors-heading" className="text-5xl sm:text-6xl lg:text-7xl font-bold text-secondary-charcoal mb-8 font-serif">
            Meet Our <span style={{ 
              background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Expert Doctors</span>
          </h2>
          <p className="text-xl text-neutral-1 max-w-4xl mx-auto leading-relaxed">
            Our board-certified dermatologists and aesthetic specialists combine medical excellence 
            with artistic vision to deliver transformative results.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-accent-gold to-optional-dusty-rose mx-auto rounded-full mt-8"></div>
        </motion.div>

        <motion.div 
          ref={doctorsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={doctorsInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {displayDoctors.map((doctor, i) => (
            <motion.div 
              key={doctor._id || i} 
              variants={fadeInUp}
              className="card-premium p-8 text-center group relative overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Background decorative element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent-gold/10 to-optional-dusty-rose/10 rounded-full -translate-y-10 translate-x-10"></div>
              
              <div className="relative mb-8">
                <div className="relative w-48 h-48 mx-auto">
                  <img 
                    src={doctor.img} 
                    alt={`Dr. ${doctor.name} - ${doctor.degree}`} 
                    className="w-full h-full rounded-full object-cover border-4 border-accent-gold/20 shadow-xl group-hover:border-accent-gold/40 group-hover:shadow-2xl transition-all duration-300" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Rating badge */}
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-accent-gold to-optional-dusty-rose rounded-full flex items-center justify-center shadow-lg">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-white fill-current" />
                    <span className="text-white text-sm font-bold">{'5'}</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-secondary-charcoal mb-3 group-hover:text-accent-gold transition-colors duration-300 font-serif">
                {doctor.name}
              </h3>
              <p className="text-accent-gold font-semibold mb-3 text-lg">{doctor.degree}</p>
              <p className="text-neutral-1 mb-4 text-lg leading-relaxed">{doctor.expertise}</p>
              
              {/* Stats */}
              <div className="flex justify-center items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent-gold" />
                  <span className="text-neutral-1 text-sm font-medium">{'1000+'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent-gold" />
                  <span className="text-neutral-1 text-sm font-medium">{doctor.experience}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          ref={ctaRef}
          variants={fadeInUp}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          className="text-center mt-20"
        >
          <div className="card-premium p-12 max-w-4xl mx-auto relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-accent-gold/5 to-optional-dusty-rose/5 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-optional-dusty-rose/5 to-accent-gold/5 rounded-full translate-x-12 translate-y-12"></div>
            
            <h3 className="text-4xl font-bold text-secondary-charcoal mb-6 font-serif">
              Ready to Transform Your Skin?
            </h3>
            <p className="text-xl text-neutral-1 mb-8 max-w-2xl mx-auto leading-relaxed">
              Schedule a consultation with our expert dermatologists and discover the luxury of premium skincare.
            </p>
            <button 
              onClick={handleWhatsAppClick}
              className="btn-primary text-lg px-10 py-5 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5" />
                Schedule Consultation
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Doctors;