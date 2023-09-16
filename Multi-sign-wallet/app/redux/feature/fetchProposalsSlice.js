import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const proposalInitialState = {
    proposalList: [],
    error: ""
}

export const fetchProposals = createAsyncThunk("fetchProposals", async (data) => {
    
    try {
        const proposalsData = await data?.clientSigner?.queryContractSmart(
            data?.contract,
            {
                list_proposals: {
                    start_after:undefined,
                    limit:100
                }
            }
        )

        return {
            proposals: proposalsData?.proposals
        }
    } catch(error) {
        console.log(error)
    }
})

const createFetchProposalsSlice = createSlice({
    name: "Fetch Proposal Slice",
    initialState: proposalInitialState,
    extraReducers: builder => {
        builder.addCase(fetchProposals.fulfilled, (state, action) => {
            return {
                ...state,
                proposalList: action?.payload?.proposals?.sort((a,b)=>b.id-a.id)
            }
        }),
        builder.addCase(fetchProposals.rejected, (state, action) => {
            return {
                ...state,
                proposalList: [],
                error: action.error.message
            }
        })
    }
})

export default createFetchProposalsSlice.reducer