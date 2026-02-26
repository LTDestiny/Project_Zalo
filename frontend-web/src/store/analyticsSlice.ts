import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  AnalyticsState,
  AnalyticsDashboard,
  MessageAnalytics,
  UserAnalytics,
  GroupAnalytics,
  CallAnalytics,
  AnalyticsFilter,
} from '@/types/analytics.types';
import { analyticsApi } from '@/services/api/analyticsApi';

const initialState: AnalyticsState = {
  dashboard: null,
  messages: null,
  users: null,
  groups: null,
  calls: null,
  filter: {
    timeRange: '30days',
    platform: 'all',
  },
  loading: false,
  error: null,
};

// Async thunks
export const fetchDashboards = createAsyncThunk(
  'analytics/fetchDashboard',
  async (filter: AnalyticsFilter, { rejectWithValue }) => {
    try {
      const data = await analyticsApi.getDashboard(filter);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard');
    }
  }
);

export const fetchMessageAnalytics = createAsyncThunk(
  'analytics/fetchMessages',
  async (filter: AnalyticsFilter, { rejectWithValue }) => {
    try {
      const data = await analyticsApi.getMessageAnalytics(filter);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch message analytics');
    }
  }
);

export const fetchUserAnalytics = createAsyncThunk(
  'analytics/fetchUsers',
  async (filter: AnalyticsFilter, { rejectWithValue }) => {
    try {
      const data = await analyticsApi.getUserAnalytics(filter);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user analytics');
    }
  }
);

export const fetchGroupAnalytics = createAsyncThunk(
  'analytics/fetchGroups',
  async (filter: AnalyticsFilter, { rejectWithValue }) => {
    try {
      const data = await analyticsApi.getGroupAnalytics(filter);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch group analytics');
    }
  }
);

export const fetchCallAnalytics = createAsyncThunk(
  'analytics/fetchCalls',
  async (filter: AnalyticsFilter, { rejectWithValue }) => {
    try {
      const data = await analyticsApi.getCallAnalytics(filter);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch call analytics');
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<AnalyticsFilter>) => {
      state.filter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetAnalytics: () => initialState,
  },
  extraReducers: (builder) => {
    // Dashboard
    builder
      .addCase(fetchDashboards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboards.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchDashboards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Messages
    builder
      .addCase(fetchMessageAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessageAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessageAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Users
    builder
      .addCase(fetchUserAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUserAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Groups
    builder
      .addCase(fetchGroupAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(fetchGroupAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Calls
    builder
      .addCase(fetchCallAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCallAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.calls = action.payload;
      })
      .addCase(fetchCallAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilter, clearError, resetAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;
