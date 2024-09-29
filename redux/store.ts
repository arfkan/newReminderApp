import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice';
import taskReducer from '../redux/taskSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
 
 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
