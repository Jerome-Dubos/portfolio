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
      
      <TechStack />
      
      <ValueProposition />
      
      <FeaturedProject />
      
      <TestimonialsSection />
      
      <CtaSection />
    </div>
  );
};

export default Home;
