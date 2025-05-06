import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { pharmacyService } from '../../services/api';

interface Medicine {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  prescriptionRequired: boolean;
  manufacturer: string;
  expiryDate: string;
}

interface Pharmacy {
  _id: string;
  name: string;
  address: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  contactNumber: string;
  email: string;
  operatingHours: {
    open: string;
    close: string;
  };
  medicines: Medicine[];
}

interface Order {
  _id: string;
  user: string;
  pharmacy: string;
  medicines: {
    medicine: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  createdAt: string;
}

interface PharmacyState {
  pharmacies: Pharmacy[];
  selectedPharmacy: Pharmacy | null;
  nearbyPharmacies: Pharmacy[];
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: PharmacyState = {
  pharmacies: [],
  selectedPharmacy: null,
  nearbyPharmacies: [],
  orders: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchPharmacies = createAsyncThunk(
  'pharmacy/fetchAll',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await pharmacyService.getAll(params);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch pharmacies');
    }
  }
);

export const fetchPharmacyById = createAsyncThunk(
  'pharmacy/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await pharmacyService.getById(id);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch pharmacy');
    }
  }
);

export const fetchNearbyPharmacies = createAsyncThunk(
  'pharmacy/fetchNearby',
  async ({ lat, lng, distance }: { lat: number; lng: number; distance: number }, { rejectWithValue }) => {
    try {
      const response = await pharmacyService.getNearby(lat, lng, distance);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch nearby pharmacies');
    }
  }
);

export const createPharmacy = createAsyncThunk(
  'pharmacy/create',
  async (pharmacyData: any, { rejectWithValue }) => {
    try {
      const response = await pharmacyService.create(pharmacyData);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create pharmacy');
    }
  }
);

export const updatePharmacyThunk = createAsyncThunk(
  'pharmacy/update',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await pharmacyService.update(id, data);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update pharmacy');
    }
  }
);

export const deletePharmacyThunk = createAsyncThunk(
  'pharmacy/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await pharmacyService.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete pharmacy');
    }
  }
);

export const orderMedicine = createAsyncThunk(
  'pharmacy/orderMedicine',
  async (orderData: any, { rejectWithValue }) => {
    try {
      const response = await pharmacyService.orderMedicine(orderData);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to place order');
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'pharmacy/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await pharmacyService.getUserOrders();
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your orders');
    }
  }
);

const pharmacySlice = createSlice({
  name: 'pharmacy',
  initialState,
  reducers: {
    setSelectedPharmacy: (state, action: PayloadAction<Pharmacy | null>) => {
      state.selectedPharmacy = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all pharmacies
      .addCase(fetchPharmacies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPharmacies.fulfilled, (state, action: PayloadAction<Pharmacy[]>) => {
        state.loading = false;
        state.pharmacies = action.payload;
      })
      .addCase(fetchPharmacies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch pharmacy by ID
      .addCase(fetchPharmacyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPharmacyById.fulfilled, (state, action: PayloadAction<Pharmacy>) => {
        state.loading = false;
        state.selectedPharmacy = action.payload;
      })
      .addCase(fetchPharmacyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch nearby pharmacies
      .addCase(fetchNearbyPharmacies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNearbyPharmacies.fulfilled, (state, action: PayloadAction<Pharmacy[]>) => {
        state.loading = false;
        state.nearbyPharmacies = action.payload;
      })
      .addCase(fetchNearbyPharmacies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create pharmacy
      .addCase(createPharmacy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPharmacy.fulfilled, (state, action: PayloadAction<Pharmacy>) => {
        state.loading = false;
        state.pharmacies.push(action.payload);
      })
      .addCase(createPharmacy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update pharmacy
      .addCase(updatePharmacyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePharmacyThunk.fulfilled, (state, action: PayloadAction<Pharmacy>) => {
        state.loading = false;
        const index = state.pharmacies.findIndex(pharm => pharm._id === action.payload._id);
        if (index !== -1) {
          state.pharmacies[index] = action.payload;
        }
        if (state.selectedPharmacy && state.selectedPharmacy._id === action.payload._id) {
          state.selectedPharmacy = action.payload;
        }
      })
      .addCase(updatePharmacyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete pharmacy
      .addCase(deletePharmacyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePharmacyThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.pharmacies = state.pharmacies.filter(pharm => pharm._id !== action.payload);
        if (state.selectedPharmacy && state.selectedPharmacy._id === action.payload) {
          state.selectedPharmacy = null;
        }
      })
      .addCase(deletePharmacyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Order medicine
      .addCase(orderMedicine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderMedicine.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(orderMedicine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch user orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedPharmacy, clearError } = pharmacySlice.actions;
export default pharmacySlice.reducer;