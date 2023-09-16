import { createSlice } from "@reduxjs/toolkit";

const initialState={
    groupContract:""
}

export const groupContractSlice=createSlice({
    name:"group contract",
    initialState,
    reducers:{
        setGroupContract:(state,action)=>{
            state.groupContract=action.payload
        }
    }
})

export const {setGroupContract}=groupContractSlice.actions

export default groupContractSlice.reducer