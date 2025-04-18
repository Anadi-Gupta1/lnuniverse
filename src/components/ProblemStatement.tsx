
import React, { useEffect, useRef } from 'react';
import { Calendar, Clock, Users, Map, CreditCard } from 'lucide-react';

interface ProblemCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ProblemCard = ({ icon, title, description, delay }: ProblemCardProps) => {
  return (
    <div 
      className="bg-pure-black border border-gray-800 rounded-xl p-6 transform transition-all duration-500 hover:border-healthcare-blue opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="text-healthcare-blue mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-pure-white/70">{description}</p>
    </div>
  );
};

const ProblemStatement = () => {
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
    <section id="problem" ref={sectionRef} className="section bg-gradient-to-b from-pure-black to-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          The Healthcare <span className="text-healthcare-blue glow-text-blue">Challenges</span> We Solve
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-medium mb-6 text-healthcare-blue">Current Experience</h3>
            <div className="bg-pure-black border border-gray-800 rounded-xl p-6 h-64 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-1/4 left-1/3 w-14 h-14 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/3 right-1/4 w-10 h-10 bg-red-600 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-yellow-600 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>
              <div className="text-center relative z-10">
                <h4 className="text-xl font-medium mb-3">Chaotic Healthcare Journey</h4>
                <p className="text-pure-white/70">Long queues, confusion, and frustration</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-medium mb-6 text-healthcare-green">Our AI Solution</h3>
            <div className="bg-pure-black border border-gray-800 rounded-xl p-6 h-64 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-healthcare-green rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-healthcare-blue rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-1/4 left-1/3 w-14 h-14 bg-healthcare-green rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/3 right-1/4 w-10 h-10 bg-healthcare-blue rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-healthcare-green rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>
              <div className="text-center relative z-10">
                <h4 className="text-xl font-medium mb-3">Streamlined Digital Experience</h4>
                <p className="text-pure-white/70">Effortless, organized, and patient-centric</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProblemCard
            icon={<Calendar size={32} />}
            title="Appointment Delays"
            description="Patients wait weeks for basic consultations, creating frustration and potential health risks."
            delay={0.1}
          />
          <ProblemCard
            icon={<Users size={32} />}
            title="Medicine Access"
            description="Remote areas lack pharmacy access, making it difficult to obtain necessary medications."
            delay={0.3}
          />
          <ProblemCard
            icon={<Clock size={32} />}
            title="Follow-Up Gaps"
            description="No post-treatment communication leads to poor recovery monitoring and outcomes."
            delay={0.5}
          />
          <ProblemCard
            icon={<Map size={32} />}
            title="Hospital Confusion"
            description="Unverified or outdated provider listings create uncertainty and wasted time."
            delay={0.7}
          />
          <ProblemCard
            icon={<CreditCard size={32} />}
            title="Payment Hassles"
            description="Multiple platforms and payment complexity add stress to healthcare management."
            delay={0.9}
          />
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
