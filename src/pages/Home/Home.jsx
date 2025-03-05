import React, { useState, useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import TechStack from '../../components/TechStack/TechStack';
import ValueProposition from '../../components/ValueProposition/ValueProposition';
import FeaturedProject from '../../components/FeaturedProject/FeaturedProject';
import TestimonialsSection from '../../components/TestimonialsSection/TestimonialsSection';
import CtaSection from '../../components/CtaSection/CtaSection';
import './Home.css';

const Home = () => {
  const [data, setData] = useState({
    banner: null,
    techStack: null,
    valueProps: null,
    featuredProject: null,
    testimonials: null,
    ctaContent: null
  });

  // Chargement parallèle de toutes les données
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch('/data/banner.json'),
          fetch('/data/techStack.json'),
          fetch('/data/valueProps.json'),
          fetch('/data/featuredProject.json'),
          fetch('/data/testimonials.json'),
          fetch('/data/ctaContent.json')
        ]);

        const [banner, techStack, valueProps, featuredProject, testimonials, ctaContent] = 
          await Promise.all(responses.map(response => response.json()));

        setData({
          banner,
          techStack,
          valueProps,
          featuredProject,
          testimonials,
          ctaContent
        });
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      {/* Section Banner (anciennement Hero) */}
      <Banner data={data.banner} />
      
      {/* Section Technologies */}
      <TechStack data={data.techStack} />
      
      {/* Section Proposition de valeur */}
      <ValueProposition data={data.valueProps} />
      
      {/* Section Projet en vedette */}
      <FeaturedProject data={data.featuredProject} />
      
      {/* Section Témoignages */}
      <TestimonialsSection data={data.testimonials} />
      
      {/* Section CTA */}
      <CtaSection data={data.ctaContent} />
    </div>
  );
};

export default Home;