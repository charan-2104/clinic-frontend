import { useEffect } from 'react';

const StructuredData = ({ faqs = [], doctors = [] }) => {
  useEffect(() => {
    // LocalBusiness Schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Dr. Akhila's Aesthetics",
      "description": "Premium dermatology and aesthetic clinic offering advanced skincare treatments in a luxury environment",
      "url": "https://drakhilasaesthetics.com",
      "logo": "https://res.cloudinary.com/dwneh65hw/image/upload/v1754491750/logo-gold_iwaplf.png",
      "image": "https://res.cloudinary.com/dwneh65hw/image/upload/v1755286204/ban1_t6tq3o.jpg",
      "telephone": "+91-9505985010",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "17.3850",
        "longitude": "78.4867"
      },
      "openingHours": "Mo-Su 11:00-20:00",
      "priceRange": "₹₹",
      "medicalSpecialty": "Dermatology",
      "availableService": [
        {
          "@type": "MedicalProcedure",
          "name": "Skin Treatments",
          "description": "Advanced dermatological treatments for various skin conditions"
        },
        {
          "@type": "MedicalProcedure", 
          "name": "Aesthetic Procedures",
          "description": "Cosmetic dermatology and aesthetic treatments"
        },
        {
          "@type": "MedicalProcedure",
          "name": "Hair Treatments", 
          "description": "Trichology and hair care treatments"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/p/DGSwG4ey7RP/?hl=en",
        "https://www.youtube.com/channel/UCKJIlcCNzIFwQBP1AycUkVg"
      ]
    };

    // Person Schema for Dr. Akhila
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Dr. K.Akhila Sai",
      "jobTitle": "Founder and Director",
      "worksFor": {
        "@type": "MedicalBusiness",
        "name": "Dr. Akhila's Aesthetics"
      },
      "medicalSpecialty": ["Cosmetology", "Trichology"],
      "description": "Founder and Director of Dr. Akhila's Aesthetics with expertise in cosmetology and trichology",
      "image": "https://res.cloudinary.com/dwneh65hw/image/upload/v1755358641/doctors/doctor-1755358637859-88142525.jpg"
    };

    // FAQPage Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };

    // Add schemas to document head
    const addSchema = (schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    // Clear existing schemas
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Add new schemas
    addSchema(localBusinessSchema);
    addSchema(personSchema);
    if (faqs.length > 0) {
      addSchema(faqSchema);
    }

    // Cleanup function
    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => script.remove());
    };
  }, [faqs, doctors]);

  return null; // This component doesn't render anything
};

export default StructuredData;
