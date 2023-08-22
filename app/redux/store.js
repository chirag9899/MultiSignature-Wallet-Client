"use client"
import { configureStore } from "@reduxjs/toolkit";
import connectWalletReducer from "./feature/connect-wallet-slice"
import activeComponentReducer from "./feature/activeComponentSlice"
import fetchProposalsReducer from "./feature/fetchProposalsSlice"

export const store = configureStore({
    reducer: {
        connectWalletReducer,
        activeComponent:activeComponentReducer,
        fetchProposalsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});
