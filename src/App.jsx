import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import AboutUs from './components/AboutUs';
import Doctors from './components/Doctors';
import WhyChooseUs from './components/WhyChooseUs';
import OurServices from './components/OurServices';
import BeforeAfter from './components/BeforeAfter';
import Testimonials from './components/Testimonials';
import Faqs from './components/Faqs';
import Footer from './components/Footer';
import Admin from './components/Admin';
import PageNotFound from './components/PageNotFound';
import VideoGallery from './components/VideoGallery';
import LuxuryGallery from './components/LuxaryGallery';
import StructuredData from './components/StructuredData';

function App() {
  const [faqs, setFaqs] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={
          <div className="bg-slate-50 min-h-screen">
            <StructuredData faqs={faqs} />
            <header role="banner">
              <Navbar />
            </header>
            <HeroBanner />
            <main className="relative z-10" role="main">
              <AboutUs />
              <Doctors />
              <WhyChooseUs />
              <OurServices />
              <BeforeAfter />
              <LuxuryGallery />
              <Testimonials />
              <VideoGallery />
              <Faqs onFaqsLoaded={setFaqs} />
            </main>
            <Footer />
          </div>
        } />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
