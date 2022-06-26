import { configureStore } from "@reduxjs/toolkit"
import connectReducer from "./feature/connectSlice"
import soundReducer from "./feature/soundSlice"

const reducer = {
    connect: connectReducer,
    sound: soundReducer,
}

const store = configureStore({
    reducer: reducer,
    devTools: true
})

export default store;