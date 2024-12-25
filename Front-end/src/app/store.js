import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/UserSlice'
import notesReducer from '../features/NotesSlice'

const store = configureStore({
    reducer: {
      user: userReducer,
      notes: notesReducer,
    },
  })

  export default store