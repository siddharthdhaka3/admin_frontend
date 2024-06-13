import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface CurrentUser{
    name:string;
    email:String;
    
}

const initialState:CurrentUser = {
    name:"",
    email:"",
    
}

export const currentUserSlice = createSlice({
    name:"currentUser",
    initialState,
    reducers:{
        setCurrentUser:(
            state,
            action: PayloadAction<{ name: string; email: string;}>
        )=>{
            state.name = action.payload.name;
            state.email = action.payload.email;

        },
        resetCurrentUserData:(state) => {
            state.name = "";
            state.email = "";
        },
    }
});

export const {setCurrentUser, resetCurrentUserData} = currentUserSlice.actions;
export default currentUserSlice.reducer;