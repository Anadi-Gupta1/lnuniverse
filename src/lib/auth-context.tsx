import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

interface User {
  _id: string;
  id?: string; // Add optional id field to support both formats
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string, address: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
  getUserId: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      if (token) {
        const { data } = await authService.getCurrentUser();
        const userData = data.data || data.user;
        
        if (userData) {
          // Store user ID in localStorage for persistence
          const id = userData._id || userData.id;
          if (id) {
            localStorage.setItem('userId', id);
            localStorage.setItem('userRole', userData.role || 'user');
          }
          setUser(userData);
        }
      }
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const { data } = await authService.login({ email, password });
      
      // Save token and user ID in local storage
      localStorage.setItem('token', data.token);
      
      const userData = data.user || data.data;
      if (userData) {
        const userId = userData._id || userData.id;
        if (userId) {
          localStorage.setItem('userId', userId);
          localStorage.setItem('userRole', userData.role || 'user');
        }
        setUser(userData);
      }
    } catch (err: any) {
      console.error('Login error details:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Login failed');
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string, phone: string, address: string) => {
    try {
      setError(null);
      console.log('Attempting to register with data:', { name, email, password: '****', phone, address });
      const { data } = await authService.register({ name, email, password, phone, address });
      
      // Save token and user data
      localStorage.setItem('token', data.token);
      
      const userData = data.user || data.data;
      if (userData) {
        const userId = userData._id || userData.id;
        if (userId) {
          localStorage.setItem('userId', userId);
          localStorage.setItem('userRole', userData.role || 'user');
        }
        setUser(userData);
      }
    } catch (err: any) {
      console.error('Registration error details:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        config: err.config
      });
      setError(err.response?.data?.error || 'Registration failed. Please check your network connection and try again.');
      throw err;
    }
  };

  const logout = () => {
    authService.logout().catch(console.error);
    // Clear all auth data
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    setUser(null);
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      setError(null);
      const { data } = await authService.updateUserDetails(userData);
      const updatedUser = data.data || data.user || data;
      
      // Update user ID in storage if changed
      if (updatedUser) {
        const userId = updatedUser._id || updatedUser.id;
        if (userId) {
          localStorage.setItem('userId', userId);
        }
        if (updatedUser.role) {
          localStorage.setItem('userRole', updatedUser.role);
        }
        setUser(updatedUser);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Update failed');
      throw err;
    }
  };

  // Helper function to get user ID
  const getUserId = (): string | null => {
    if (user) {
      return user._id || user.id || null;
    }
    return localStorage.getItem('userId');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateUser,
        getUserId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}