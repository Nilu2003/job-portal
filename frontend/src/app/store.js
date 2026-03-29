import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js"
import jobReducer from "../features/jobs/jobSlice.js"

export const store= configureStore({
    reducer:{
        auth: authReducer,
        jobs: jobReducer 
    }
})