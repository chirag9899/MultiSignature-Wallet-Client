"use client"
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Badge } from "@nextui-org/react";

const Account = ({ name, address }) => {

  const accountAddr = address.slice(0, 6) + "...." + address.slice((address.length - 6), address.length);
  return (
    <div className="flex w-80vw border rounded-md gap-10 items-center px-10 py-2 pt-3 mx-4 shadow-md hover:bg-green-200 ">
      <Badge content="0/3" className='bg-green-200 ' variant="solid" placement="top-right">
        <AccountCircleIcon className='text-5xl text-gray-400 ' />
      </Badge>
      <div className="">
        <h2 className='text-base font-normal text-black'>{name}</h2>
        <p className='text-xs font-semilight text-gray-600'>{accountAddr}</p>
      </div>
    </div>
  )
}

export default Account