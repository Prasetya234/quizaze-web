import { configureStore } from "@reduxjs/toolkit"
import connectReducer from "./feature/connectSlice"
import soundReducer from "./feature/soundSlice"

export const store = configureStore({
    reducer: {
        connect: connectReducer,
        sound: soundReducer
    }
})