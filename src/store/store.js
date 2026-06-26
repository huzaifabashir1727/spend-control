import { configureStore } from "@reduxjs/toolkit";
import spendReducer from "../slice/slice";

export let store = configureStore({
    reducer: {
        spend: spendReducer
    }
})