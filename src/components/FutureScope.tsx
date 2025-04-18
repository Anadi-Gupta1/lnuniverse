
import React, { useEffect, useRef } from 'react';
import { BarChart4, Brain, MessageCircle } from 'lucide-react';

interface FutureScopeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FutureScopeCard = ({ icon, title, description, delay }: FutureScopeCardProps) => {
  return (
    <div 
      className="bg-pure-black border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:border-healthcare-green opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="text-healthcare-green text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-pure-white/70">{description}</p>
    </div>
  );
};

const FutureScope = () => {
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
    <section id="future" ref={sectionRef} className="section bg-pure-black">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Future <span className="text-healthcare-green glow-text-green">Scope</span>
        </h2>
        <p className="text-pure-white/70 text-center max-w-2xl mx-auto mb-16">
          Our roadmap for continued innovation and enhanced healthcare solutions
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <FutureScopeCard 
            icon={<BarChart4 />}
            title="Predictive Analytics"
            description="Using AI and machine learning to detect early signs of disease and recommend preventive measures before conditions worsen."
            delay={0.1}
          />
          <FutureScopeCard 
            icon={<Brain />}
            title="Mental Health Modules"
            description="Expanding our platform to include specialized support for mental health assessment, resources, and professional connections."
            delay={0.3}
          />
          <FutureScopeCard 
            icon={<MessageCircle />}
            title="AI Chatbots for 24/7 Support"
            description="Intelligent conversational agents that can provide immediate responses to health questions and triage concerns at any time."
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
};

export default FutureScope;
