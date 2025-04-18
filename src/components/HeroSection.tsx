
import React, { useEffect, useState } from 'react';
import GlowingButton from './ui/GlowingButton';
import SplineEmbed from './SplineEmbed';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="min-h-screen relative flex flex-col justify-center overflow-hidden pt-20">
      {/* Background overlay for depth */}
      <div className="absolute inset-0 bg-pure-black bg-opacity-90 z-0"></div>

      <div className="container mx-auto px-4 flex flex-col items-center relative z-10">
        {/* LNCTS Branding */}
        <div className={`flex flex-col items-center mb-8 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center mb-4">
            <img 
              src="/lovable-uploads/d0d91038-ce9b-4dbb-a8a0-4f20564d2338.png" 
              alt="LNCTS Emblem" 
              className="h-20 w-20 mr-4"
            />
            <h3 className="text-healthcare-blue text-lg md:text-xl font-medium">Autonomous Engineering College</h3>
          </div>
        </div>

        {/* Main Title with staggered animation */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-4 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`} 
            style={{ animationDelay: '0.3s' }}
          >
            <span className="block">Healthcare Management System:</span>
            <span className="block mt-2 glow-text-blue">An AI-Driven Solution</span>
          </h1>
          
          <h2 className={`text-xl md:text-2xl text-pure-white/90 mb-8 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`} 
            style={{ animationDelay: '0.5s' }}
          >
            SRIJAN 2024 Project | Guided by Dr. Bhawana Pillai, Ph.D. (Computer Science)
          </h2>
        </div>

        {/* CTA Button */}
        <div className={`mb-16 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.7s' }}>
          <GlowingButton size="lg" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore the Platform
          </GlowingButton>
        </div>

        {/* 3D Spline Embed */}
        <div className={`w-full max-w-5xl mx-auto opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.9s' }}>
          <SplineEmbed 
            url="https://my.spline.design/dnagreen-eqre8ofsRcDJLOVVoBxf1jJB/" 
            height="500px"
            title="DNA 3D Model" 
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-pure-white/50 text-sm mb-2">Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
