/**
 * Utility to check if the backend server is available and manage backend connections
 */

/**
 * Checks if the backend server is available
 * @returns Promise with availability result and working URL if successful
 */
export const checkBackendAvailability = async (): Promise<{isAvailable: boolean, url?: string, error?: string}> => {
  // Common backend URLs to check
  const potentialUrls = [
    'http://localhost:5000/api/health', // Main backend port
    'http://localhost:5001/api/health', // Alternative port
    'http://localhost:3001/api/health', // Another common dev port
    'http://localhost:8080/api/health', // Production port from env
    '/api/health',                      // Relative path for deployed app
    // Also try root paths
    'http://localhost:5000',  
    'http://localhost:5001',
    'http://localhost:3001',
    'http://localhost:8080',
    '/api'
  ];
  
  for (const url of potentialUrls) {
    try {
      console.log(`Checking backend at: ${url}`);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        console.log(`Backend is available at: ${url}`);
        // Store the base URL by removing the endpoint part
        const baseUrl = url.replace('/api/health', '').replace('/health', '');
        
        // Store the working URLs in both sessionStorage and localStorage for persistence
        sessionStorage.setItem('workingBackendUrl', url);
        sessionStorage.setItem('workingBaseUrl', baseUrl);
        localStorage.setItem('workingBaseUrl', baseUrl);
        
        // Also update the API service base URL dynamically
        if (typeof window !== 'undefined') {
          window.API_BASE_URL = baseUrl;
        }
        
        return { isAvailable: true, url };
      }
      
      console.log(`Backend check failed for ${url} with status: ${response.status}`);
    } catch (error) {
      console.error(`Error checking ${url}:`, error);
    }
  }
  
  return { isAvailable: false, error: 'All backend URLs failed to connect' };
};

/**
 * Ensure user ID is properly loaded and stored
 * @param userId Optional userId to check against stored value
 * @returns The user ID if available
 */
export const ensureUserId = (userId?: string | null): string | null => {
  // If a userId is provided, store it
  if (userId) {
    localStorage.setItem('userId', userId);
    return userId;
  }
  
  // Return stored userId if available
  return localStorage.getItem('userId');
};

/**
 * Helper to extract user data from various API response formats
 * @param data API response data that might contain user information
 * @returns User data if found, or null
 */
export const extractUserData = (data: any): any => {
  if (!data) return null;
  
  // Try to find user data in common response formats
  const userData = data.user || data.data || data;
  
  if (userData && (userData._id || userData.id)) {
    // Extract and normalize user ID
    const userId = userData._id || userData.id;
    ensureUserId(userId);
    
    return {
      ...userData,
      id: userId,
      _id: userId, // Ensure both ID formats are available
    };
  }
  
  return null;
};

/**
 * Manually run this function from the browser console to check backend status
 * Usage: Run in browser console: window.checkBackend()
 */
export const setupBackendChecker = () => {
  if (typeof window !== 'undefined') {
    (window as any).checkBackend = async () => {
      console.log('Checking backend status...');
      const result = await checkBackendAvailability();
      console.log('Backend check result:', result);
      return result;
    };
    
    // Also expose user ID helpers for debugging
    (window as any).getUserId = () => localStorage.getItem('userId');
    (window as any).clearUserId = () => localStorage.removeItem('userId');
    
    // Automatically run a check when the module loads
    checkBackendAvailability().then(result => {
      console.log('Initial backend check result:', result);
    });
    
    console.log('Backend checker initialized. Run window.checkBackend() to test the backend.');
  }
};
