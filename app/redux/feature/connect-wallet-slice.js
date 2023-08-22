"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setupWebKeplr, GasPrice } from "cosmwasm";

const userWalletInitialState = {
    user: {
        signer: "",
        clientSigner: ""
    },
    error: ""
}

const addChain = async () => {
    try {
        const data = await window.keplr.experimentalSuggestChain({
            chainId: "osmo-test-5",
            chainName: "Osmosis Testnet 5",
            rpc: "https://rpc.osmotest5.osmosis.zone:443",
            rest: "https://lcd.osmotest5.osmosis.zone:1317",
            bip44: {
                coinType: 118,
            },
            bech32Config: {
                bech32PrefixAccAddr: "osmo",
                bech32PrefixAccPub: "osmo" + "pub",
                bech32PrefixValAddr: "osmo" + "valoper",
                bech32PrefixValPub: "osmo" + "valoperpub",
                bech32PrefixConsAddr: "osmo" + "valcons",
                bech32PrefixConsPub: "osmo" + "valconspub",
            },
            currencies: [
                {
                    coinDenom: "OSMO",
                    coinMinimalDenom: "uosmo",
                    coinDecimals: 6,
                    coinGeckoId: "osmosis",
                },
            ],
            feeCurrencies: [
                {
                    coinDenom: "OSMO",
                    coinMinimalDenom: "uosmo",
                    coinDecimals: 6,
                    coinGeckoId: "osmosis",
                    gasPriceStep: {
                        low: 0.01,
                        average: 0.025,
                        high: 0.04,
                    },
                },
            ],
            stakeCurrency: {
                coinDenom: "OSMO",
                coinMinimalDenom: "uosmo",
                coinDecimals: 6,
                coinGeckoId: "osmosis",
            },
        });
    } catch (error) {
        console.log(error);
    }
}

export const connectWallet = createAsyncThunk("connectWallet", async () => {
    try {
        console.log("Hello World2")
        addChain();

        if (!window.keplr) {
            throw new Error("Keplr Wallet extension not found");
        }

        await window.keplr.enable("osmo-test-5");

        const offlineSigner = await window.keplr.getOfflineSigner("osmo-test-5");
        const accounts = await offlineSigner.getAccounts();

        const signerClient = await setupWebKeplr({
            rpcEndpoint: "https://rpc.osmotest5.osmosis.zone",
            chainId: "osmo-test-5",
            prefix: "osmosis",
            gasPrice: GasPrice.fromString("0.250uosmo"),
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
            console.log("Hello world 3")
            return {
                ...state,
                user: {
                    signer: action.payload.user.signer,
                    clientSigner: action.payload.user.clientSigner
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