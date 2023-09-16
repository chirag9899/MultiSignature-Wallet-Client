'use client'
import React from "react"
import AddIcon from '@mui/icons-material/Add';
import SidebarAccounts from '@/app/components/welcomepage/SidebarAccounts'
import Link from "next/link";



const Home = () => {
    return (
        <div className=" flex p-6 bg-[#f4f4f4] gap-6">
            <div className="basis-1/3 bg-white rounded-lg">
            <SidebarAccounts/>
            </div>
            <div className="basis-2/3 bg-hero bg-no-repeat bg-cover bg-center rounded-lg shadow-lg">
                <h1 className="text-4xl text-zinc-900 font-semibold text-center mt-2 mb-0">WELCOME TO MULTISIGN</h1>
                <div className="flex justify-center gap-4 m-2 p-6">
                    <div className="bg-white w-120vh p-2 flex flex-col gap-4 rounded-lg">
                        <img src="https://images.ctfassets.net/0idwgenf7ije/3RHqqPh6R4HvOMQ0ZvZ9Iy/e2a2ed57d32cdc7a99de39d7fd1029a2/What_is_a_multi_sig_wallet?fm=webp&w=1024&q=100" className="w-1/2 self-center" />
                        <AddIcon className="text-6xl text-indigo-300 font-bold text-center" />
                        <h2 className="text-xl font-semibold text-center">Create Vaulto Account</h2>
                        <p className="text-xs text-gray-700 text-center">A new Account that is controlled by one or multiple owners.</p>
                        <Link className="border-2 border-zinc-300 rounded-lg p-2 hover:bg-zinc-200 text-center hover:transition ease-in duration-700" href="/create">Create button</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home