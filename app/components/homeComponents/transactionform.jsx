import React, { useState } from 'react'
import { InputAdornment, TextField } from '@mui/material'
import { Button } from '@nextui-org/react'
import TollIcon from '@mui/icons-material/Toll';
import { useDispatch, useSelector } from "react-redux"
import { setActiveComponent } from "@/app/redux/feature/activeComponentSlice"
import { useSearchParams } from 'next/navigation';

const Transactionform = () => {
    const dispatch = useDispatch()
    const queryParams = useSearchParams()
    console.log(queryParams)
    const { clientSigner, signer } = useSelector(state => state.connectWalletReducer.user)

    console.log(clientSigner, signer)

    const [proposalData, setProposalData] = useState({
        title: "",
        description: "",
        address: "",
        amount: 0
    })

    const handleProposalData = (events) => {
        const { name, value } = events.target;

        setProposalData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async () => {
        console.log(signer)
        try {
            // http://localhost:3001/home?multi_sig=osmo1sylzutg06euqch5ve2gqx5huvm2ml2wus39sqtgcfyvt3gwlk6cq5tzn29

            const createProposalTxn = await clientSigner.execute(
                signer,
                queryParams.get("multi_sig"),
                {
                    propose: {
                        title: proposalData.title,
                        description: proposalData.description,
                        msgs: [{
                            bank: {
                                send: {
                                    to_address: proposalData.address,
                                    amount: [{ denom: "uosmo", amount: proposalData.amount }]
                                }
                            }
                        }],
                    },
                },
                "auto"
            )



            console.log(createProposalTxn);

        } catch (error) {
            console.log(error)
        }
    }

    console.log(proposalData)

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

                    <TextField name='title' id='title' fullWidth label="Title" variant='outlined' required color='secondary' onChange={(e) => handleProposalData(e)} />
                    <TextField name='description' id='description' fullWidth label="Description" variant='outlined' required color='secondary' onChange={(e) => handleProposalData(e)} />
                    <TextField name='address' id='recipientAddress' fullWidth label="Recipient address" variant='outlined' color='secondary' required InputProps={{
                        startAdornment: <InputAdornment position="start">base-gor:</InputAdornment>,
                    }} onChange={(e) => handleProposalData(e)} />
                    <TextField name='amount' type='Number' id='Amount' fullWidth label="Amount" variant='outlined' required color='secondary' onChange={(e) => handleProposalData(e)} />
                </div>
                <div className='flex justify-end'>
                    <Button radius='sm' className='text-white bg-black text-lg font-semibold' onClick={handleSubmit}>Next</Button>
                </div>
            </div>
            <div className='rounded-full text-xs font-semibold bg-white border-1 absolute py-4 px-2 right-3 -top-4 cursor-pointer' onClick={() => dispatch(setActiveComponent(1))}>
                close
            </div>
        </div>
    )
}

export default Transactionform