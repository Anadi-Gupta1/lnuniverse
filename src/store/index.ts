import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import hospitalReducer from './slices/hospitalSlice';
import doctorReducer from './slices/doctorSlice';
import appointmentReducer from './slices/appointmentSlice';
import pharmacyReducer from './slices/pharmacySlice';
import eventReducer from './slices/eventSlice';
import nutritionReducer from './slices/nutritionSlice';
import emergencyReducer from './slices/emergencySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hospitals: hospitalReducer,
    doctors: doctorReducer,
    appointments: appointmentReducer,
    pharmacies: pharmacyReducer,
    events: eventReducer,
    nutrition: nutritionReducer,
    emergency: emergencyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 