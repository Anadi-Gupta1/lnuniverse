
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-pure-black/90 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/d0d91038-ce9b-4dbb-a8a0-4f20564d2338.png"
            alt="LNCTS Emblem" 
            className="h-12 w-12"
          />
          <div className="text-pure-white font-poppins">
            <p className="text-xs">LNCTS</p>
            <p className="text-lg font-semibold">Healthcare AI</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#problem" className="text-pure-white hover:text-healthcare-blue transition-colors">Problems</a>
          <a href="#features" className="text-pure-white hover:text-healthcare-blue transition-colors">Features</a>
          <a href="#about" className="text-pure-white hover:text-healthcare-blue transition-colors">About</a>
          <a href="#impact" className="text-pure-white hover:text-healthcare-blue transition-colors">Impact</a>
          <a href="#team" className="text-pure-white hover:text-healthcare-blue transition-colors">Team</a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-pure-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-pure-black/95 backdrop-blur-md transition-all duration-300 ${
        isMenuOpen ? 'max-h-[300px] py-4 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
      } overflow-hidden`}>
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <a href="#problem" className="text-pure-white py-2 border-b border-gray-800" onClick={() => setIsMenuOpen(false)}>Problems</a>
          <a href="#features" className="text-pure-white py-2 border-b border-gray-800" onClick={() => setIsMenuOpen(false)}>Features</a>
          <a href="#about" className="text-pure-white py-2 border-b border-gray-800" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#impact" className="text-pure-white py-2 border-b border-gray-800" onClick={() => setIsMenuOpen(false)}>Impact</a>
          <a href="#team" className="text-pure-white py-2" onClick={() => setIsMenuOpen(false)}>Team</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
