"use client"
import Overview from '../components/homeComponents/overview'
import TransactionQueue from '../components/homeComponents/transactionQueue'
import NewTransaction from '../components/homeComponents/newTransaction'
import { useState } from 'react'
import Transactionform from '../components/homeComponents/transactionform'
import { useSelector } from "react-redux"

const Home = () => {
  const { activeComponent } = useSelector((state) => state.activeComponent)
  return (
    <div className='basis-4/5 py-10 px-6 flex flex-row justify-center gap-8'>
      {activeComponent === 1 && (
        <>
          <Overview />
          <TransactionQueue />
        </>
      )
      }
      {activeComponent === 2 && <NewTransaction />}
      {activeComponent === 3 && <Transactionform />}


    </div>
  )
}

export default Home

{/* <Overview/>
            <TransactionQueue/> */}
{/* <NewTransaction/> */ }
{/* <Transactionform/>  */ }