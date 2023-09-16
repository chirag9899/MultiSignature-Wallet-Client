import React from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { connectWallet, disconnect } from "@/app/redux/feature/connect-wallet-slice";
import { useDispatch, useSelector } from 'react-redux';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Link from 'next/link';

const Connectwallet = ({selectedChain}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.connectWalletReducer);
  
  const handlecopy=async()=>{
    try {
         await navigator.clipboard.writeText(userData.user.signer);
         console.log('Content copied to clipboard');
       } catch (err) {
         console.error('Wallet not connected: ', err);
       }
   }
  

  return (
    <div className="bg-white w-[40vh] flex flex-col items-center p-2 gap-4 border rounded-lg ">
      <div className="px-6 py-4 border-b rounded-t">
        {userData.user.signer ? (
          <h3 className="text-base font-semibold text-gray-900 flex gap-2">
            Disconnect wallet
            <ContentCopyIcon onClick={handlecopy} className='text-xs text-zinc-400'/>
          </h3>
        ) : (
          <h3 className="text-base font-semibold text-gray-900 flex gap-2">
            Connect wallet
          </h3>
        )}
      </div>

      <div className="p-6">
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Connect with one of our available wallet providers or create a new one.</p>
        <ul className="my-4 space-y-3">
          <li>
            <div onClick={() => { 
              if (userData.user.signer) {
                dispatch(disconnect());
              } else {
                dispatch(connectWallet(selectedChain.chainId));
              }
            }} className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow border">
              <img src="https://assets-global.website-files.com/636e894daa9e99940a604aef/63bb99fc3d3d7a0f906e49ed_Keplr-logo.png" className='w-20' />
              <span className={`inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 ${userData.user.signer ? 'bg-red-200' : 'bg-green-200'} rounded`}>
                {userData.user.signer ? 'Disconnect' : 'Connect'}
              </span>
            </div>
          </li>
        </ul>
        <div>
          <Link href="https://www.keplr.app/download" className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline">
            <HelpOutlineIcon className='w-3 h-3 mr-2' />
            How to install Wallet?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Connectwallet;
