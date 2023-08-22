import Tokens from '@/app/components/assetsComponents/tokens'
import React from 'react'

const Assets = () => {
  return (
    <div className='py-10 px-6 flex flex-col gap-8 w-full'>
      <h1 className='text-3xl tracking-widest font-bold'>Assets</h1>
      <div className='flex flex-row gap-10'>
        <div className='border-b-2 border-black p-2 font-semibold tracking-wider'><p>Tokens</p></div>
        <div className='border-b-2 border-black p-2 font-semibold tracking-wider'><p>NFTs</p></div>
      </div>
      <div>
        <Tokens/>
      </div>


    </div>
  )
}

export default Assets