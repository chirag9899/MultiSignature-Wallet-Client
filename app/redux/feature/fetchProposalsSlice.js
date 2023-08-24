import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const proposalInitialState = {
    proposalList: [],
    error: ""
}

export const fetchProposals = createAsyncThunk("fetchProposals", async (data) => {
    console.log(data?.clientSigner) 
    console.log(data?.contract)
    try {
        const proposalsData = await data?.clientSigner.queryContractSmart(
            data?.contract,
            {
                list_proposals: {
                    start_after:undefined,
                    limit:100
                }
            }
        )

        console.log(proposalsData.proposals)

        return {
            proposals: proposalsData.proposals
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
                proposalList: action.payload.proposals
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