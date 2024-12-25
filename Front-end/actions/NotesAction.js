import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setTrigger } from "../src/features/NotesSlice";
import { getAuthHeaders } from "./helper";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// GetNotes action
export const getNotes = createAsyncThunk(
  "getNotes",
  async (_, { getState, rejectWithValue }) => {
    
    const state = getState();

    const userId = state?.user?.userData?.id;
    if (!userId) {
      throw new Error("User ID is not available");
    }

    try {
      const response = await axios.get(
        `${BASE_URL}/notes/get-all-notes/${userId}`,{headers: getAuthHeaders()}
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// GetSingleNote action
export const getSingleNote = createAsyncThunk(
  "getSingleNote",
  async (specific_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/notes/get-single-note/${specific_id}`,{headers: getAuthHeaders()}
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// CreateNote action
export const createNote = createAsyncThunk(
  "createNote",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/notes/create-note`,data,{headers: getAuthHeaders()}
      );
      dispatch(setTrigger()); // Dispatch trigger if necessary
      toast.success(response.data.message);
      return response.data.note; // Return only the created note
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage); // Return error message
    }
  }
);

// DeleteNote action
export const deleteNote = createAsyncThunk(
  "deleteNote",
  async (note_id, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/notes/delete-note`,{
            headers: getAuthHeaders(),
            data: { note_id },
        }
      );
      dispatch(setTrigger()); // Dispatch trigger if necessary
      toast.success(response.data.message);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// UpdateNote action
export const updateNote = createAsyncThunk(
  "updateNote",
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/notes/update-note/${id}`,
        data,
        {headers: getAuthHeaders()}
      );
      dispatch(setTrigger());
      toast.success(response.data.message);
      return response.data.updatedNote;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage); // Return error message
    }
  }
);

// Toggle Wishlist Action
export const toggleWishlist = createAsyncThunk(
  "notes/toggleWishlist",
  async (noteId, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/notes/toggle-wishlist/${noteId}`,
        {},
        { headers: getAuthHeaders() }
      );

      dispatch(setTrigger());

      toast.success("Wishlist updated");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);