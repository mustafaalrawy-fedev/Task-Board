import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        toastInfo: {}
    },
    reducers: {
        addToastInfo: (state, action) => {
            state.toastInfo = action.payload
        }
    }
});

export const { addToastInfo } = toastSlice.actions;
export default toastSlice.reducer;