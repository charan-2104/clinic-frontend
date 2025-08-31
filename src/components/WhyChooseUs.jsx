import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Award, Shield, Clock, Heart, Users, Star, Sparkles, Zap, Crown } from 'lucide-react';

const reasons = [
  {
    icon: Crown,
    title: 'Premium Experience',
    description: 'Luxury environment designed for your comfort with state-of-the-art facilities and personalized care.',
    color: 'from-accent-gold to-optional-dusty-rose',
  },
  {
    icon: Award,
    title: 'Expert Specialists',
    description: 'Board-certified dermatologists with specialized training in aesthetic and medical dermatology.',
    color: 'from-accent-gold to-optional-dusty-rose',
  },
  {
    icon: Shield,
    title: 'Advanced Technology',
    description: 'Cutting-edge treatments and latest medical technology for optimal results and safety.',
    color: 'from-accent-gold to-optional-dusty-rose',
  },
  {
    icon: Heart,
    title: 'Personalized Care',
    description: 'Individualized treatment plans tailored to your unique skin concerns and aesthetic goals.',
    color: 'from-accent-gold to-optional-dusty-rose',
  },
  {
    icon: Clock,
    title: 'Convenient Hours',
    description: 'Flexible scheduling with extended hours to accommodate your busy lifestyle.',
    color: 'from-accent-gold to-optional-dusty-rose',
  },
  {
    icon: Sparkles,
    title: 'Transformative Results',
    description: 'Proven track record of delivering natural-looking, long-lasting aesthetic improvements.',
    color: 'from-accent-gold to-optional-dusty-rose',
  }
];

const WhyChooseUs = () => {
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation();
  const { ref: reasonsRef, isInView: reasonsInView } = useScrollAnimation();
  const { ref: statsRef, isInView: statsInView } = useScrollAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="section-padding bg-gradient-to-br from-secondary-charcoal to-secondary-charcoal/95" aria-labelledby="why-choose-heading">
      <div className="container-custom">
        <motion.div 
          ref={titleRef}
          initial={{ opacity: 0, y: 50 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 id="why-choose-heading" className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 font-serif">
            Why Choose <span style={{ 
              background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Akhila's Aesthetics</span>
          </h2>
          <p className="text-xl text-neutral-1 max-w-4xl mx-auto leading-relaxed">
            We combine medical excellence with luxury experience to deliver transformative results 
            in an environment designed for your comfort and confidence.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-accent-gold to-optional-dusty-rose mx-auto rounded-full mt-8"></div>
        </motion.div>

        <motion.div 
          ref={reasonsRef}
          variants={containerVariants}
          initial="hidden"
          animate={reasonsInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reasons.map((reason, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover="hover"
              className="card-premium p-10 text-center group relative overflow-hidden"
            >
              {/* Background decorative element */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent-gold/10 to-optional-dusty-rose/10 rounded-full -translate-y-12 translate-x-12"></div>
              
              <div className={`w-20 h-20 bg-gradient-to-br ${reason.color} rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <reason.icon className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-secondary-charcoal mb-6 group-hover:text-accent-gold transition-colors duration-300 font-serif">
                {reason.title}
              </h3>
              
              <p className="text-neutral-1 leading-relaxed text-lg">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          ref={statsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="card-premium p-12 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-accent-gold/5 to-optional-dusty-rose/5 rounded-full -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-optional-dusty-rose/5 to-accent-gold/5 rounded-full translate-x-16 translate-y-16"></div>
            
            <h3 className="text-4xl font-bold text-secondary-charcoal mb-8 font-serif">
              Trusted by Thousands of Patients
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '100%', label: 'Safe Procedures', icon: Shield },
                { number: '98%', label: 'Patient Satisfaction', icon: Star },
                { number: '1K+', label: 'Happy Patients', icon: Users },
                { number: '5+', label: 'Years Experience', icon: Award },
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-gold to-optional-dusty-rose rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gradient-luxury mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-neutral-1 font-medium text-lg">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs; 