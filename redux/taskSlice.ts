import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



 const API_URL = 'http://192.168.1.44:5000/api/tasks';

 // görev oluşturma thunk
 export const createTask = createAsyncThunk(
    'task/createTask',
    async (taskData: {task: string; category: string; deadline: string; Date: string; degree: string}, {rejectWithValue}) => {
        try {
            const response = await axios.post(API_URL, taskData);
            return response.data;
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data?.message || 'Görev oluşturulamadı');
            }
            return rejectWithValue('Bir hata oluştu');
        }
    }
 );

 //  görevleri getirme thunk 
 export const fetchTask = createAsyncThunk(
    'task/fetchTask',
   async (_ , {rejectWithValue}) =>{
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data?.message || 'Görevler getirilemedi');
    }
    return rejectWithValue('Bir hata oluştu');
   }
}
 );

 // görev güncelleme thunk 
 export const updateTask = createAsyncThunk(
    'task/updateTask',
    async ({ id, taskData }: { id: string; taskData: Partial<Task> }, { rejectWithValue }) =>{
        try {
            const response = await axios.put(`${API_URL}/${id}`, taskData);
            return response.data;
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data?.message || 'Görevler güncellenemedi');
        }
        return rejectWithValue('Bir hata oluştu');
    }
}
 );

 // görev silme thunk 
 export const deleteTask = createAsyncThunk(
    'task/deleteTask',
    async (id: string, { rejectWithValue })  => {
        try {
         await axios.delete(`${API_URL}/${id}`);
            return id;
        } catch (error)  {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data?.message || 'Görevler silinemedi');
        }
        return rejectWithValue('Bir hata oluştu');
    };

    }
 );


 interface Task {
    _id: string;
    task: string;
    category: string;
    deadline: Date;
    degree: string;
    audioPath: string;
 }

 interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
 }

 const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
 };

 const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },

    },
    extraReducers: (builder) => {
        builder
        // create task actions
        .addCase(createTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createTask.fulfilled, (state, action) => {
           state.loading = true;
           state.tasks.push(action.payload);
        })
        .addCase(createTask.rejected, (state, action)=>{
            state.loading = true;
            state.error = action.payload as string;
        })

        // fetch tasks actions
        .addCase(fetchTask.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTask.fulfilled, (state, action)=>{
            state.loading = true;
            state.tasks = action.payload;
        })
        .addCase(fetchTask.rejected, (state, action)=> {
            state.loading = true;
            state.error = action.payload as string;
        })

        // delete tasks actions
        .addCase(deleteTask.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteTask.fulfilled, (state, action)=>{
            state.loading = true;
            state.tasks = state.tasks.filter(task=> task._id !== action.payload);
        })
        .addCase(deleteTask.rejected, (state, action)=> {
            state.loading = true;
            state.error = action.payload as string;
        });
    },
 });

 export const {clearError} = taskSlice.actions;
 export default taskSlice.reducer;
