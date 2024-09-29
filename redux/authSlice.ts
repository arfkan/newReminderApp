
  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
  import axios from 'axios';
  
  // API URL'sini tanımlayın (örnek olarak)
  const API_URL = 'http://192.168.1.44:5000/api/auth';
  
  // Login thunk
  export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.response?.data?.message || 'Giriş başarısız oldu');
        }
        return rejectWithValue('Bir hata oluştu');
      }
    }
  );
  
  // Register thunk
  export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ userName, email, password }: { userName: string; email: string; password: string }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${API_URL}/register`, { userName, email, password });
        return response.data;
      } catch (error) {
        console.error('Error:', error); // Hatanın detayını görmek için log ekleyin
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.response?.data?.message || 'Kayıt başarısız oldu');
        }
        return rejectWithValue('Bir hata oluştu');
      }
    }
  );



  interface AuthState {
    user: any | null;
    token: string | null;
    error: string | null;
    loading: boolean;
  }
  
  const initialState: AuthState = {
    user: null,
    token: null,
    error: null,
    loading: false,
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
        state.token = null;
      },
      clearError: (state) => {
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        // Login actions
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Register actions
        .addCase(registerUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export const { logout, clearError } = authSlice.actions;
  export default authSlice.reducer;