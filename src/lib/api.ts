import axios from 'axios';

// In production (Vercel), we use relative URLs
// In development, we use the full localhost URL
let API_URL = '/api';
if (import.meta.env.DEV) {
  API_URL = 'http://localhost:5000/api';
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response && error.response.status === 404) {
      console.error('API endpoint not found:', error.config.url);
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: any) => api.post('/users/register', data),
  login: (data: any) => api.post('/users/login', data),
  getCurrentUser: () => api.get('/users/me'),
  updateDetails: (data: any) => api.put('/users/updatedetails', data),
  updatePassword: (data: any) => api.put('/users/updatepassword', data),
};

// Doctor API
export const doctorAPI = {
  getAll: () => api.get('/doctors'),
  getById: (id: string) => api.get(`/doctors/${id}`),
  create: (data: any) => api.post('/doctors', data),
  update: (id: string, data: any) => api.put(`/doctors/${id}`, data),
  delete: (id: string) => api.delete(`/doctors/${id}`),
};

// Hospital API
export const hospitalAPI = {
  getAll: () => api.get('/hospitals'),
  getById: (id: string) => api.get(`/hospitals/${id}`),
  create: (data: any) => api.post('/hospitals', data),
  update: (id: string, data: any) => api.put(`/hospitals/${id}`, data),
  delete: (id: string) => api.delete(`/hospitals/${id}`),
};

// Appointment API
export const appointmentAPI = {
  getAll: () => api.get('/appointments'),
  create: (data: any) => api.post('/appointments', data),
  update: (id: string, data: any) => api.put(`/appointments/${id}`, data),
  delete: (id: string) => api.delete(`/appointments/${id}`),
};

// Pharmacy API
export const pharmacyAPI = {
  getAll: () => api.get('/pharmacies'),
  search: (params: any) => api.get('/pharmacies/search', { params }),
  getById: (id: string) => api.get(`/pharmacies/${id}`),
  create: (data: any) => api.post('/pharmacies', data),
  addReview: (id: string, data: any) => api.post(`/pharmacies/${id}/reviews`, data),
};

// Event API
export const eventAPI = {
  getAll: () => api.get('/events'),
  getById: (id: string) => api.get(`/events/${id}`),
  create: (data: any) => api.post('/events', data),
  register: (id: string) => api.post(`/events/${id}/register`),
};

// Nutrition API
export const nutritionAPI = {
  getAll: () => api.get('/nutrition'),
  getById: (id: string) => api.get(`/nutrition/${id}`),
  create: (data: any) => api.post('/nutrition', data),
};

// Emergency API
export const emergencyAPI = {
  getAll: () => api.get('/emergency'),
  report: (data: any) => api.post('/emergency', data),
  getNearby: (params: any) => api.get('/emergency/nearby', { params }),
};

export default api;