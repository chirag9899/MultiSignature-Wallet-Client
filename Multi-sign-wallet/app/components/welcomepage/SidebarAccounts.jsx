'use client'
import React, { useEffect, useState } from 'react'
import Account from '@/app/components/welcomepage/Account'
import { Button } from '@nextui-org/react'
import { connectWallet, disconnect } from "@/app/redux/feature/connect-wallet-slice"
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link'
import 'tailwind-scrollbar';



const SidebarAccounts = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.connectWalletReducer);
    const [isConnecting, setIsConnecting] = useState(false);
    const [wallets, setWallets] = useState([]);
    const deployerContract = process.env.NEXT_PUBLIC_DEPLOYER_CONTRACT;
    const selectedChain = useSelector(state => state.selectedChainReducer)

    const handleConnectWallet = () => {
        setIsConnecting(true);
        dispatch(connectWallet(selectedChain.chainId))
            .then(() => {
                setIsConnecting(false);
            })
            .catch(error => {
                console.error("Error connecting wallet:", error);
                setIsConnecting(false);
            });
    };



    useEffect(() => {
        // Dispatch an action to check user's wallet connection status
        dispatch(connectWallet(selectedChain?.chainId))
            .catch(error => {
                console.error("Error checking wallet connection:", error);
            });
    }, [selectedChain?.chainId]);

    useEffect(() => {
        if (userData?.user?.clientSigner != "") {
            handleWallets(userData?.user?.clientSigner)
        }
    }, [userData?.user?.clientSigner])

    const handleWallets = async (clientSigner) => {
        try {
            const queryWallets = await clientSigner?.queryContractSmart(
                deployerContract,
                {
                    get_list_of_wallet: {
                        user_address: userData?.user?.signer
                    }
                }
            )
            setWallets(queryWallets?.Ok?.wallets);
            console.log(queryWallets);
        } catch (error) {
            console.log(error)
        }
    }

    if (!userData.user.signer) {
        return (
            <div className='shadow-lg'>
                <h2 className="text-xl font-semibold m-2 border-b border-zinc-200 p-4">My Accounts</h2>
                <div className='px-16 py-20 space-y-6'>
                    <img src="https://assets-global.website-files.com/636e894daa9e99940a604aef/63bb99fc3d3d7a0f906e49ed_Keplr-logo.png" className=' mx-auto block w-32 ' />
                    <p className='text-sm font-normal text-gray-600 '>Connect a wallet to view your Safe&nbsp;Accounts or to create a new one</p>
                    <div className="flex justify-center ">

                        <Button
                            size="md"
                            radius="sm"
                            className="text-white font-semibold bg-black"
                            onClick={handleConnectWallet}
                            disabled={isConnecting} // Disable the button during processing
                        >
                            {isConnecting ? (
                                <div className="flex items-center">

                                    <svg aria-hidden="true" className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span>Connecting...</span>

                                </div>
                            ) : (
                                'Connect Wallet'
                            )}
                        </Button>


                    </div>


                </div>
            </div>
        );
    }
    else {
        return (
            <div  >
                <h2 className="text-xl text-center font-semibold m-2">My Accounts</h2>
                <hr />
                <div className="bg-black text-white m-4 text-center p-2 rounded-md">{selectedChain?.chainName}</div>

                <div className="flex flex-col gap-1 w-full  h-[70vh] max-h-[80vh] overflow-auto scrollbar-thin scrollbar-rounded-* scrollbar-thumb-zinc-300">
                    {wallets?.map((item) => {

                        const localWallets = localStorage.getItem("/****user_wallet****/") ? JSON.parse(localStorage.getItem("/****user_wallet****/")).find(wallet => wallet.walletAddress === item) : null

                        return (
                            <Link key={item} href={`/home?multi_sig=${item}`}>
                                <Account name={localWallets?.walletName || "user"} address={item} />
                            </Link>
                        )
                    })
                    }
                </div>
            </div>
        )

    }



}

export default SidebarAccounts