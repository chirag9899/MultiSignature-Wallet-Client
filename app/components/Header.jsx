'use client'
import React, { useState, useRef, useEffect, useMemo } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Connectwallet from '../components/welcomepage/Connectwallet';
import Link from 'next/link';
import Image from 'next/image';
import { connectWallet, disconnect } from "@/app/redux/feature/connect-wallet-slice"
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@nextui-org/react';

const Header = () => {
    const dispatch = useDispatch();
    const [showbar, setShowbar] = useState(false);
    const connectWalletRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const chains = ['Osmosis'];
    const [selectedChain, setSelectedChain] = useState('');
    const userData = useSelector(state => state.connectWalletReducer);

    const handleDocumentClick = (event) => {
        if (connectWalletRef.current && !connectWalletRef.current.contains(event.target)) {
            setShowbar(false);
            setIsOpen(false);

        }
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [showbar]);
    return (<>

        {
            showbar &&
            <div className="fixed top-0 left-0 w-full h-full backdrop-filter backdrop-blur-sm bg-black bg-opacity-50 z-40"></div>
        }
        <nav className='flex justify-row justify-between m-4 relative '>
            <Link className='text-2xl text-gray-700 font-bold flex items-center gap-1' href="/">
                <Image src="/logo.png" width={34} height={34} alt='logo' className='object-contain'/>
                <p className='font-light font-mono text-base text-zinc-600'>Multisig</p>
            </Link>
            <div className="flex items-center gap-8">



                {!userData.user.signer ? (
                    <div className="flex align-center" ref={connectWalletRef} >
                        <Button size="md" radius='sm' className='text-white font-semibold bg-black'
                            onClick={() => setShowbar(true)}>
                            Connect Wallet <ExpandMoreIcon className='w-5' />
                        </Button>
                    </div>
                ) : (
                    <div className="flex align-center" ref={connectWalletRef} >
                        <Button size="md" radius='sm' color="primary" variant="faded" className=' text-black font-semibold  flex flex-col border border-slate-200 ' onClick={() => setShowbar(true)}>
                            <p className='mb-0 font-san text-zinc-700'>Connected</p>
                            <p className='-mt-3 font-light text-zinc-500'>{userData.user.signer.slice(0, 6) + "...." + userData.user.signer.slice((userData.user.signer.length - 6), userData.user.signer.length)}</p>
                        </Button>
                    </div>
                )}

                {showbar && (
                    <div className="absolute top-full right-10 mt-2 z-50 backdrop-blur-none ">
                        <Connectwallet />
                    </div>
                )}



                <div className="relative" ref={connectWalletRef}>

                    <Button size="sm" radius='sm' color="primary" variant="faded" className=' text-zinc-600 font-semibold  flex border border-slate-200 ' onClick={() => setIsOpen(!isOpen)}>
                        Chain <ExpandMoreIcon className='w-5' />
                    </Button>
                    <div className="absolute top-full right-1 z-10 bg-white border border-gray-300 mt-4 px-2 w-[100px]"
                        style={{ display: isOpen ? 'block' : 'none' }}>
                        {chains.map((chain) => (
                            <button
                                key={chain}
                                className="block px-2 py-2 hover:bg-gray-100 w-full text-left"
                                onClick={() => {
                                    setIsOpen(false);
                                    setSelectedChain(chain);
                                }}
                            >
                                {chain}
                            </button>
                        ))}
                    </div>
                </div>

            </div>


        </nav>


    </>
    )
}

export default Header