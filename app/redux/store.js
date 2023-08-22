"use client"
import { configureStore } from "@reduxjs/toolkit";
import connectWalletReducer from "./feature/connect-wallet-slice"
import activeComponentReducer from "./feature/activeComponentSlice"


export const store = configureStore({
    reducer: {
        connectWalletReducer,
        activeComponent:activeComponentReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});
