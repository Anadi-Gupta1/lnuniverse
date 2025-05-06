import React, { useState, useEffect } from 'react';
import { Menu, X, Building2, PillIcon, ActivityIcon, BarChart3Icon, UserPlus, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth-context';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-pure-black/90 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
          <img 
            src="/lovable-uploads/d0d91038-ce9b-4dbb-a8a0-4f20564d2338.png"
            alt="LNCTS Emblem" 
            className="h-12 w-12"
          />
          <div className="text-pure-white font-poppins">
            <p className="text-xs">LNCTS</p>
            <p className="text-lg font-semibold">Healthcare AI</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#problem" className="text-pure-white hover:text-healthcare-blue transition-colors">Problems</a>
          <a href="#features" className="text-pure-white hover:text-healthcare-blue transition-colors">Features</a>
          <a href="#about" className="text-pure-white hover:text-healthcare-blue transition-colors">About</a>
          <a href="#impact" className="text-pure-white hover:text-healthcare-blue transition-colors">Impact</a>
          <a href="#team" className="text-pure-white hover:text-healthcare-blue transition-colors">Team</a>
          <div className="h-6 border-l border-gray-500"></div>
          <Link to="/hospitals" className="text-pure-white hover:text-healthcare-blue transition-colors flex items-center">
            <Building2 className="w-4 h-4 mr-1" /> Hospitals
          </Link>
          <Link to="/medical-pharmacy" className="text-pure-white hover:text-healthcare-blue transition-colors flex items-center">
            <PillIcon className="w-4 h-4 mr-1" /> Pharmacy
          </Link>
          <Link to="/health-goals" className="text-pure-white hover:text-healthcare-blue transition-colors flex items-center">
            <ActivityIcon className="w-4 h-4 mr-1" /> Health Goals
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="text-pure-white hover:text-healthcare-blue transition-colors flex items-center">
                <BarChart3Icon className="w-4 h-4 mr-1" /> Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="text-pure-white hover:text-healthcare-blue transition-colors flex items-center"
              >
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </button>
            </>
          ) : (
            <>
             
              <Link to="/register" className="text-pure-white hover:text-healthcare-blue transition-colors flex items-center">
                <UserPlus className="w-4 h-4 mr-1" /> Register
              </Link>
            </>
          )}
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
      <div 
        className={`fixed inset-0 bg-pure-black/95 z-50 flex flex-col items-center justify-center space-y-8 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Link to="/" className="text-pure-white text-2xl flex items-center" onClick={() => setIsMenuOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Home
        </Link>
        <a href="#problem" className="text-pure-white text-2xl" onClick={() => setIsMenuOpen(false)}>Problems</a>
        <a href="#features" className="text-pure-white text-2xl" onClick={() => setIsMenuOpen(false)}>Features</a>
        <a href="#about" className="text-pure-white text-2xl" onClick={() => setIsMenuOpen(false)}>About</a>
        <a href="#impact" className="text-pure-white text-2xl" onClick={() => setIsMenuOpen(false)}>Impact</a>
        <a href="#team" className="text-pure-white text-2xl" onClick={() => setIsMenuOpen(false)}>Team</a>
        <div className="border-t border-gray-700 w-24 my-2"></div>
        <Link to="/hospitals" className="text-pure-white text-2xl flex items-center" onClick={() => setIsMenuOpen(false)}>
          <Building2 className="w-5 h-5 mr-2" /> Hospitals
        </Link>
        <Link to="/medical-pharmacy" className="text-pure-white text-2xl flex items-center" onClick={() => setIsMenuOpen(false)}>
          <PillIcon className="w-5 h-5 mr-2" /> Pharmacy
        </Link>
        <Link to="/health-goals" className="text-pure-white text-2xl flex items-center" onClick={() => setIsMenuOpen(false)}>
          <ActivityIcon className="w-5 h-5 mr-2" /> Health Goals
        </Link>
        
        {user ? (
          <>
            <Link to="/dashboard" className="text-pure-white text-2xl flex items-center" onClick={() => setIsMenuOpen(false)}>
              <BarChart3Icon className="w-5 h-5 mr-2" /> Dashboard
            </Link>
            <button 
              onClick={handleLogout}
              className="text-pure-white text-2xl flex items-center"
            >
              <LogOut className="w-5 h-5 mr-2" /> Logout
            </button>
          </>
        ) : (
          <>
           
            <Link to="/register" className="text-pure-white text-2xl flex items-center" onClick={() => setIsMenuOpen(false)}>
              <UserPlus className="w-5 h-5 mr-2" /> Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
