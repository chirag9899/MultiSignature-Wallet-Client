import React from 'react'
import Account from '@/app/components/welcomepage/Account'

const SidebarAccounts = () => {
   
        if (false) {
            return (
                <>
                    <h2 className="text-xl font-semibold m-2 border-b border-zinc-200 p-4">My Accounts</h2>
                <div className='px-16 py-20 space-y-6'>
                    <img src="https://assets-global.website-files.com/636e894daa9e99940a604aef/63bb99fc3d3d7a0f906e49ed_Keplr-logo.png" className=' mx-auto block w-32 ' />
                    <p className='text-sm font-normal text-gray-600 '>Connect a wallet to view your Safe&nbsp;Accounts or to create a new one</p>
                    <div className="flex justify-center ">

                    <button className="group relative inline-flex items-center justify-start inline-block px-4 py-2 overflow-hidden font-medium transition-all bg-blue-600 rounded-lg hover:bg-white cursor-pointer">
                        <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600 cursor-pointer">Connect Wallet</span>
                    </button>
                    </div>
                    
                </div>
                </>
            );
        }
        else{
            return(
                <div  >
            <h2 className="text-xl text-center font-semibold m-2">My Accounts</h2>
            <hr />
            <div className="bg-blue-600 text-white m-4 text-center p-2 rounded-md">Archway</div>
            <div className="flex flex-col gap-1 w-full overflow-y-auto h-[70vh] max-h-[80vh]  ">
                {["", "", "", "", "", "", "", "", "", "", ""].map(() => (
                    <Account name="sam" address="0xgavsdgavsgdvasgdv" />
                ))}
            </div>
        </div>

            )
            
        }
        

    
}

export default SidebarAccounts