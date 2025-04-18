
import React from 'react';
import GlowingButton from './ui/GlowingButton';
import SplineEmbed from './SplineEmbed';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-pure-black pt-20 pb-10 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16">
          <SplineEmbed 
            url="https://my.spline.design/pillanddnaanimation-vW6BovZQ8iitazPX1pVBr1Dg/" 
            height="400px"
            title="Pill and DNA Animation 3D Model"
          />
        </div>

        <div className="flex justify-center mb-10">
          <GlowingButton variant="green" size="lg">
            Try the Demo
          </GlowingButton>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">LNCTS</h3>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/d0d91038-ce9b-4dbb-a8a0-4f20564d2338.png" 
                alt="LNCTS Emblem" 
                className="h-12 w-12"
              />
              <span className="text-sm text-pure-white/70">Autonomous Engineering College</span>
            </div>
            <p className="text-pure-white/70 text-sm">
              Lakshmi Narain College of Technology & Science, Bhopal
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-pure-white/60 hover:text-healthcare-blue transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-pure-white/60 hover:text-healthcare-blue transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-pure-white/60 hover:text-healthcare-blue transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-pure-white/60 hover:text-healthcare-blue transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-pure-white/60 hover:text-healthcare-blue transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Project Status</h3>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-healthcare-green/20 text-healthcare-green text-sm">
              <span className="w-2 h-2 rounded-full bg-healthcare-green mr-2"></span>
              SRIJAN 2024 Submission
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-pure-white/60 text-sm mb-4 md:mb-0">
            © 2024 LNCTS | Submitted by Hrick Kumar Jha | 12-04-25
          </p>
          <div className="text-pure-white/60 text-sm">
            <span>SEO Title: LNCTS Healthcare Management System - AI for Better Patient Care</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
