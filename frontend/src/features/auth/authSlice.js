
import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    user: null,
    isLogged: false,
    role: null
}

const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginSuccess: (state,action) =>{
            state.user=action.payload;
            state.isLogged=true;
            state.role=action.payload.role;
        },
        logout:(state,action) =>{
            state.user=null;
            state.isLogged=false;
            state.role=null;
        }
    }
})


export const {loginSuccess, logout}= authSlice.actions;
export default authSlice.reducer
