"use client"
import React, { useEffect, useState } from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TollIcon from '@mui/icons-material/Toll';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { Avatar, Badge, Button } from '@nextui-org/react'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import { setActiveComponent } from '@/app/redux/feature/activeComponentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { fetchProposals } from '@/app/redux/feature/fetchProposalsSlice'
import { connectWallet } from '@/app/redux/feature/connect-wallet-slice';



const Sidebar = () => {
    const pathName = usePathname()
    const [activePage, setActivePage] = useState(pathName)
    const dispatch = useDispatch()
    const queryParams = useSearchParams()
    const { clientSigner, signer } = useSelector(state => state.connectWalletReducer.user)
    const proposalsData = useSelector(state => state.fetchProposalsReducer?.proposalList);
    const contract = queryParams.get("multi_sig");
    const router = useRouter()

    const walletData = localStorage.getItem('/****user_wallet****/') ? (JSON.parse(localStorage.getItem('/****user_wallet****/')).filter((item) => item.walletAddress === `${contract}`)).length > 0 ? (JSON.parse(localStorage.getItem('/****user_wallet****/')).filter((item) => item.walletAddress === `${contract}`)) : ([{ walletName: "User" }]) : ([{ walletName: "User" }])

    const selectedChain = useSelector(state => state.selectedChainReducer)

    useEffect(() => {
        dispatch(connectWallet(selectedChain?.chainId))
    }, [selectedChain?.chainId])

    

    return (
        <div className='basis-1/5 min-h-screen bg-white border-r-2 border-gray-300'>
            {/* upper-div  */}
            <div className='flex flex-col p-3  border-b-1 border-gray-300 gap-3'>
                <div className='flex flex-row gap-4 items-center'>
                    {/* Avatar Section  */}
                    <div>

                        <Avatar name={`${walletData[0]?.walletName}`} size='lg' isBordered radius='full' />

                    </div>
                    {/* Avatar Data  */}
                    <div className='flex flex-col justify-start gap-1'>
                        <p className='text-sm tracking-wider font-bold'>{walletData[0]?.walletName}</p>
                        <div className='w-[200px]'>
                            <p className='text-xs font-semibold text-clip overflow-hidden'>{queryParams.get("multi_sig")}</p>
                        </div>
                    </div>

                </div>
                <div></div>

                {/* transaction button  */}
                <div className='w-full'>
                    <Button size="md" radius='sm' className='w-full bg-black text-white font-semibold' onClick={() => {
                        router.push(`/home?multi_sig=${contract}`)
                        dispatch(setActiveComponent(2))
                    }}>New Transaction</Button>
                </div>
            </div>

            {/* lower div  */}
            <div className='flex flex-col gap-2 p-3 '>
                <Link href={`/home?multi_sig=${contract}`}>
                    <div onClick={() => {
                        setActivePage(`/home?multi_sig=${contract}`)
                        dispatch(fetchProposals({ clientSigner, contract }))
                    }} className={`flex items-center gap-4 ${activePage === `/home?multi_sig=${contract}` && "bg-gray-100/80"}  hover:bg-green-200/50 rounded-lg p-3`}>
                        <HomeOutlinedIcon />
                        <p className='font-semibold tracking-wider text-sm'>Home</p>
                    </div>
                </Link>
                <Link href={`/home/transactions?multi_sig=${contract}`}>
                    <div onClick={async () => {
                        setActivePage(`/home/transactions?multi_sig=${contract}`);
                        dispatch(fetchProposals({ clientSigner, contract }))
                    }} className={`flex items-center gap-4 ${activePage === `/home/transactions?multi_sig=${contract}` && "bg-gray-100/80"}  hover:bg-green-200/50 rounded-lg p-3`}>
                        <ImportExportIcon />
                        <p className='font-semibold tracking-wider text-sm'>Transactions</p>
                    </div>
                </Link>
                {/* <Link href={`/home/assets?multi_sig=${contract}`}>
                    <div onClick={() => setActivePage(`/home/assets?multi_sig=${contract}`)} className={`flex items-center gap-4 ${activePage === `/home/assets?multi_sig=${contract}` && "bg-gray-100/80"}  hover:bg-green-200/50 rounded-lg p-3`}>
                        <TollIcon />
                        <p className='font-semibold tracking-wider text-sm'>Assets</p>
                    </div>
                </Link> */}
            </div>
        </div>
    )
}

export default Sidebar