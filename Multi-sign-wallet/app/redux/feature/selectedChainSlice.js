"use client"
import { createSlice } from "@reduxjs/toolkit"


console.log(JSON.parse(null))

const initialState = JSON.parse(localStorage.getItem("selectChain")) || { chainName: "", chainId: "", denom: "" }

export const selectedChainSlice = createSlice({
    name: "selected Chain",
    initialState,
    reducers: {
        setSelectedChain: (state, action) => {
            state.chainName = action.payload.chainName;
            state.chainId = action.payload.chainId;
            state.denom = action.payload.denom;
            localStorage.setItem("selectChain", JSON.stringify(state))
            return state;
        }
    }
})

export const { setSelectedChain } = selectedChainSlice.actions

export default selectedChainSlice.reducer