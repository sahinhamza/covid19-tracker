import {configureStore} from "@reduxjs/toolkit";
import covidSliceReducer from "./covidSlice";

export const store = configureStore({
    reducer:{
        covid: covidSliceReducer
    }
})