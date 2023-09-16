import React, { useState } from 'react'
import TollIcon from '@mui/icons-material/Toll';
import { InputAdornment, TextField } from '@mui/material';
import { Button } from '@nextui-org/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveComponent } from '@/app/redux/feature/activeComponentSlice';


const SendTokenTxnForm = () => {
    const { clientSigner, signer } = useSelector(state => state.connectWalletReducer.user)
    const queryParams = useSearchParams()
    const dispatch=useDispatch()
    const router = useRouter()

    const [tokenFormData, setTokenFormData] = useState({
        title: "",
        description: "",
        tokenContractAddress:"",
        address: "",
        amount: 0
    })



    const handleTokenFormData = (event) => {
        const { name, value } = event.target;

        setTokenFormData((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    const handleMint=async()=>{
        const querytxn=await clientSigner.queryContractSmart(
            tokenFormData.tokenContractAddress,
            {
                balance:{
                    address:tokenFormData.address
                }
            }
        )
        console.log(querytxn)
        try {
            const mintTxn=await clientSigner.execute(
            
                signer,
                tokenFormData.tokenContractAddress,
                {
                    mint:{
                        recipient:tokenFormData.address,
                        amount:tokenFormData.amount
                    }
                },
                "auto"
    
            )
    
            console.log(mintTxn)
            
        } catch (error) {
            console.log(error)
        }
        
        
    }


    const handleSubmit = async () => {

        try {
            const approvalTxn=await clientSigner.execute(
                signer,
                tokenFormData?.tokenContractAddress,
                {
                    increase_allowance:{
                        spender: queryParams.get("multi_sig"),
                        amount:tokenFormData.amount,
                        expires:undefined
                    }
                },
                "auto"
            )
            const createTokenTransferProposal = await clientSigner.execute(
                signer,
                queryParams.get("multi_sig"),
                {
                    propose: {
                        title: tokenFormData.title,
                        description: tokenFormData.description,
                        msgs: [{
                            wasm: {
                                execute: {
                                    contract_addr:tokenFormData.tokenContractAddress,
                                    msg: btoa(JSON.stringify({
                                        transfer_from: {
                                            owner: signer,
                                            recipient: tokenFormData?.address,
                                            amount: tokenFormData?.amount
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
            console.log(createTokenTransferProposal)

        } catch (error) {
            console.log(error)
        }
    }

    console.log(tokenFormData)
    return (
        <div className='flex flex-col my-10 mx-36 gap-4 w-full relative'>
            <div className='w-full'>
                <p className='text-3xl font-bold tracking-wider'>New Transaction</p>
            </div>
            <div className='bg-white flex flex-col p-6 rounded-md gap-6 w-full'>
                <div className='flex gap-3 items-center'>
                    <TollIcon className='text-teal-800 ' />
                    <p className='text-xl font-semibold tracking-wide'>Send tokens</p>
                </div>
                <div className='flex flex-col gap-8'>

                    <TextField name='title' id='title' fullWidth label="Title" variant='outlined' required color='secondary' value={tokenFormData.title} onChange={(e) => handleTokenFormData(e)} />
                    <TextField name='description' id='description' fullWidth label="Description" variant='outlined' value={tokenFormData.description} required color='secondary' onChange={(e) => handleTokenFormData(e)} />
                    <TextField name='tokenContractAddress' id='tokenContractAddress' value={tokenFormData.tokenContractAddress} fullWidth label="Token Contract Address" variant='outlined' color='secondary' required onChange={(e) => handleTokenFormData(e)} />
                    <TextField name='address' id='recipientAddress' value={tokenFormData.address} fullWidth label="Recipient address" variant='outlined' color='secondary' required onChange={(e) => handleTokenFormData(e)} />
                    <TextField name='amount' type='Number' id='Amount' fullWidth label="Amount" value={tokenFormData.amount} variant='outlined' required color='secondary' onChange={(e) => handleTokenFormData(e)} />
                </div>
                <div className='flex justify-end'>
                    <Button radius='sm' className='text-white bg-black text-lg font-semibold'
                        onClick={handleSubmit}
                    >Next</Button>
                    <Button onClick={handleMint}>Mint token</Button>

                </div>
            </div>
            <div className='rounded-full text-xs font-semibold bg-white border-1 absolute py-4 px-2 right-3 -top-4 cursor-pointer' onClick={() => dispatch(setActiveComponent(1))}>
                close
            </div>
        </div>
    )
}

export default SendTokenTxnForm