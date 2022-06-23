import { createSlice } from "@reduxjs/toolkit";

const connectSlice = createSlice({
    name: "connect",
    initialState: {
        profile: {
            username: "",
            email: "",
            avatar: "",
        }
    },
    reducers: {
        post: (state, action) => {
            state.profile.username = action.payload.username;
            state.profile.email = action.payload.email;
            state.profile.avatar = action.payload.avatar;
        }
    }
})

export const { post } = connectSlice.actions;
export default connectSlice.reducer;