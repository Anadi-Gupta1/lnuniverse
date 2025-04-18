
import React, { useEffect, useRef } from 'react';
import SplineEmbed from './SplineEmbed';
import { IndianRupee, Map, Heart } from 'lucide-react';

interface ImpactMetricProps {
  icon: React.ReactNode;
  area: string;
  outcome: string;
  delay: number;
}

const ImpactMetric = ({ icon, area, outcome, delay }: ImpactMetricProps) => {
  return (
    <tr className="border-b border-gray-800 opacity-0 animate-fade-in-up" style={{ animationDelay: `${delay}s` }}>
      <td className="py-4 pr-4">
        <div className="flex items-center">
          <div className="mr-3 text-healthcare-blue">{icon}</div>
          <span>{area}</span>
        </div>
      </td>
      <td className="py-4 px-4 text-center font-semibold">{outcome}</td>
    </tr>
  );
};

const SocietalImpact = () => {
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
    <section id="impact" ref={sectionRef} className="section bg-gradient-to-b from-pure-black to-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Why This <span className="text-healthcare-blue glow-text-blue">Matters</span>
        </h2>
        <p className="text-pure-white/70 text-center max-w-2xl mx-auto mb-16">
          The real-world impact our solution brings to healthcare accessibility
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="bg-pure-black border border-gray-800 rounded-xl p-6 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-xl font-semibold mb-6 text-center">Measurable Outcomes</h3>
              <table className="w-full">
                <tbody>
                  <ImpactMetric 
                    icon={<IndianRupee size={24} />}
                    area="Cost Reduction"
                    outcome="40% lower patient expenses"
                    delay={0.3}
                  />
                  <ImpactMetric 
                    icon={<Map size={24} />}
                    area="Accessibility"
                    outcome="200+ rural clinics connected"
                    delay={0.5}
                  />
                  <ImpactMetric 
                    icon={<Heart size={24} />}
                    area="Chronic Care Monitoring"
                    outcome="85% improved outcomes"
                    delay={0.7}
                  />
                </tbody>
              </table>
            </div>

            <div className="bg-pure-black border border-gray-800 rounded-xl p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
              <h3 className="text-xl font-semibold mb-4">Community Impact</h3>
              <p className="text-pure-white/70 mb-4">
                Our healthcare management system bridges gaps in medical access, particularly for underserved rural communities. By leveraging AI technologies, we're equalizing healthcare quality between urban and rural areas.
              </p>
              <p className="text-pure-white/70">
                This system not only improves individual patient outcomes but strengthens the entire healthcare ecosystem through better coordination, reduced administrative burden, and data-driven improvements.
              </p>
            </div>
          </div>
          
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <SplineEmbed 
              url="https://my.spline.design/biometricscan-6FQ8fwhc9UxEY0ISZWSl9FZ2/" 
              height="500px"
              title="Biometric Scan 3D Model"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocietalImpact;
