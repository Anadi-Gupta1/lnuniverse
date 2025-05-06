import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { hospitalService } from '../../services/api';

interface Hospital {
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  specialties: string[];
  rating: number;
  image: string;
}

interface HospitalState {
  hospitals: Hospital[];
  currentHospital: Hospital | null;
  loading: boolean;
  error: string | null;
}

const initialState: HospitalState = {
  hospitals: [],
  currentHospital: null,
  loading: false,
  error: null,
};

export const fetchHospitals = createAsyncThunk(
  'hospitals/fetchAll',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await hospitalService.getAll(params);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch hospitals');
    }
  }
);

export const fetchHospitalById = createAsyncThunk(
  'hospitals/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await hospitalService.getById(id);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch hospital');
    }
  }
);

export const fetchNearbyHospitals = createAsyncThunk(
  'hospitals/fetchNearby',
  async ({ lat, lng, distance }: { lat: number; lng: number; distance: number }, { rejectWithValue }) => {
    try {
      const response = await hospitalService.getNearby(lat, lng, distance);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch nearby hospitals');
    }
  }
);

const hospitalSlice = createSlice({
  name: 'hospitals',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentHospital: (state) => {
      state.currentHospital = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all hospitals
      .addCase(fetchHospitals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHospitals.fulfilled, (state, action: PayloadAction<Hospital[]>) => {
        state.loading = false;
        state.hospitals = action.payload;
      })
      .addCase(fetchHospitals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch hospital by ID
      .addCase(fetchHospitalById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHospitalById.fulfilled, (state, action: PayloadAction<Hospital>) => {
        state.loading = false;
        state.currentHospital = action.payload;
      })
      .addCase(fetchHospitalById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch nearby hospitals
      .addCase(fetchNearbyHospitals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNearbyHospitals.fulfilled, (state, action: PayloadAction<Hospital[]>) => {
        state.loading = false;
        state.hospitals = action.payload;
      })
      .addCase(fetchNearbyHospitals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentHospital } = hospitalSlice.actions;
export default hospitalSlice.reducer;