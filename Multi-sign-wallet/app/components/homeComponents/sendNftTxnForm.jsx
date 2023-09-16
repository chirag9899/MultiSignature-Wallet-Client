import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import TollIcon from '@mui/icons-material/Toll';
import { InputAdornment, TextField } from '@mui/material';
import { Button } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveComponent } from '@/app/redux/feature/activeComponentSlice';



const SendNftTxnForm = () => {
    const { clientSigner, signer } = useSelector(state => state.connectWalletReducer.user)
    const queryParams = useSearchParams()
    const dispatch = useDispatch()
    const router = useRouter()
    

    const [nftFormData, setNftFormData] = useState({
        title: "",
        description: "",
        nftAddress: "",
        recipientAddress: "",
        token_id: ""
    })



    const handleNftFormData = (event) => {
        const { name, value } = event.target;

        setNftFormData((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    const handleSubmit = async () => {

        try {
            const approvalTxn = await clientSigner.execute(
                signer,
                nftFormData.nftAddress,
                {
                    approve: {
                        spender: queryParams.get("multi_sig"),
                        token_id: nftFormData.token_id,
                        expires: undefined
                    }
                },
                "auto"
            )
            const createNftTransferProposal = await clientSigner.execute(
                signer,
                queryParams.get("multi_sig"),
                {
                    propose: {
                        title: nftFormData.title,
                        description: nftFormData.description,
                        msgs: [{
                            wasm: {
                                execute: {
                                    contract_addr: nftFormData.nftAddress,
                                    msg: btoa(JSON.stringify({
                                        transfer_nft: {
                                            recipient: nftFormData?.recipientAddress,
                                            token_id: nftFormData?.token_id
                                        }
                                    })),
                                    funds: []
                                }
                            }
                        }],
                    },
                },
                "auto"
            )
            router.push(`/home/transactions?multi_sig=${queryParams.get('multi_sig')}`)
            dispatch(setActiveComponent(1))
            console.log(createNftTransferProposal)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col my-10 mx-36 gap-4 w-full relative'>
            <div className='w-full'>
                <p className='text-3xl font-bold tracking-wider'>New Transaction</p>
            </div>
            <div className='bg-white flex flex-col p-6 rounded-md gap-6 w-full'>
                <div className='flex gap-3 items-center'>
                    <TollIcon className='text-teal-800 ' />
                    <p className='text-xl font-semibold tracking-wide'>Send NFT</p>
                </div>
                <div className='flex flex-col gap-8'>

                    <TextField name='title' id='title' fullWidth label="Title" variant='outlined' required color='secondary' value={nftFormData.title} onChange={(e) => handleNftFormData(e)} />
                    <TextField name='description' id='description' fullWidth label="Description" variant='outlined' value={nftFormData.description} required color='secondary' onChange={(e) => handleNftFormData(e)} />
                    <TextField name='nftAddress' id='nftAddress' value={nftFormData.nftAddress} fullWidth label="NFT Address" variant='outlined' color='secondary' required onChange={(e) => handleNftFormData(e)} />
                    <TextField name='recipientAddress' id='recipientAddress' value={nftFormData.recipientAddress} fullWidth label="Recipient address" variant='outlined' color='secondary' required onChange={(e) => handleNftFormData(e)} />
                    <TextField name='token_id' id='token_id' fullWidth label="Token Id" value={nftFormData.amount} variant='outlined' required color='secondary' onChange={(e) => handleNftFormData(e)} />
                </div>
                <div className='flex justify-end'>
                    <Button radius='sm' className='text-white bg-black text-lg font-semibold'
                        onClick={handleSubmit}
                    >Next</Button>
                </div>
            </div>
            <div className='rounded-full text-xs font-semibold bg-white border-1 absolute py-4 px-2 right-3 -top-4 cursor-pointer' onClick={() => dispatch(setActiveComponent(1))}>
                close
            </div>
        </div>
    )
}

export default SendNftTxnForm