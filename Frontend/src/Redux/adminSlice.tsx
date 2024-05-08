import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AdminState {
    addOpen: boolean;
}

const initialState: AdminState = {
    addOpen: false,
};

const adminSlice=createSlice({
    name:"addUser",
    initialState,

    reducers:{
        openAdduser:(state,action:PayloadAction<boolean>)=>{
            state.addOpen=action.payload;

        },
        closeAdduser:(state)=>{
            state.addOpen=false;

        },
        
    }
})

export const {openAdduser,closeAdduser }=adminSlice.actions;
export default adminSlice.reducer;
