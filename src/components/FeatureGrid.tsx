
import React, { useEffect, useRef } from 'react';
import { Calendar, Shield, Truck, Heart, Wallet, Radio } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  benefit: string;
  solves: string;
  color: 'blue' | 'green';
  index: number;
}

const FeatureCard = ({ icon, title, benefit, solves, color, index }: FeatureCardProps) => {
  return (
    <div 
      className={`bg-pure-black border border-gray-800 rounded-xl p-6 transition-all duration-500 transform hover:scale-105 opacity-0 animate-fade-in-up`}
      style={{ animationDelay: `${0.1 + index * 0.15}s` }}
    >
      <div className={`text-4xl mb-4 ${color === 'blue' ? 'text-healthcare-blue' : 'text-healthcare-green'}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-pure-white/80 mb-4">{benefit}</p>
      <div className={`text-sm font-medium px-3 py-1.5 rounded-full inline-flex items-center ${
        color === 'blue' ? 'bg-healthcare-blue/20 text-healthcare-blue' : 'bg-healthcare-green/20 text-healthcare-green'
      }`}>
        <span>{solves}</span>
      </div>
    </div>
  );
};

const FeatureGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: <Calendar className="stroke-current" />,
      title: "1-Click Appointments",
      benefit: "AI-driven scheduling that adapts to patient and doctor availability",
      solves: "Reduces wait by 70%",
      color: 'blue' as const
    },
    {
      icon: <Shield className="stroke-current" />,
      title: "Verified Hospitals",
      benefit: "Curated listings of healthcare providers with detailed information",
      solves: "Curated by specialty & location",
      color: 'green' as const
    },
    {
      icon: <Truck className="stroke-current" />,
      title: "Medicine Delivery",
      benefit: "Fast and reliable delivery of prescription medications",
      solves: "Same-day access even in rural areas",
      color: 'blue' as const
    },
    {
      icon: <Heart className="stroke-current" />,
      title: "Health Updates",
      benefit: "Regular communication with healthcare providers for monitoring",
      solves: "Doctor-patient check-ins",
      color: 'green' as const
    },
    {
      icon: <Wallet className="stroke-current" />,
      title: "Unified Payments",
      benefit: "Centralized billing and payment system for all healthcare services",
      solves: "Secure, one-place billing",
      color: 'blue' as const
    },
    {
      icon: <Radio className="stroke-current" />,
      title: "Rural Telemedicine",
      benefit: "Remote consultation capabilities for underserved areas",
      solves: "Real-time remote consultations",
      color: 'green' as const
    }
  ];

  return (
    <section id="features" ref={sectionRef} className="section bg-pure-black">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Our Platform's <span className="text-healthcare-green glow-text-green">Transformative</span> Features
        </h2>
        <p className="text-pure-white/70 text-center max-w-2xl mx-auto mb-16">
          Innovative AI solutions that address the most pressing healthcare access challenges
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              benefit={feature.benefit}
              solves={feature.solves}
              color={feature.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
