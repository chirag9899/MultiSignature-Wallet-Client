import { Avatar, Badge, Button } from '@nextui-org/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Overview = () => {
    const queryParams = useSearchParams()
    const contract = queryParams.get("multi_sig")
    const walletData = (localStorage.key("name") === "/****user_wallet****/") ? (JSON.parse(localStorage.getItem('/****user_wallet****/')).filter((item) => item.walletAddress === `${contract}`)).length > 0 ? (JSON.parse(localStorage.getItem('/****user_wallet****/')).filter((item) => item.walletAddress === `${contract}`)) : ([{ walletName: "User" }]) : ([{ walletName: "User" }])
    
    return (
        <div className='w-3/5 flex flex-col gap-4'>
            {/* text heading  */}
            <div>
                <p className='text-md font-semibold'>Overview</p>
            </div>

            {/* overview content  */}
            <div className='bg-white p-7 rounded-md flex flex-col gap-6'>
                <div>
                    
                        <Avatar name={`${walletData[0].walletName}`} size='lg' isBordered radius='full' />
                    
                </div>

                <div className='flex flex-col gap-1'>
                    <p className='text-sm tracking-wider'>{walletData[0].walletName}</p>
                    <p className='w-full font-bold text-sm text-clip overflow-hidden'>MutiSign Contract Address: <br /><span className='font-normal '>{contract}</span></p>
                </div>
                <div className='flex flex-row items-center justify-between'>
                    <div className='flex flex-col'>
                        <p className='text-sm text-gray-400'>Tokens</p>
                        <p className='text-3xl font-medium'>0</p>
                    </div>
                    <div>
                        <p className='text-sm text-gray-400'>NFTs</p>
                        <p className='text-3xl font-medium'>1</p>
                    </div>

                    <Link href={`/home/assets?multi_sig=${contract}`}>
                        <div>
                            <Button size="md" radius='sm' className='text-white font-semibold bg-black'>View Assets</Button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Overview