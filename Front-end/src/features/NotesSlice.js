import { createSlice } from "@reduxjs/toolkit";
import {
  createNote,
  getNotes,
  getSingleNote,
  updateNote,
} from "../../actions/NotesAction";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    loading: false,
    notesData: [],
    enteries: 0,
    wishList: 0,
    error: "",
    trigger: false,
  },
  reducers: {
    setTrigger: (state) => {
      state.trigger = !state.trigger; // Toggle the flag
    },
    resetNotesState: (state) => {
      state.loading = false;
      state.notesData = [];
      state.error = ""
    },

  },

  extraReducers: (builder) => {
    builder

      // All Notes
      .addCase(getNotes.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notesData = action.payload;
        state.enteries = action.payload.length;
        const wished = action.payload.filter(note => note.InWishlist == true)
        state.wishList = wished.length
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Single Note
      .addCase(getSingleNote.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getSingleNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notesData = action.payload;
      })
      .addCase(getSingleNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Note
      .addCase(createNote.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notesData.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false;
        state.notesData = [];
        state.error = action.payload || "Failed to create note";
      })

      // Update Note
      .addCase(updateNote.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notesData = action.payload;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update note";
      });
  },
});

export const { setTrigger, resetNotesState } = notesSlice.actions;

export default notesSlice.reducer;
