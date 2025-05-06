import axios from 'axios';

// Create axios instance with base URL that points to our backend API
const instance = axios.create({
  // Try to use the stored working backend URL first, then fall back to environment variables or window global
  baseURL: sessionStorage.getItem('workingBaseUrl')?.replace('/api/health', '') || 
           window.API_BASE_URL ||
           import.meta.env.VITE_API_URL || 
           'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies/authentication
  // Add timeout to prevent hanging requests
  timeout: 15000,
});

// Add request interceptor to include auth token in headers
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add current user ID if available (helps with some endpoints)
    const userId = localStorage.getItem('userId');
    if (userId && !config.headers['X-User-ID']) {
      config.headers['X-User-ID'] = userId;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors and extract user IDs
instance.interceptors.response.use(
  (response) => {
    // Extract and store user ID if present in the response
    // This helps maintain consistency with ID formats from different endpoints
    if (response.data?.user?._id || response.data?.user?.id || 
        response.data?.data?._id || response.data?.data?.id) {
      const userData = response.data.user || response.data.data;
      const userId = userData._id || userData.id;
      
      if (userId && userId !== localStorage.getItem('userId')) {
        localStorage.setItem('userId', userId);
        if (userData.role) {
          localStorage.setItem('userRole', userData.role);
        }
      }
    }
    
    return response;
  },
  (error) => {
    // Log but don't redirect for network errors during backend checks
    if (error.code === 'ECONNABORTED' || !error.response) {
      console.error('Network error:', error.message);
      return Promise.reject(error);
    }
    
    if (error.response?.status === 401) {
      // Only clear token and redirect to login if specifically unauthorized
      // (and not during health checks)
      if (!error.config.url.includes('/health')) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        
        // Don't redirect from login/register pages
        if (!window.location.pathname.includes('/login') && 
            !window.location.pathname.includes('/register')) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;