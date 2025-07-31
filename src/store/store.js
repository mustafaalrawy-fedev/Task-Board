import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";
import toastReducer from "./slices/toastSlice";

const store = configureStore({
    reducer: {
        task: taskReducer,
        toast: toastReducer
    }
})

export default store