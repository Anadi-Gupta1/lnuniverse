import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProblemStatement from '../components/ProblemStatement';
import FeatureGrid from '../components/FeatureGrid';
import AboutProject from '../components/AboutProject';
import FutureScope from '../components/FutureScope';
import SocietalImpact from '../components/SocietalImpact';
import TeamSection from '../components/TeamSection';
import { MessageCircle, Building2, PillIcon, ActivityIcon, BarChart3Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Update document title
    document.title = "LNCTS Healthcare Management System - AI for Better Patient Care";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'An AI-powered platform tackling appointment delays, medicine delivery, chronic care, and rural access.');
    }
    
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-pure-black text-pure-white min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        
        {/* Navigation Section for New Pages */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Explore Our Health Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors duration-300">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 mb-4">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">Hospitals</CardTitle>
                  <CardDescription className="text-gray-400">Find hospitals in Bhopal and book appointments</CardDescription>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>Browse through the list of hospitals in Bhopal, view their details, and book appointments with doctors.</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => navigate('/hospitals')}
                  >
                    View Hospitals
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors duration-300">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-600 mb-4">
                    <PillIcon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">Medical & Pharmacy</CardTitle>
                  <CardDescription className="text-gray-400">Order medicines and medical equipment</CardDescription>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>Find medical stores in Bhopal offering online services for medicine delivery and medical equipment.</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => navigate('/medical-pharmacy')}
                  >
                    Explore Medical Stores
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors duration-300">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-600 mb-4">
                    <ActivityIcon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">Health Goals</CardTitle>
                  <CardDescription className="text-gray-400">Fitness events and nutrition information</CardDescription>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>Discover sports and fitness events in Bhopal, nutrition tips, and online health checkup services.</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => navigate('/health-goals')}
                  >
                    Set Health Goals
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors duration-300">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-600 mb-4">
                    <BarChart3Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">Dashboard</CardTitle>
                  <CardDescription className="text-gray-400">Track your fitness and health metrics</CardDescription>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>View your health metrics, track progress, and access the emergency button for ambulance services.</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    onClick={() => navigate('/dashboard')}
                  >
                    Go to Dashboard
                  </Button>
                </CardFooter>
              </Card>
              
            </div>
          </div>
        </section>
        
        <ProblemStatement />
        <FeatureGrid />
        <AboutProject />
        <FutureScope />
        <SocietalImpact />
        <TeamSection />
      </main>
      {/* Chatbot Floating Button and Iframe */}
      <style>{`
        @keyframes chatbot-glow {
          0%, 100% {
            box-shadow: 0 0 12px 4px rgba(104,95,255,0.4), 0 0 24px 8px rgba(5,150,105,0.2);
          }
          50% {
            box-shadow: 0 0 24px 8px rgba(104,95,255,0.7), 0 0 36px 16px rgba(5,150,105,0.4);
          }
        }
      `}</style>
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
        {chatOpen && (
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.3)', padding: 0 }}>
            <iframe
              src="https://app.relevanceai.com/agents/f1db6c/a08efca57e95-43ab-9928-5675ac4de134/c1cacaaa-8525-490a-9268-c8866d22c015/embed-chat?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23685FFF&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=false"
              style={{ width: 400, height: 600, border: 'none', borderRadius: 12, background: '#fff' }}
              title="Relevance AI Chatbot"
              allow="clipboard-write"
            />
          </div>
        )}
        <button
          onClick={() => setChatOpen((open) => !open)}
          style={{
            background: 'linear-gradient(135deg, #685FFF, #059669)',
            border: 'none',
            borderRadius: '50%',
            width: 64,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
            cursor: 'pointer',
            marginTop: chatOpen ? 12 : 0,
            animation: 'chatbot-glow 2s infinite ease-in-out'
          }}
          aria-label={chatOpen ? 'Close Chatbot' : 'Open Chatbot'}
        >
          <MessageCircle size={32} color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default Index;
