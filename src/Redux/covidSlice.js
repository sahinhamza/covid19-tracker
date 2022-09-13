import { createSlice } from "@reduxjs/toolkit";
import { getDataAsync, getDailyDataAsync, getCountriesAsync } from "./fetchData";

export const covidSlice = createSlice({
    name: "covid",
    initialState: {
        countries: "",
        country: "",
        data: null,
        dailyData: null,
    },
    reducers: {
        changeCountry: (state, action) => {
            state.country = action.payload;
        }

    },
    extraReducers: {
        [getDataAsync.fulfilled]: (state, action) => {
            state.data = action.payload;
        },
        [getDataAsync.rejected]: (action) => {
            console.log(action.error.message);
        },
        [getDailyDataAsync.fulfilled]: (state, action) => {
            state.dailyData = action.payload;
        },
        [getDailyDataAsync.rejected]: (action) => {
            console.log(action.error.message);
        },
        [getCountriesAsync.fulfilled]: (state, action) => {
            state.countries = action.payload;
        },
        [getCountriesAsync.rejected]: (action) => {
            console.log(action.error.message);
        },
    }
});

export const { changeCountry } = covidSlice.actions;
export default covidSlice.reducer;