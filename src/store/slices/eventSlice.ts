import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { eventService } from '../../services/api';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  organizer: string;
  image?: string;
  attendees?: string[];
}

interface EventState {
  events: Event[];
  currentEvent: Event | null;
  upcomingEvents: Event[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: EventState = {
  events: [],
  currentEvent: null,
  upcomingEvents: [],
  loading: false,
  error: null,
  success: false
};

// Async thunks
export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await eventService.getAll(params);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch events');
    }
  }
);

export const fetchEventById = createAsyncThunk(
  'events/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await eventService.getById(id);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch event');
    }
  }
);

export const fetchUpcomingEvents = createAsyncThunk(
  'events/fetchUpcoming',
  async (_, { rejectWithValue }) => {
    try {
      const response = await eventService.getUpcoming();
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch upcoming events');
    }
  }
);

export const fetchEventsByCategory = createAsyncThunk(
  'events/fetchByCategory',
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await eventService.getByCategory(category);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch events by category');
    }
  }
);

export const createEvent = createAsyncThunk(
  'events/create',
  async (eventData: any, { rejectWithValue }) => {
    try {
      const response = await eventService.create(eventData);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create event');
    }
  }
);

export const updateEventThunk = createAsyncThunk(
  'events/update',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await eventService.update(id, data);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update event');
    }
  }
);

export const deleteEventThunk = createAsyncThunk(
  'events/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await eventService.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete event');
    }
  }
);

export const registerForEventThunk = createAsyncThunk(
  'events/register',
  async (eventId: string, { rejectWithValue }) => {
    try {
      const response = await eventService.registerForEvent(eventId);
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to register for event');
    }
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
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
      // Fetch all events
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch event by ID
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading = false;
        state.currentEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch upcoming events
      .addCase(fetchUpcomingEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false;
        state.upcomingEvents = action.payload;
      })
      .addCase(fetchUpcomingEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch events by category
      .addCase(fetchEventsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventsByCategory.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEventsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create event
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading = false;
        state.events.push(action.payload);
        state.success = true;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      
      // Update event
      .addCase(updateEventThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateEventThunk.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading = false;
        const index = state.events.findIndex(event => event._id === action.payload._id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        if (state.currentEvent && state.currentEvent._id === action.payload._id) {
          state.currentEvent = action.payload;
        }
        state.success = true;
      })
      .addCase(updateEventThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      
      // Delete event
      .addCase(deleteEventThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteEventThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.events = state.events.filter(event => event._id !== action.payload);
        if (state.currentEvent && state.currentEvent._id === action.payload) {
          state.currentEvent = null;
        }
        state.success = true;
      })
      .addCase(deleteEventThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      
      // Register for event
      .addCase(registerForEventThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerForEventThunk.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading = false;
        const index = state.events.findIndex(event => event._id === action.payload._id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        if (state.currentEvent && state.currentEvent._id === action.payload._id) {
          state.currentEvent = action.payload;
        }
        state.success = true;
      })
      .addCase(registerForEventThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
  },
});

export const { clearCurrentEvent, clearError, resetSuccess } = eventSlice.actions;
export default eventSlice.reducer;