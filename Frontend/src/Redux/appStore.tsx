import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";

const appStore = configureStore({
    reducer:{
        addUser:adminReducer,
        
    }
});
export type RootState = ReturnType<typeof appStore.getState>;
export default appStore;