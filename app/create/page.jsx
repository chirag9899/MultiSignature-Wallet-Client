"use client"
import React, { useState } from 'react'
import CreateBoxStepper from './CreateBoxStepper'

const page = () => {
    return (
        <div className='border border-black min-h-[90vh] flex justify-center items-center flex-col p-5 bg-[#f4f4f4]'>
            <h1 className='text-[25px] font-semibold text-center mb-5'>Create new Safe Account</h1>
            <CreateBoxStepper />
        </div>
    )
}

export default page