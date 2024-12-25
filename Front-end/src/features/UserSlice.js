import { createSlice } from "@reduxjs/toolkit";
import { createUser, LogIn, LogOut } from "../../actions/UserAction";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        userData: JSON.parse(localStorage.getItem('user')) || null,
        error: false,
        message : ''
    },
    reducers: {
        reset : (state) => {
            state.loading = false
            state.error = false
            state.message = ''
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false
                state.userData = action.payload.user
                state.message = action.payload.message
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.message = action.payload
                state.userData = null
            })

            .addCase(LogIn.pending, (state) => {
                state.loading = true
            })
            .addCase(LogIn.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.userData = action.payload.user
                state.message = action.payload.message
            })
            .addCase(LogIn.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.message = action.payload
                state.userData = null
            })

            .addCase(LogOut.fulfilled, (state => {
                state.userData = null
            }))
    },
    
  })

  export const { reset } = userSlice.actions

  export default userSlice.reducer;