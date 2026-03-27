
import { createSlice } from "@reduxjs/toolkit";

const initialstate= {
    user: null,
    isLogged: false
}

const authSlice= createSlice({
    name:"auth",
    initialstate,
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
