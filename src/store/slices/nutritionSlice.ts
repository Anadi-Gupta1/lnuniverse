import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { nutritionService } from '../../services/api';

interface NutritionTip {
  _id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image?: string;
  source?: string;
  createdAt: string;
}

interface NutritionState {
  nutritionTips: NutritionTip[];
  currentTip: NutritionTip | null;
  latestTips: NutritionTip[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: NutritionState = {
  nutritionTips: [],
  currentTip: null,
  latestTips: [],
  loading: false,
  error: null,
  success: false
};

// Async thunks
export const fetchNutritionTips = createAsyncThunk(
  'nutrition/fetchAll',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await nutritionService.getAll(params);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch nutrition tips');
    }
  }
);

export const fetchNutritionTipById = createAsyncThunk(
  'nutrition/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await nutritionService.getById(id);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch nutrition tip');
    }
  }
);

export const fetchLatestNutritionTips = createAsyncThunk(
  'nutrition/fetchLatest',
  async (_, { rejectWithValue }) => {
    try {
      const response = await nutritionService.getLatest();
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch latest nutrition tips');
    }
  }
);

export const fetchNutritionTipsByCategory = createAsyncThunk(
  'nutrition/fetchByCategory',
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await nutritionService.getByCategory(category);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch nutrition tips by category');
    }
  }
);

export const createNutritionTip = createAsyncThunk(
  'nutrition/create',
  async (tipData: any, { rejectWithValue }) => {
    try {
      const response = await nutritionService.create(tipData);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create nutrition tip');
    }
  }
);

export const updateNutritionTip = createAsyncThunk(
  'nutrition/update',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await nutritionService.update(id, data);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update nutrition tip');
    }
  }
);

export const deleteNutritionTip = createAsyncThunk(
  'nutrition/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await nutritionService.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete nutrition tip');
    }
  }
);

const nutritionSlice = createSlice({
  name: 'nutrition',
  initialState,
  reducers: {
    clearCurrentTip: (state) => {
      state.currentTip = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all nutrition tips
      .addCase(fetchNutritionTips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNutritionTips.fulfilled, (state, action: PayloadAction<NutritionTip[]>) => {
        state.loading = false;
        state.nutritionTips = action.payload;
      })
      .addCase(fetchNutritionTips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch nutrition tip by ID
      .addCase(fetchNutritionTipById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNutritionTipById.fulfilled, (state, action: PayloadAction<NutritionTip>) => {
        state.loading = false;
        state.currentTip = action.payload;
      })
      .addCase(fetchNutritionTipById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch latest nutrition tips
      .addCase(fetchLatestNutritionTips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestNutritionTips.fulfilled, (state, action: PayloadAction<NutritionTip[]>) => {
        state.loading = false;
        state.latestTips = action.payload;
      })
      .addCase(fetchLatestNutritionTips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch nutrition tips by category
      .addCase(fetchNutritionTipsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNutritionTipsByCategory.fulfilled, (state, action: PayloadAction<NutritionTip[]>) => {
        state.loading = false;
        state.nutritionTips = action.payload;
      })
      .addCase(fetchNutritionTipsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create nutrition tip
      .addCase(createNutritionTip.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createNutritionTip.fulfilled, (state, action: PayloadAction<NutritionTip>) => {
        state.loading = false;
        state.nutritionTips.push(action.payload);
        state.success = true;
      })
      .addCase(createNutritionTip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      
      // Update nutrition tip
      .addCase(updateNutritionTip.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateNutritionTip.fulfilled, (state, action: PayloadAction<NutritionTip>) => {
        state.loading = false;
        const index = state.nutritionTips.findIndex(tip => tip._id === action.payload._id);
        if (index !== -1) {
          state.nutritionTips[index] = action.payload;
        }
        if (state.currentTip && state.currentTip._id === action.payload._id) {
          state.currentTip = action.payload;
        }
        state.success = true;
      })
      .addCase(updateNutritionTip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      
      // Delete nutrition tip
      .addCase(deleteNutritionTip.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteNutritionTip.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.nutritionTips = state.nutritionTips.filter(tip => tip._id !== action.payload);
        if (state.currentTip && state.currentTip._id === action.payload) {
          state.currentTip = null;
        }
        state.success = true;
      })
      .addCase(deleteNutritionTip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
  },
});

export const { clearCurrentTip, clearError, resetSuccess } = nutritionSlice.actions;
export default nutritionSlice.reducer;