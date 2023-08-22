'use client'
import React, { useState, useRef, useEffect, useMemo } from 'react'
import {Button} from '@nextui-org/react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Connectwallet from '../components/welcomepage/Connectwallet';

const Header = () => {
    const [showbar, setShowbar] = useState(false);
    const connectWalletRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const chains = ['Osmosis',"arch","acscas"];
    const [selectedChain, setSelectedChain] = useState('');

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
            <h1 className='text-2xl text-gray-700 font-bold'>MultiSig</h1>
            <div className="flex items-center gap-8">

                <div className="flex align-center"
                    ref={connectWalletRef}
                    onClick={() => setShowbar(true)}>
                    <div className="group relative inline-flex items-center justify-start inline-block px-4 py-2 overflow-hidden font-medium transition-all bg-black rounded-lg hover:bg-white cursor-pointer">
                        <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-black cursor-pointer">Connect Wallet  <ExpandMoreIcon className='w-5' /></span>
                    </div>
                    {/*  <Button size="md" radius='sm' className='text-white font-semibold bg-black'>Connect Wallet  <ExpandMoreIcon className='w-5' /></Button> */}

                    {showbar &&
                        <div className="absolute top-full right-10 mt-2 z-50 backdrop-blur-none ">
                            <Connectwallet />
                        </div>

                    }
                </div>

                <div className="relative"  ref={connectWalletRef}>
                    <button
                        className="border-b border-zinc-400 px-4 outline-none p-1"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        Chain  <ExpandMoreIcon className='w-5' />
                    </button>
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