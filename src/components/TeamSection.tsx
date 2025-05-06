import React from 'react';

interface TeamMember {
  name: string;
  role: string;
  linkedIn?: string;
  github?: string;
  email?: string;
}

const TeamSection: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'Anadi Gupta',
      role: 'Project Lead & Full Stack Developer',
      linkedIn: 'https://www.linkedin.com/in/anadigupta/',
      github: 'https://github.com/Anadi-Gupta1',
      email: 'anadigupta55555@gmail.com'
    },
    {
      name: 'Hrick Kumar Jha',
      role: 'Agentic AI Developer & Data Engineer',
      linkedIn: 'https://www.linkedin.com/in/srijank/',
      github: 'https://github.com/srijank',
      email: 'srijan.kumar@lncts.ac.in'
    },
    {
      name: 'Preksha Kushwaha',
      role: 'Demonstrator & Advisor',
      linkedIn: 'https://www.linkedin.com/in/rishis/',
      github: 'https://github.com/rishis',
      email: 'rishi.sharma@lncts.ac.in'
    },
    {
      name: 'Riddhi Moonat',
      role: 'ML Engineer & Data Scientist',
      linkedIn: 'https://www.linkedin.com/in/priyap/',
      github: 'https://github.com/priyap',
      email: 'priya.patel@lncts.ac.in'
    }
  ];

  return (
    <section id="team" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white glow-text-blue">
            Our Team
          </h2>
          <div className="w-24 h-1 bg-healthcare-blue rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the talented individuals who brought this healthcare platform to life,
            combining expertise in development, design, and data science.
          </p>
        </div>

        {/* First row - two team members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
          {teamMembers.slice(0, 2).map((member, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-healthcare-blue/20 transition-all duration-300 hover:translate-y-[-4px] group p-6 md:p-8"
            >
              <div className="w-full flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-healthcare-blue transition-colors duration-300">{member.name}</h3>
                  <div className="w-16 h-1 bg-healthcare-blue rounded-full mb-4 transition-all duration-500 group-hover:w-24"></div>
                  <p className="text-healthcare-blue text-lg mb-6">{member.role}</p>
                  <p className="text-gray-300 mb-6 text-sm">
                    Dedicated to creating innovative healthcare solutions that bridge the gap between technology and patient care.
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  {member.linkedIn && (
                    <a 
                      href={member.linkedIn} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-healthcare-blue transition-colors p-2 rounded-full hover:bg-gray-700/50"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                      </svg>
                    </a>
                  )}
                  
                  {member.github && (
                    <a 
                      href={member.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-healthcare-blue transition-colors p-2 rounded-full hover:bg-gray-700/50"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                  
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-gray-400 hover:text-healthcare-blue transition-colors p-2 rounded-full hover:bg-gray-700/50"
                      aria-label={`Email ${member.name}`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second row - two team members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {teamMembers.slice(2, 4).map((member, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-healthcare-blue/20 transition-all duration-300 hover:translate-y-[-4px] group p-6 md:p-8"
            >
              <div className="w-full flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-healthcare-blue transition-colors duration-300">{member.name}</h3>
                  <div className="w-16 h-1 bg-healthcare-blue rounded-full mb-4 transition-all duration-500 group-hover:w-24"></div>
                  <p className="text-healthcare-blue text-lg mb-6">{member.role}</p>
                  <p className="text-gray-300 mb-6 text-sm">
                    Dedicated to creating innovative healthcare solutions that bridge the gap between technology and patient care.
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  {member.linkedIn && (
                    <a 
                      href={member.linkedIn} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-healthcare-blue transition-colors p-2 rounded-full hover:bg-gray-700/50"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                      </svg>
                    </a>
                  )}
                  
                  {member.github && (
                    <a 
                      href={member.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-healthcare-blue transition-colors p-2 rounded-full hover:bg-gray-700/50"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                  
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-gray-400 hover:text-healthcare-blue transition-colors p-2 rounded-full hover:bg-gray-700/50"
                      aria-label={`Email ${member.name}`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;