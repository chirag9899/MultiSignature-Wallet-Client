import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    activeComponent: 1,
}

export const activeComponentSlice = createSlice({
    name: "activeComponent",
    initialState,
    reducers: {
        setActiveComponent: (state, action) => {
            state.activeComponent = action.payload;
        }
    }
})

export const { setActiveComponent } = activeComponentSlice.actions

export default activeComponentSlice.reducer