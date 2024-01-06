import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getuserDetails } from "../api_calls/userApi";

// Create an async thunk action
export const fetchUserInfo = createAsyncThunk(
    'user/fetchUserInfo',
    async () => {
        const response = await axios.get(getuserDetails, { withCredentials: true });
        return response.data.user;
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: { user: {}, status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;
