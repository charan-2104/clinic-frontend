import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Youtube, Linkedin, ArrowUp, MessageCircle } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/919063271426?text=Hi%20Akhilas%20Aesthetics%2C%20I%20have%20a%20query`,'_blank');
  };

  const handleQuickLinkClick = (e, sectionName) => {
  e.preventDefault();

  const id = sectionName.toLowerCase().replace(/\s+/g, '');
  const section = document.getElementById(id);

  if (section) {
    const yOffset = -80;
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5, 
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
        duration: 0.4, 
        ease: "easeOut"
      }
    }
  };

  return (
    <footer id="contact" className="bg-secondary-charcoal text-white relative overflow-hidden" role="contentinfo" aria-labelledby="contact-heading">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-accent-gold/5 to-optional-dusty-rose/5 rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-optional-dusty-rose/5 to-accent-gold/5 rounded-full translate-x-40 translate-y-40"></div>
      
      <div className="container-custom section-padding relative z-10">
        <motion.div 
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Company Info */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="flex items-center space-x-3 mb-8">
              <div className="flex items-center">
              <img 
                src="https://res.cloudinary.com/dwneh65hw/image/upload/v1754491750/logo-gold_iwaplf.png" 
                alt="Dr. Akhila's Aesthetics Logo" 
                className="w-12 h-12 md:w-20 md:h-20 object-contain filter drop-shadow-2xl contrast-125"
                loading="lazy"
              />
              <span className={`font-serif font-bold text-lg md:text-xl ml-0 md:-ml-3 transition-colors duration-200 text-accent-gold`}>
                Dr.Akhila's Aesthetics
              </span>
            </div>
            </div>
            <p className="text-neutral-1 mb-8 max-w-lg text-lg leading-relaxed">
              Experience premium dermatology and aesthetic treatments in a luxury environment designed for your comfort and confidence.
            </p>
            <div className="flex space-x-4">
              {/* Instagram */}
              <motion.a 
                href="https://www.instagram.com/p/DGSwG4ey7RP/?hl=en" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-accent-gold to-optional-dusty-rose rounded-xl flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-lg" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-6 h-6 text-white" />
              </motion.a>
              {/* Youtube */}
              <motion.a 
                href="https://www.youtube.com/channel/UCKJIlcCNzIFwQBP1AycUkVg" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-accent-gold to-optional-dusty-rose rounded-xl flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-lg" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="w-6 h-6 text-white" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 id="contact-heading" className="text-xl font-semibold mb-8 font-serif">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About', 'Treatments', 'Doctors', 'Testimonials', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '')}`} 
                    onClick={(e) => handleQuickLinkClick(e, link)}
                    className="text-neutral-1 hover:text-accent-gold transition-colors duration-200 text-lg" 
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-8 font-serif">Treatments</h3>
            <ul className="space-y-4">
              {[
                'Skin Treatments',
                'Laser Therapy', 
                'Anti-Aging',
                'Chemical Peel',
                'Botox & Fillers',
                'Hair Restoration'
              ].map((service) => (
                <li key={service}>
                  <a 
                    href="#treatments" 
                    onClick={(e) => handleQuickLinkClick(e,'treatments')}
                    className="text-neutral-1 hover:text-accent-gold transition-colors duration-200 text-lg" 
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Contact & Map Section */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold mb-8 font-serif">Get in Touch</h3>
            <div className="space-y-8">
              <motion.div 
                className="flex items-start space-x-6"
                whileHover={{ x: 5 }} 
                transition={{ duration: 0.2 }} 
              >
                <div className="w-12 h-12 bg-gradient-to-br from-accent-gold to-optional-dusty-rose rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-lg">Address</h4>
                  <p className="text-neutral-1 leading-relaxed">
                    3rd Floor, Plot 190C,<br />
                    High-Tension Line Road,<br />
                    Above iPremium Apple Service Center,<br />
                    Raghavendra Colony, Kondapur,<br />
                    Hyderabad, Telangana – 500084
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-6"
                whileHover={{ x: 5 }} 
                transition={{ duration: 0.2 }} 
              >
                <div className="w-12 h-12 bg-gradient-to-br from-accent-gold to-optional-dusty-rose rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-lg">Phone</h4>
                  <p className="text-neutral-1">+91 9505985010<br />Emergency: +91 9063271426</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-6"
                whileHover={{ x: 5 }}  
                transition={{ duration: 0.2 }} 
              >
                <div className="w-12 h-12 bg-gradient-to-br from-accent-gold to-optional-dusty-rose rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-lg">Email</h4>
                  <p className="text-neutral-1">
                    akhilaaesthetics@gmail.com<br />
                    drakhilasai@gmail.com
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold mb-8 font-serif">Find Us</h3>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-accent-gold/20">
              <iframe
                title="Clinic Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.7967921640457!2d78.3630592958307!3d17.469437560469505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93f04cff464b%3A0xc1ea4d4b480873f3!2sDr.%20Akhila%E2%80%99s%20Aesthetics%20Skin%20Hair%20Laser%20Permanent%20Makeup%20Studio!5e0!3m2!1sen!2sin!4v1753626152107!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <motion.a
                href="https://www.google.com/maps/dir/?api=1&destination=17.469543629622994,78.36162573552707"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-accent-gold to-accent-gold/90 hover:from-accent-gold/90 hover:to-accent-gold text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 text-center" 
                whileHover={{ scale: 1.01 }} 
                whileTap={{ scale: 0.98 }}
              >
                Get Directions
              </motion.a>
              
              <motion.button
                onClick={handleWhatsAppClick}
                className="flex-1 bg-gradient-to-r from-accent-gold to-accent-gold/90 hover:from-accent-gold/90 hover:to-accent-gold text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 flex items-center justify-center gap-2" 
                whileHover={{ scale: 1.01 }} 
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-accent-gold/20 pt-8"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-1 text-lg text-center mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Dr.Akhila's Aesthetics. All rights reserved.
            </p>
            <motion.button
              onClick={scrollToTop}
              className="w-12 h-12 bg-gradient-to-br from-accent-gold to-optional-dusty-rose rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200" 
              whileHover={{ scale: 1.05, y: -3 }} 
              whileTap={{ scale: 0.95 }} 
            >
              <ArrowUp className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 