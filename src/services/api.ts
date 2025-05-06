import axios from '../lib/axios';

// Auth Services
export const authService = {
  login: (data: { email: string; password: string }) =>
    axios.post('/api/users/login', data),
  register: (data: any) => axios.post('/api/users/register', data),
  logout: () => axios.post('/api/users/logout'),
  getCurrentUser: () => axios.get('/api/users/me'),
  updateUserDetails: (data: any) => axios.put('/api/users/me', data),
  forgotPassword: (email: string) => axios.post('/api/users/forgotpassword', { email }),
  resetPassword: (token: string, password: string) => 
    axios.put(`/api/users/resetpassword/${token}`, { password }),
};

// Hospital Services
export const hospitalService = {
  getAll: (params?: any) => axios.get('/api/hospitals', { params }),
  getById: (id: string) => axios.get(`/api/hospitals/${id}`),
  create: (data: any) => axios.post('/api/hospitals', data),
  update: (id: string, data: any) => axios.put(`/api/hospitals/${id}`, data),
  delete: (id: string) => axios.delete(`/api/hospitals/${id}`),
  getNearby: (lat: number, lng: number, distance: number) => 
    axios.get(`/api/hospitals/radius/${lat}/${lng}/${distance}`),
};

// Doctor Services
export const doctorService = {
  getAll: (params?: any) => axios.get('/api/doctors', { params }),
  getById: (id: string) => axios.get(`/api/doctors/${id}`),
  create: (data: any) => axios.post('/api/doctors', data),
  update: (id: string, data: any) => axios.put(`/api/doctors/${id}`, data),
  delete: (id: string) => axios.delete(`/api/doctors/${id}`),
  getByHospital: (hospitalId: string) => axios.get(`/api/hospitals/${hospitalId}/doctors`),
  getBySpecialty: (specialty: string) => axios.get(`/api/doctors/specialty/${specialty}`),
};

// Appointment Services
export const appointmentService = {
  getAll: (params?: any) => axios.get('/api/appointments', { params }),
  getById: (id: string) => axios.get(`/api/appointments/${id}`),
  create: (data: any) => axios.post('/api/appointments', data),
  update: (id: string, data: any) => axios.put(`/api/appointments/${id}`, data),
  delete: (id: string) => axios.delete(`/api/appointments/${id}`),
  getUserAppointments: () => axios.get('/api/appointments/me'),
  getDoctorAppointments: (doctorId: string) => 
    axios.get(`/api/doctors/${doctorId}/appointments`),
  getHospitalAppointments: (hospitalId: string) => 
    axios.get(`/api/hospitals/${hospitalId}/appointments`),
};

// Pharmacy Services
export const pharmacyService = {
  getAll: (params?: any) => axios.get('/api/pharmacies', { params }),
  getById: (id: string) => axios.get(`/api/pharmacies/${id}`),
  create: (data: any) => axios.post('/api/pharmacies', data),
  update: (id: string, data: any) => axios.put(`/api/pharmacies/${id}`, data),
  delete: (id: string) => axios.delete(`/api/pharmacies/${id}`),
  getNearby: (lat: number, lng: number, distance: number) => 
    axios.get(`/api/pharmacies/radius/${lat}/${lng}/${distance}`),
  orderMedicine: (data: any) => axios.post('/api/pharmacies/order', data),
  getUserOrders: () => axios.get('/api/pharmacies/orders/me'),
};

// Event Services
export const eventService = {
  getAll: (params?: any) => axios.get('/api/events', { params }),
  getById: (id: string) => axios.get(`/api/events/${id}`),
  create: (data: any) => axios.post('/api/events', data),
  update: (id: string, data: any) => axios.put(`/api/events/${id}`, data),
  delete: (id: string) => axios.delete(`/api/events/${id}`),
  getByCategory: (category: string) => axios.get(`/api/events/category/${category}`),
  registerForEvent: (eventId: string) => axios.post(`/api/events/${eventId}/register`),
  getUpcoming: () => axios.get('/api/events/upcoming'),
};

// Nutrition Services
export const nutritionService = {
  getAll: (params?: any) => axios.get('/api/nutrition', { params }),
  getById: (id: string) => axios.get(`/api/nutrition/${id}`),
  create: (data: any) => axios.post('/api/nutrition', data),
  update: (id: string, data: any) => axios.put(`/api/nutrition/${id}`, data),
  delete: (id: string) => axios.delete(`/api/nutrition/${id}`),
  getByCategory: (category: string) => axios.get(`/api/nutrition/category/${category}`),
  getLatest: () => axios.get('/api/nutrition/latest'),
};

// Emergency Services
export const emergencyService = {
  getAll: (params?: any) => axios.get('/api/emergency', { params }),
  getById: (id: string) => axios.get(`/api/emergency/${id}`),
  create: (data: any) => axios.post('/api/emergency', data),
  update: (id: string, data: any) => axios.put(`/api/emergency/${id}`, data),
  delete: (id: string) => axios.delete(`/api/emergency/${id}`),
  getNearby: (lat: number, lng: number, distance: number) => 
    axios.get(`/api/emergency/radius/${lat}/${lng}/${distance}`),
  requestAmbulance: (data: any) => axios.post('/api/emergency/ambulance', data),
};

// TeleHealth Services
export const telehealthService = {
  getAll: (params?: any) => axios.get('/api/telehealth', { params }),
  getById: (id: string) => axios.get(`/api/telehealth/${id}`),
  create: (data: any) => axios.post('/api/telehealth', data),
  update: (id: string, data: any) => axios.put(`/api/telehealth/${id}`, data),
  delete: (id: string) => axios.delete(`/api/telehealth/${id}`),
  startSession: (doctorId: string) => axios.post(`/api/telehealth/session/${doctorId}`),
  endSession: (sessionId: string) => axios.put(`/api/telehealth/session/${sessionId}/end`),
  getUserSessions: () => axios.get('/api/telehealth/sessions/me'),
};

// Fitness Events Services
export const fitnessEventService = {
  getAll: (params?: any) => axios.get('/api/fitness-events', { params }),
  getById: (id: string) => axios.get(`/api/fitness-events/${id}`),
  create: (data: any) => axios.post('/api/fitness-events', data),
  update: (id: string, data: any) => axios.put(`/api/fitness-events/${id}`, data),
  delete: (id: string) => axios.delete(`/api/fitness-events/${id}`),
  registerForEvent: (eventId: string) => axios.post(`/api/fitness-events/${eventId}/register`),
  getUserRegistrations: () => axios.get('/api/fitness-events/registrations/me'),
};