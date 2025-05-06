import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospitalId: string;
  experience: number;
  qualifications: string[];
  availability: {
    days: string[];
    timeSlots: string[];
  };
}

interface DoctorState {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  loading: boolean;
  error: string | null;
}

const initialState: DoctorState = {
  doctors: [],
  selectedDoctor: null,
  loading: false,
  error: null,
};

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    setDoctors: (state, action: PayloadAction<Doctor[]>) => {
      state.doctors = action.payload;
    },
    setSelectedDoctor: (state, action: PayloadAction<Doctor | null>) => {
      state.selectedDoctor = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addDoctor: (state, action: PayloadAction<Doctor>) => {
      state.doctors.push(action.payload);
    },
    updateDoctor: (state, action: PayloadAction<Doctor>) => {
      const index = state.doctors.findIndex(doc => doc.id === action.payload.id);
      if (index !== -1) {
        state.doctors[index] = action.payload;
      }
    },
    deleteDoctor: (state, action: PayloadAction<string>) => {
      state.doctors = state.doctors.filter(doc => doc.id !== action.payload);
    },
  },
});

export const {
  setDoctors,
  setSelectedDoctor,
  setLoading,
  setError,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} = doctorSlice.actions;

export default doctorSlice.reducer; 