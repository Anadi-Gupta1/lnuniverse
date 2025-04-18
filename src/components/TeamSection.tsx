
import React, { useEffect, useRef } from 'react';
import { AtSign, Github, Linkedin } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  index: number;
}

const TeamMember = ({ name, role, index }: TeamMemberProps) => {
  return (
    <div 
      className="flex flex-col items-center opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${0.1 + index * 0.15}s` }}
    >
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-healthcare-blue to-healthcare-green flex items-center justify-center text-2xl font-bold text-white mb-4">
        {name.split(' ').map(part => part[0]).join('')}
      </div>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-pure-white/70">{role}</p>
      <div className="flex space-x-2 mt-2">
        <a href="#" className="text-pure-white/60 hover:text-healthcare-blue transition-colors" aria-label={`${name}'s email`}>
          <AtSign size={18} />
        </a>
        <a href="#" className="text-pure-white/60 hover:text-healthcare-blue transition-colors" aria-label={`${name}'s LinkedIn`}>
          <Linkedin size={18} />
        </a>
        <a href="#" className="text-pure-white/60 hover:text-healthcare-blue transition-colors" aria-label={`${name}'s GitHub`}>
          <Github size={18} />
        </a>
      </div>
    </div>
  );
};

const TeamSection = () => {
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

  const teamMembers = [
    { name: "Hrick Kumar Jha", role: "AI Developer" },
    { name: "Anadi Gupta", role: "UI/UX" },
    { name: "Priyanshu Upadhyay", role: "Backend" },
    { name: "Paridhi Mishra", role: "Data Analysis" },
  ];

  return (
    <section id="team" ref={sectionRef} className="section bg-pure-black">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Behind the <span className="text-healthcare-green glow-text-green">Innovation</span>
        </h2>
        <p className="text-pure-white/70 text-center max-w-2xl mx-auto mb-16">
          Meet the talented team of student engineers creating the future of healthcare
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              index={index}
            />
          ))}
        </div>

        <div className="bg-pure-black border border-gray-800 rounded-xl p-6 max-w-2xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <h3 className="text-xl font-semibold mb-4 text-center">Project Advisor</h3>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-healthcare-blue to-purple-600 flex items-center justify-center text-2xl font-bold text-white mb-4">
              BP
            </div>
            <h3 className="text-xl font-semibold">Dr. Bhawana Pillai</h3>
            <p className="text-pure-white/70">Ph.D. (Computer Science)</p>
          </div>
        </div>

        <div className="mt-16 text-center p-6 border border-gray-800 rounded-xl max-w-3xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
          <h4 className="font-medium mb-4">Declaration</h4>
          <p className="text-pure-white/70 italic">
            "We declare this is an original project submitted as part of SRIJAN 2024 and complies with academic and IPR policies."
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
