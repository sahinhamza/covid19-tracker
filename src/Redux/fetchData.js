import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataAsync = createAsyncThunk("covid/getDataAsync", async (url) => {
    const res = await axios.get(url);
    return res.data;
})

export const getDailyDataAsync = createAsyncThunk("covid/getDailyDataAsync", async (url) => {
    const { data } = await axios.get(url);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return modifiedData;
})

export const getCountriesAsync = createAsyncThunk("covid/getCountriesAsync", async (url) => {
    const res = await axios.get(url);
    return res.data.countries.map((country) => country.name);
})