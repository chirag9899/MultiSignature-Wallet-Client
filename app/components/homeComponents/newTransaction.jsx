import React from 'react'
import ImportExportIcon from '@mui/icons-material/ImportExport';
import TollIcon from '@mui/icons-material/Toll';
import { Button } from '@nextui-org/react';
import {useDispatch} from "react-redux"
import {setActiveComponent} from "@/app/redux/feature/activeComponentSlice"

const NewTransaction = () => {
  const dispatch = useDispatch()
  return (
    <div className=' m-8 p-12 flex flex-row gap-8 bg-white rounded-md w-full items-center justify-center'>
        <div className='flex flex-col w-1/2 items-center justify-center  h-full bg-gray-200/60 rounded-md'>
            <ImportExportIcon className='text-8xl text-teal-800'/>
            <p className='text-2xl font-semibold tracking-wider p-4 text-center'>New Transaction</p>
        </div>
        <div className='flex flex-col w-1/2 items-center py-4 px-8 gap-4 h-full justify-center bg-gray-200/60 rounded-md'>
            <div className='flex flex-col  justify-center items-center   '>
                <TollIcon className='text-8xl text-teal-800 '/>
                <p className='text-lg font-semibold tracking-wider'>Assets</p>
            </div>
            <Button size='lg' radius='sm'  className='bg-black text-white' onClick={()=>dispatch(setActiveComponent(3))}>Send tokens</Button>
        </div>

    </div>
  )
}

export default NewTransaction