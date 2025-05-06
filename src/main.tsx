import { createRoot } from 'react-dom/client'
import { useState, useEffect, ReactNode } from 'react'
import App from './App.tsx'
import './index.css'
import { setupBackendChecker } from './utils/backendChecker.ts'
import { Provider } from 'react-redux'
import { store } from './store'

// Initialize the backend checker for debugging
setupBackendChecker();

// Enhanced ErrorBoundary component with authentication state support
function ErrorBoundary({ children }: { children: ReactNode }) {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isBackendAvailable, setIsBackendAvailable] = useState(true);
  const [isCheckingBackend, setIsCheckingBackend] = useState(true);
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userId: null,
    userRole: null,
    token: null
  });

  useEffect(() => {
    // Check for existing authentication
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    
    if (token && userId) {
      setAuthState({
        isAuthenticated: true,
        userId,
        userRole,
        token
      });
    }
    
    const checkBackendAvailability = async () => {
      // Try multiple potential backend URLs
      const potentialUrls = [
        'http://localhost:5000/api/health',
        'http://localhost:3001/api/health', 
        'http://localhost:8000/api/health',
        '/api/health',
        // Additional URLs that match the server/index.js endpoint
        'http://localhost:5000/api/health',
        // Try root paths as fallbacks
        'http://localhost:5000',
        'http://localhost:3001',
        'http://localhost:8000',
        // Also try relative path
        '/api'
      ];
      
      // Try each URL sequentially
      const tryNextUrl = async (index = 0) => {
        if (index >= potentialUrls.length) {
          setIsBackendAvailable(false);
          setHasError(true);
          setErrorMessage('Cannot connect to the backend server. Please make sure the server is running.');
          setIsCheckingBackend(false);
          return;
        }
        
        try {
          const response = await fetch(potentialUrls[index], { 
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            // Adding a mode for CORS issues
            mode: 'cors',
            // Add a timeout to prevent waiting too long
            signal: AbortSignal.timeout(5000)
          });
          
          if (response.ok) {
            console.log(`Successfully connected to backend at: ${potentialUrls[index]}`);
            setIsBackendAvailable(true);
            setIsCheckingBackend(false);
            
            // Store the base URL by removing the endpoint part
            const baseUrl = potentialUrls[index].replace('/api/health', '').replace('/health', '');
            
            // Store the working URLs in both sessionStorage and localStorage for persistence
            sessionStorage.setItem('workingBackendUrl', potentialUrls[index]);
            sessionStorage.setItem('workingBaseUrl', baseUrl);
            localStorage.setItem('workingBaseUrl', baseUrl);
            
            // Also update the API service base URL dynamically
            window.API_BASE_URL = baseUrl;
            return;
          }
          // Try next URL
          tryNextUrl(index + 1);
        } catch (error) {
          console.error(`Backend connection error for ${potentialUrls[index]}:`, error);
          // Try next URL
          tryNextUrl(index + 1);
        }
      };
      
      tryNextUrl();
    };
    
    checkBackendAvailability();
    
    // Retry connection check every 10 seconds if failed
    const intervalId = setInterval(() => {
      if (!isBackendAvailable) {
        checkBackendAvailability();
      }
    }, 10000);
    
    return () => clearInterval(intervalId);
  }, [isBackendAvailable]);

  if (hasError) {
    return (
      <div className="error-container" style={{ 
        padding: '20px', 
        margin: '50px auto', 
        maxWidth: '500px', 
        textAlign: 'center',
        backgroundColor: '#fff8f8',
        border: '1px solid #ffcaca',
        borderRadius: '5px'
      }}>
        <h2 style={{ color: '#d32f2f' }}>Backend Connection Error</h2>
        <p>{errorMessage}</p>
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => window.location.reload()} style={{
            padding: '8px 16px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}>
            Try Again
          </button>
          <button onClick={() => {
            setHasError(false);
            setIsBackendAvailable(true);
          }} style={{
            padding: '8px 16px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Continue Anyway
          </button>
        </div>
        <p style={{ fontSize: '0.9em', marginTop: '20px' }}>
          If you're running this application locally, make sure the backend server is running.
          Start it with 'npm run server' or 'node server' in the project directory.
        </p>
      </div>
    );
  }

  return isCheckingBackend ? (
    <div className="loading-container" style={{ 
      padding: '20px', 
      margin: '50px auto', 
      maxWidth: '500px', 
      textAlign: 'center'
    }}>
      <h2>Connecting to backend server...</h2>
      <p>Please wait while we connect to the server...</p>
    </div>
  ) : isBackendAvailable ? children : (
    <div className="loading-container" style={{ 
      padding: '20px', 
      margin: '50px auto', 
      maxWidth: '500px', 
      textAlign: 'center'
    }}>
      <h2>Connecting to backend server...</h2>
      <p>If this message persists, please make sure the backend server is running.</p>
    </div>
  );
}

// Add global API configuration
declare global {
  interface Window {
    API_BASE_URL: string;
    checkBackend: () => Promise<{isAvailable: boolean, url?: string, error?: string}>;
  }
}

// Initialize API base URL from storage or default
window.API_BASE_URL = localStorage.getItem('workingBaseUrl') || 
                      sessionStorage.getItem('workingBaseUrl') || 
                      'http://localhost:5000';

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>
);
