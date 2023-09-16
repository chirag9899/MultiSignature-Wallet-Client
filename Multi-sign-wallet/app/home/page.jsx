"use client"
import Overview from '../components/homeComponents/overview'
import TransactionQueue from '../components/homeComponents/transactionQueue'
import NewTransaction from '../components/homeComponents/newTransaction'
import { useEffect, useState } from 'react'
import Transactionform from '../components/homeComponents/transactionform'
import { useDispatch, useSelector } from "react-redux"
import { fetchProposals } from '../redux/feature/fetchProposalsSlice'
import { useSearchParams } from 'next/navigation'
import SendTokenTxnForm from '../components/homeComponents/sendTokenTxnForm'
import SendNftTxnForm from '../components/homeComponents/sendNftTxnForm'
import UpdateMember from '../components/homeComponents/updateMember'
import { connectWallet } from '../redux/feature/connect-wallet-slice'
import { setSelectedChain } from '../redux/feature/selectedChainSlice'

const Home = () => {
  const { activeComponent } = useSelector((state) => state.activeComponent)
  const { clientSigner, signer } = useSelector(state => state?.connectWalletReducer.user)
  const proposalsData = useSelector(state => state?.fetchProposalsReducer?.proposalList);
  const selectedChain = useSelector(state => state.selectedChainReducer)
  const dispatch = useDispatch()
  const queryParams = useSearchParams()
  const contract = queryParams.get('multi_sig')

  useEffect(() => {
    dispatch(fetchProposals({ clientSigner, contract }))
    dispatch(setSelectedChain({ chainName: selectedChain.chainName, chainId: selectedChain.chainId, denom: selectedChain.denom }))
  }, [proposalsData?.length, signer, selectedChain?.chainId])
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
      {activeComponent === 4 && <SendTokenTxnForm />}
      {activeComponent === 5 && <SendNftTxnForm />}
      {activeComponent === 6 && <UpdateMember />}


    </div>
  )
}

export default Home
