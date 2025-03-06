import React from 'react';
import Banner from '../../components/Banner/Banner';
import TechStack from '../../components/TechStack/TechStack';
import ValueProposition from '../../components/ValueProposition/ValueProposition';
import FeaturedProject from '../../components/FeaturedProject/FeaturedProject';
import TestimonialsSection from '../../components/TestimonialsSection/TestimonialsSection';
import CtaSection from '../../components/CtaSection/CtaSection';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Banner />
      
      <div id="tech-stack" className="tech-stack-section">
        <TechStack />
      </div>
      
      <div id="value-proposition" className="value-proposition-section">
        <ValueProposition />
      </div>
      
      <div id="featured-project" className="featured-project-section">
        <FeaturedProject />
      </div>
      
      <div id="testimonials" className="testimonials-section">
        <TestimonialsSection />
      </div>
      
      <div id="cta" className="cta-section">
        <cta-section />
      </div>
    </div>
  );
};

export default Home;