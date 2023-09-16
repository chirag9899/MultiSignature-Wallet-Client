import { setActiveComponent } from '@/app/redux/feature/activeComponentSlice'
import { Avatar, Badge, Button } from '@nextui-org/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'

const Overview = () => {
    const queryParams = useSearchParams()
    const contract = queryParams.get("multi_sig")
    const dispatch = useDispatch()

    const walletData = localStorage.getItem('/****user_wallet****/') ? (JSON.parse(localStorage.getItem('/****user_wallet****/')).filter((item) => item.walletAddress === `${contract}`)).length > 0 ? (JSON.parse(localStorage.getItem('/****user_wallet****/')).filter((item) => item.walletAddress === `${contract}`)) : ([{ walletName: "User", disable: true }]) : ([{ walletName: "User", disable: true }])

    console.log(walletData)

    return (
        <div className='w-3/5 flex flex-col gap-4'>
            {/* text heading  */}
            <div>
                <p className='text-md font-semibold'>Overview</p>
            </div>

            {/* overview content  */}
            <div className='bg-white p-7 rounded-md flex flex-col gap-6'>
                <div>
                    <Avatar name={`${walletData[0]?.walletName}`} size='lg' isBordered radius='full' />
                </div>

                <div className='flex flex-col gap-1'>
                    <p className='text-lg tracking-wider'>{walletData[0]?.walletName}</p>
                    <p className='w-full font-bold text-sm text-clip overflow-hidden'>MutiSign Contract Address: <br /><span className='font-normal '>{contract}</span></p>
                </div>
                {/* <div className='flex flex-row items-center justify-between'>
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

                </div> */}
                {
                    walletData[0]?.disable === true ?
                        <Button disabled onClick={() => dispatch(setActiveComponent(6))} className={`w-[200px] text-gray-500 font-semibold`} size='md' radius='sm'>Update Wallet Members</Button> :
                        <Button onClick={() => dispatch(setActiveComponent(6))} className={`w-[200px] bg-black text-white font-semibold`} size='md' radius='sm'>Update Wallet Members</Button>
                }

            </div>
        </div>
    )
}

export default Overview