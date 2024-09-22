{/*
  Bu kod, kullanıcı giriş ve kayıt işlemlerini simüle eden bir Redux dilimi oluşturur. 
  Asenkron işlemleri yönetmek için createAsyncThunk kullanılır
   ve extraReducers ile bu işlemlerin sonucuna göre durumu günceller.
   Böylece, uygulamanızda kimlik doğrulama işlemlerini kolayca yönetebilirsiniz.
  */}

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Login thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Mock delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      //  Mock successful login response
      const mockResponse = { data: { token: 'mock_token_123' } };
      
      // Kimlik bilgilerinin geçerli olup olmadığını kontrol et (mock validation)
      if (email === 'test@example.com' && password === 'password123') {
        return mockResponse.data;
      } else {
        return rejectWithValue('Geçersiz e-posta veya şifre.');
      }
      
    } catch (error) {
      return rejectWithValue('Bir hata oluştu.');
    }
  }
);

// Register thunk
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, email, password }: { username: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      // Mock delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful registration response
      const mockResponse = { data: { token: 'mock_token_123' } };
      
      // Mock validation
      if (email.includes('@') && password.length >= 6) {
        return mockResponse.data;
      } else {
        return rejectWithValue('Geçersiz kayıt bilgileri.');
      }
    } catch (error) {
      return rejectWithValue('Bir hata oluştu.');
    }
  }
);

interface AuthState {
  token: string | null;
  error: string | null;
  loading: boolean;
}

// Initial state
const initialState: AuthState = {
  token: null,
  error: null,
  loading: false,
};

// Create auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login actions
      .addCase(loginUser.pending, (state) => { // pending durumu: İşlem başladığında yükleme durumu etkinleştirilir (loading = true), hata durumu sıfırlanır.
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => { // fulfilled Durumu: İşlem başarıyla tamamlandığında yükleme durumu devre dışı bırakılır ve token saklanır
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => { // rejected Durumu: İşlem başarısız olduğunda yükleme durumu devre dışı bırakılır ve hata mesajı güncellenir.
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
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
