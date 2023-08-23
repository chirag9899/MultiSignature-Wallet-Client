"use client"
import React, { useState } from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TollIcon from '@mui/icons-material/Toll';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { Avatar, Badge, Button } from '@nextui-org/react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { setActiveComponent } from '@/app/redux/feature/activeComponentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { fetchProposals } from '@/app/redux/feature/fetchProposalsSlice'


const Sidebar = () => {
    const pathName = usePathname()
    const [activePage, setActivePage] = useState(pathName)
    const dispatch = useDispatch()
    const queryParams = useSearchParams()
    console.log("i m in side bar")

    const { clientSigner, signer } = useSelector(state => state.connectWalletReducer.user)
    const proposalsData = useSelector(state => state.fetchProposalsReducer?.proposalList);

    const contract = queryParams.get("multi_sig");

    console.log(proposalsData)

    console.log(contract);

    return (
        <div className='basis-1/5 min-h-screen bg-white border-r-2 border-gray-300'>
            {/* upper-div  */}
            <div className='flex flex-col p-3  border-b-1 border-gray-300 gap-3'>
                <div className='flex flex-row gap-4 items-center'>
                    {/* Avatar Section  */}
                    <div>
                        <Badge size='md' color='danger' content="3/3" shape='circle' className='text-black'>
                            <Avatar name='darab' size='lg' isBordered radius='full' />

                        </Badge>
                    </div>
                    {/* Avatar Data  */}
                    <div className='flex flex-col justify-start'>
                        <p className='text-xs'>Wallet Name</p>

                        <p className='text-xs font-semibold'>base-osmo:<span className='font-normal'>{queryParams.get("multi_sig")?.slice(0, 6).concat("...")}</span></p>
                        <p className='text-xs font-semibold'>0.00 USD</p>
                    </div>

                </div>
                <div></div>

                {/* transaction button  */}
                <div className='w-full'>
                    <Button size="md" radius='sm' className='w-full bg-black text-white font-semibold' onClick={() => dispatch(setActiveComponent(2))}>New Transaction</Button>
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
                        dispatch(fetchProposals({clientSigner, contract}))
                    }} className={`flex items-center gap-4 ${activePage === `/home/transactions?multi_sig=${contract}` && "bg-gray-100/80"}  hover:bg-green-200/50 rounded-lg p-3`}>
                        <ImportExportIcon />
                        <p className='font-semibold tracking-wider text-sm'>Transactions</p>
                    </div>
                </Link>
                <Link href={"/home/assets"}>
                    <div onClick={() => setActivePage("/home/assets")} className={`flex items-center gap-4 ${activePage === "/home/assets" && "bg-gray-100/80"}  hover:bg-green-200/50 rounded-lg p-3`}>
                        <TollIcon />
                        <p className='font-semibold tracking-wider text-sm'>Assets</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar