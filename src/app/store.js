import { configureStore } from "@reduxjs/toolkit"
import connectReducer from "./feature/connectSlice"

export const store = configureStore({
    reducer: {
        connect: connectReducer
    }
})