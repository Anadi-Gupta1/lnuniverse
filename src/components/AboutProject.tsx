
import React, { useEffect, useRef } from 'react';
import SplineEmbed from './SplineEmbed';
import { Brain, Tractor, Pill } from 'lucide-react';

interface KeyFeatureProps {
  icon: React.ReactNode;
  title: string;
  delay: number;
}

const KeyFeature = ({ icon, title, delay }: KeyFeatureProps) => {
  return (
    <div 
      className="flex items-center space-x-3 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="text-healthcare-blue">{icon}</div>
      <span className="text-lg">{title}</span>
    </div>
  );
};

const AboutProject = () => {
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

  return (
    <section id="about" ref={sectionRef} className="section bg-gradient-to-b from-gray-900 to-pure-black">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          About Our <span className="text-healthcare-blue glow-text-blue">Initiative</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10 mb-16 items-center">
          <div className="order-2 md:order-1">
            <p className="text-pure-white/90 mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              This project introduces an AI-driven healthcare application designed to simplify and improve the overall patient experience. The app serves as an all-in-one platform offering key services such as quick and hassle-free appointment scheduling, access to verified hospital listings based on location and specialties, home delivery of prescribed medicines, and secure, streamlined payment options.
            </p>
            <p className="text-pure-white/90 mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              To support continuous care, the platform also enables regular communication between patients and doctors, allowing for daily or weekly updates on the patient's health status. This feature is especially valuable for individuals managing chronic conditions or recovering from treatment.
            </p>
            <p className="text-pure-white/90 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              By utilizing artificial intelligence, the app provides smart scheduling, personalized recommendations, and efficient coordination between patients and healthcare providers. It addresses common healthcare barriers such as delays, lack of information, and poor follow-up care, particularly in rural or underserved areas.
            </p>
            
            <div className="space-y-4 mb-8">
              <KeyFeature 
                icon={<Brain size={24} />} 
                title="Smart Scheduling using patient history" 
                delay={0.7}
              />
              <KeyFeature 
                icon={<Tractor size={24} />} 
                title="Urban-Rural telemedicine integration" 
                delay={0.9}
              />
              <KeyFeature 
                icon={<Pill size={24} />} 
                title="End-to-end medicine tracking" 
                delay={1.1}
              />
            </div>
          </div>
          
          <div className="order-1 md:order-2 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <SplineEmbed 
              url="https://my.spline.design/healthyfamily-hnFZGZ3VKUh7qpk6gNUdOiNM/"
              height="450px"
              title="Healthy Family 3D Model"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
