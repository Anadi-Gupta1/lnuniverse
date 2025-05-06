import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
interface Emergency {
  _id: string;
  name: string;
  contact: string;
  location: string;
  services: string[];
  available24x7: boolean;
}

interface EmergencyState {
  emergencies: Emergency[];
  emergency: Emergency | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: EmergencyState = {
  emergencies: [],
  emergency: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchEmergencies = createAsyncThunk(
  'emergency/fetchEmergencies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/emergency');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch emergency services');
    }
  }
);

export const fetchEmergencyById = createAsyncThunk(
  'emergency/fetchEmergencyById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/emergency/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch emergency service');
    }
  }
);

// Slice
const emergencySlice = createSlice({
  name: 'emergency',
  initialState,
  reducers: {
    clearEmergency: (state) => {
      state.emergency = null;
    },
    clearEmergencyErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all emergency services
      .addCase(fetchEmergencies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmergencies.fulfilled, (state, action: PayloadAction<Emergency[]>) => {
        state.loading = false;
        state.emergencies = action.payload;
      })
      .addCase(fetchEmergencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch emergency service by ID
      .addCase(fetchEmergencyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmergencyById.fulfilled, (state, action: PayloadAction<Emergency>) => {
        state.loading = false;
        state.emergency = action.payload;
      })
      .addCase(fetchEmergencyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearEmergency, clearEmergencyErrors } = emergencySlice.actions;
export default emergencySlice.reducer;