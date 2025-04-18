
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProblemStatement from '../components/ProblemStatement';
import FeatureGrid from '../components/FeatureGrid';
import AboutProject from '../components/AboutProject';
import FutureScope from '../components/FutureScope';
import SocietalImpact from '../components/SocietalImpact';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "LNCTS Healthcare Management System - AI for Better Patient Care";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'An AI-powered platform tackling appointment delays, medicine delivery, chronic care, and rural access.');
    }
    
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-pure-black text-pure-white min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemStatement />
        <FeatureGrid />
        <AboutProject />
        <FutureScope />
        <SocietalImpact />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
