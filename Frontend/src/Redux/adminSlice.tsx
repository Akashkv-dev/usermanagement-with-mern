import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AdminState {
    addOpen: boolean;
    searchKeys:string
}

const initialState: AdminState = {
    addOpen: false,
    searchKeys:""
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
        searchInput:(state,action:PayloadAction<string>)=>{
            state.searchKeys=action.payload;
        }
        
    }
})

export const {openAdduser,closeAdduser,searchInput }=adminSlice.actions;
export default adminSlice.reducer;
