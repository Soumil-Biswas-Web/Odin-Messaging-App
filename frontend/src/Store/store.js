import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './User.js/UserSlice'

export const store = configureStore({
    reducer: {
        userReducer,
    }
})