import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { resetNotesState } from "../src/features/NotesSlice";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    // SignUp or CreateUser action

export const createUser = createAsyncThunk(
    'createUser',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/users/sign-up`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            localStorage.setItem('token', JSON.stringify(response.data.token))
            localStorage.setItem('user', JSON.stringify(response.data.user))

            return response.data; 
        } catch (error) {
            const errorMessage = error?.response?.data.message || "Something went wrong";
            return rejectWithValue(errorMessage);
        }
    }
);

    // LogIn action

export const LogIn = createAsyncThunk(
    'LogIn',
    async (data, {rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/users/sign-in`, data);

            localStorage.setItem('token', JSON.stringify(response.data.token))
            localStorage.setItem('user', JSON.stringify(response.data.user))

            return response.data; 
        } catch (error) {
            const errorMessage = error?.response?.data.message || "Something went wrong";
            return rejectWithValue(errorMessage);
        }
    }
);

    // Logout action

export const LogOut = createAsyncThunk(
    'LogOut',
        async (_, { dispatch }) => {
            dispatch(resetNotesState()); // Clear notes state
            localStorage.removeItem('user')
            localStorage.removeItem('token')
    }
);