import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // middleware'i varsayılan olarak kullan
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Kodunuzda bu ayar, seri hale getirilemeyen bir değerin duruma veya eylemlere dahil olabileceği bir durumu önlemek veya hata almamak için kullanılmış.
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
