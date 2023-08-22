import { InputAdornment, TextField } from '@mui/material'
import { Button } from '@nextui-org/react'
import React from 'react'
import TollIcon from '@mui/icons-material/Toll';
import {useDispatch} from "react-redux"
import {setActiveComponent} from "@/app/redux/feature/activeComponentSlice"


const Transactionform = () => {
    const dispatch =useDispatch()
  return (
    <div className='flex flex-col my-10 mx-36 gap-4 w-full relative'>
        <div className='w-full'>
            <p className='text-3xl font-bold tracking-wider'>New Transaction</p>
        </div>
        <div className='bg-white flex flex-col p-6 rounded-md gap-6 w-full'>
            <div className='flex gap-3 items-center'>
                <TollIcon className='text-teal-800 '/>
                <p className='text-xl font-semibold tracking-wide'>Send tokens</p>
            </div>
            <div className='flex flex-col gap-8'>
                <TextField id='recipientAddress' fullWidth label="Recipient address" variant='outlined' color='secondary' required InputProps={{
            startAdornment: <InputAdornment position="start">base-gor:</InputAdornment>,
          }}/>
                <TextField id='Amount' fullWidth label="Amount" variant='outlined' required color='secondary'/>
            </div>
            <div className='flex justify-end'>
                <Button radius='sm' className='text-white bg-black text-lg font-semibold '>Next</Button>
            </div>
        </div>
        <div className='rounded-full text-xs font-semibold bg-white border-1 absolute py-4 px-2 right-3 -top-4 cursor-pointer ' onClick={()=>dispatch(setActiveComponent(1))}>
            close
        </div>
    </div>
  )
}

export default Transactionform