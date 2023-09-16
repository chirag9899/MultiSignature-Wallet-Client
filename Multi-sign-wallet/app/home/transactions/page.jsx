"use client";
import TransQueue from "@/app/components/transactionsComponents/transQueue"


const Transactions = () => {

  return (
    <div className='py-10 px-6 flex flex-col gap-8 w-full'>
      <h1 className='text-3xl tracking-widest font-bold'>Transactions</h1>
      <div className='flex flex-row gap-10'>
        <div className='border-b-2 border-black p-2 font-semibold tracking-wider'><p>Queue</p></div>
      </div>
      <div>
        <TransQueue/>
      </div>


    </div>
  )
}

export default Transactions