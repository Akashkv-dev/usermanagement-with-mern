import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";

const appStore = configureStore({
    reducer:{
        addUser:adminReducer,
        
    }
});

export default appStore;