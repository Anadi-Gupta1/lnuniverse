import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './lib/auth-context';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import HospitalDetail from './pages/HospitalDetail';
import HospitalList from './pages/HospitalList';
import HealthGoals from './pages/HealthGoals';
import MedicalPharmacy from './pages/MedicalPharmacy';
import Emergency from './pages/Emergency';
import Index from './pages/Index';
import { Toaster } from './components/ui/toaster';
import { Provider } from 'react-redux';
import { store } from './store';
import LoginForm from './components/auth/LoginForm';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Provider store={store}>
          <Router>
            <div className="flex flex-col min-h-screen bg-background">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  {/* Make root path show the homepage */}
                  <Route path="/" element={<Index />} />
                  
                  {/* Landing page also available at /home */}
                  <Route path="/home" element={<Index />} />
                  
                  {/* Public routes with standard container */}
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Hospital routes - public */}
                  <Route path="/hospitals" element={<HospitalList />} />
                  <Route path="/hospital/:id" element={<HospitalDetail />} />
                  
                  {/* Pharmacy route - public */}
                  <Route path="/medical-pharmacy" element={<MedicalPharmacy />} />
                  
                  {/* Emergency route */}
                  <Route path="/emergency" element={<Emergency />} />
                  
                  {/* Health Goals route - public */}
                  <Route path="/health-goals" element={<HealthGoals />} />
                  
                  {/* Dashboard route - public */}
                  <Route 
                    path="/dashboard" 
                    element={<Dashboard />} 
                  />
                  
                  {/* TeleHealth route - use HealthGoals component for now */}
                  <Route 
                    path="/telehealth" 
                    element={<HealthGoals />} 
                  />
                  
                  {/* Catch all route for 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <Toaster />
            </div>
          </Router>
        </Provider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
