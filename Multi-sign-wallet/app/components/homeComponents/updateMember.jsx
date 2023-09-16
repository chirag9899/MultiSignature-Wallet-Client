import React, { useState } from 'react'
import TollIcon from '@mui/icons-material/Toll';
import { InputAdornment, TextField } from '@mui/material';
import { Button } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveComponent } from '@/app/redux/feature/activeComponentSlice';


const UpdateMember = () => {

    const { clientSigner, signer } = useSelector(state => state.connectWalletReducer.user)
    const { groupContract } = useSelector(state => state.groupContractReducer)
    const dispatch = useDispatch()
    const router = useRouter()
    const contract = useSearchParams().get('multi_sig')

    const walletData = localStorage.getItem('/****user_wallet****/') ? (JSON.parse(localStorage.getItem('/****user_wallet****/')).filter((item) => item.walletAddress === `${contract}`)).length > 0 ? (JSON.parse(localStorage.getItem('/****user_wallet****/')).filter((item) => item.walletAddress === `${contract}`)) : ([{ walletName: "User"}]) : ([{ walletName: "User"}])

    console.log(walletData)

    const [updateMemberData, setUpdateMemberData] = useState({
        title: "",
        description: "",
        removeMember: "",
        addMember: "",
        weight: ""
    })

    const handleMemberUpdate = (event) => {
        const { name, value } = event.target
        setUpdateMemberData((prev) => (
            {
                ...prev,
                [name]: value,
            }
        ))
    }


    const handleSubmit = async () => {

        console.log(groupContract , walletData[0].groupContract)

        const updateMemberTxn = await clientSigner.execute(
            signer,
            contract,
            {
                propose: {
                    title: updateMemberData.title,
                    description: updateMemberData.description,
                    msgs: [{
                        wasm: {
                            execute: {
                                contract_addr: groupContract || walletData[0].groupContract,
                                msg: btoa(JSON.stringify({
                                    update_members: {
                                        remove: [updateMemberData.removeMember],
                                        add: [{
                                            addr: updateMemberData.addMember,
                                            weight: 55,
                                        }]
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
    }

    console.log(updateMemberData)
    return (
        <div className='flex flex-col my-10 mx-36 gap-4 w-full relative'>
            <div className='w-full'>
                <p className='text-3xl font-bold tracking-wider'>Update your wallet Member</p>
            </div>
            <div className='bg-white flex flex-col p-6 rounded-md gap-6 w-full'>
                <div className='flex gap-3 items-center'>
                    <TollIcon className='text-teal-800 ' />
                    <p className='text-xl font-semibold tracking-wide'>Update Member</p>
                </div>
                <div className='flex flex-col gap-8'>

                    <TextField name='title' id='title' fullWidth label="Title" variant='outlined' required color='secondary' value={updateMemberData.title} onChange={(e) => handleMemberUpdate(e)} />
                    <TextField name='description' id='description' fullWidth label="Description" variant='outlined' value={updateMemberData.description} required color='secondary' onChange={(e) => handleMemberUpdate(e)} />

                    <TextField name='removeMember' onChange={(e) => handleMemberUpdate(e)} value={updateMemberData.removeMember} id='removeAddress' fullWidth label="Remove Member" variant='outlined' color='secondary' />
                    <TextField name='addMember' onChange={(e) => handleMemberUpdate(e)} value={updateMemberData.addMember} id='addAddress' fullWidth label="Add Member" variant='outlined' color='secondary' required />
                    <TextField name='weight' type='Number' id='weight' fullWidth label="New Member Weight" value={updateMemberData.weight} variant='outlined' required color='secondary' onChange={(e) => handleMemberUpdate(e)} />
                </div>
                <div className='flex justify-end'>
                    <Button radius='sm' className='text-white bg-black text-lg font-semibold' onClick={
                        handleSubmit
                    }
                    >update</Button>
                </div>
            </div>
            <div className='rounded-full text-xs font-semibold bg-white border-1 absolute py-4 px-2 right-3 -top-4 cursor-pointer' onClick={() => dispatch(setActiveComponent(1))}>
                close
            </div>
        </div>
    )
}

export default UpdateMember