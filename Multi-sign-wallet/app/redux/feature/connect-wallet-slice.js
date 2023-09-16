"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setupWebKeplr, GasPrice } from "cosmwasm";
import { addChainArchway, addChainOsmo } from "../addchains";
import { chainData } from "../chainData";

const userWalletInitialState = {
    user: {
        signer: "",
        clientSigner: ""
    },
    error: ""
}


export const connectWallet = createAsyncThunk("connectWallet", async (chainId) => {
    try {
        addChainOsmo();
        addChainArchway();

        const getChain=chainData.get(`${chainId}`)


        if (!window.keplr) {
            throw new Error("Keplr Wallet extension not found");
        }


        await window.keplr.enable(getChain.chainId);

        const offlineSigner = await window.keplr.getOfflineSigner(getChain.chainId);
        const accounts = await offlineSigner.getAccounts();

        const signerClient = await setupWebKeplr({
            rpcEndpoint: getChain.rpc,
            chainId: getChain.chainId,
            prefix: getChain.prefix,
            gasPrice: GasPrice.fromString(getChain.gasPrice),
        });

        return {
            user: {
                signer: accounts[0].address,
                clientSigner: signerClient
            }
        }
    } catch (error) {
        console.log(error)
    }
})

export const connectSlice = createSlice({
    name: "connect wallet slice",
    initialState: userWalletInitialState,
    extraReducers: builder => {
        builder.addCase(connectWallet.fulfilled, (state, action) => {
            return {
                ...state,
                user: {
                    signer: action?.payload?.user.signer,
                    clientSigner: action?.payload?.user.clientSigner
                },
                error: ""
            }
        })
        builder.addCase(connectWallet.rejected, (state, action) => {
            return {
                ...state,
                user: {
                    signer: "",
                    clientSigner: ""
                },
                error: action.error.message
            }
        })
    },
    reducers: {
        disconnect: () => {
            return {
                user: {
                    signer: "",
                    clientSigner: ""
                },
                error: ""
            }
        }
    }
})

export const { disconnect } = connectSlice.actions
export default connectSlice.reducer;