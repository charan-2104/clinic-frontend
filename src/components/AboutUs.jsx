import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Award, Users, Clock, Star, Heart, Shield } from 'lucide-react';

const AboutUs = () => {
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation();
  const { ref: contentRef, isInView: contentInView } = useScrollAnimation();
  const { ref: statsRef, isInView: statsInView } = useScrollAnimation();
  const { ref: featuresRef, isInView: featuresInView } = useScrollAnimation();

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

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.9 }, 
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3, 
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="section-padding bg-gradient-to-br from-highlight-pearl to-primary-ivory" aria-labelledby="about-heading">
      <div className="container-custom">
        <motion.div 
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }} 
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }} 
          className="text-center mb-20"
        >
          <motion.h2 
            id="about-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-secondary-charcoal mb-8 font-serif"
            variants={itemVariants}
          >
            About <span style={{ 
              background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Dr.Akhila's Aesthetics</span>
          </motion.h2>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-accent-gold to-optional-dusty-rose mx-auto rounded-full"
            variants={itemVariants}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div 
            ref={contentRef}
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h3 
              className="text-3xl sm:text-4xl font-semibold text-secondary-charcoal font-serif"
              variants={itemVariants}
            >
              Where Luxury Meets Dermatology
            </motion.h3>
            <motion.p 
              className="text-xl text-neutral-1 leading-relaxed"
              variants={itemVariants}
            >
              Welcome to Dr.Akhila's Aesthetics, where we combine medical excellence with aesthetic artistry. 
              Our premium dermatology clinic offers a sanctuary where advanced medical treatments meet 
              luxurious comfort, creating an experience that transcends traditional healthcare.
            </motion.p>
            <motion.p 
              className="text-xl text-neutral-1 leading-relaxed"
              variants={itemVariants}
            >
              Our team of board-certified dermatologists and aesthetic specialists are dedicated to 
              delivering personalized care that enhances your natural beauty while maintaining the highest 
              standards of medical safety and efficacy.
            </motion.p>
            
            {/* Stats */}
            <motion.div 
              ref={statsRef}
              initial={{ opacity: 0, y: 20 }} 
              animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              {[
                { number: '5+', label: 'Years of Excellence', icon: Award },
                { number: '1K+', label: 'Happy Patients', icon: Users },
                { number: '24/7', label: 'Premium Support', icon: Clock }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center group"
                  variants={statsVariants}
                  whileHover={{ scale: 1.02 }} 
                  transition={{ delay: index * 0.05, duration: 0.2 }} 
                >
                  <div className="text-4xl sm:text-5xl font-bold text-gradient-luxury mb-3 group-hover:scale-105 transition-transform duration-200">
                    {stat.number}
                  </div>
                  <div className="text-neutral-1 font-medium text-lg">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div 
            ref={contentRef}
            initial={{ opacity: 0, x: 30 }} 
            animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }} 
            className="relative"
          >
            <div className="relative z-10">
              <motion.img
                src="https://res.cloudinary.com/dwneh65hw/image/upload/v1754231046/Screenshot_2025-08-03_195341_lkszd8.jpg"
                alt="Luxury dermatology clinic"
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
                whileHover={{ scale: 1.01 }} 
                transition={{ duration: 0.2 }}
              />
            </div>
            {/* Decorative elements - Simplified */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-accent-gold to-optional-dusty-rose rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-optional-dusty-rose to-accent-gold rounded-full opacity-20"></div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div 
          ref={featuresRef}
          initial={{ opacity: 0, y: 30 }} 
          animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 mt-20"
        >
          {[
            {
              icon: Award,
              title: "Expert Care",
              description: "Our board-certified dermatologists combine medical excellence with aesthetic artistry."
            },
            {
              icon: Shield,
              title: "Advanced Technology",
              description: "State-of-the-art facilities and cutting-edge treatments for optimal results."
            },
            {
              icon: Heart,
              title: "Luxury Experience",
              description: "Premium care in an environment designed for your comfort and confidence."
            }
          ].map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="card-premium p-10 text-center group"
              whileHover={{ y: -5, scale: 1.01 }} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }} 
            >
              <div className="w-20 h-20 bg-gradient-to-br from-accent-gold to-optional-dusty-rose rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-105 transition-transform duration-200 shadow-lg">
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-semibold text-secondary-charcoal mb-6 font-serif">{feature.title}</h4>
              <p className="text-neutral-1 text-lg leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs; 