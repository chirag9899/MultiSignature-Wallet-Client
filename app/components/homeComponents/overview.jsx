import { Avatar, Badge, Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

const Overview = () => {
  return (
    <div className='basis-1/2 flex flex-col gap-4'>
        {/* text heading  */}
        <div>
            <p className='text-md font-semibold'>Overview</p>
        </div>

        {/* overview content  */}
        <div className='bg-white p-7 rounded-md flex flex-col gap-6'>
            <div>
                <Badge size='md' color='danger' content="3/3" shape='circle' className='text-black'>
                    <Avatar name='darab' size='lg' isBordered radius='full'/>             
                </Badge>
            </div>

            <div className='flex flex-col gap-1'>
                <p className='text-sm'>test1</p>
                <p className='font-bold text-sm'>base-gor:<span className='font-normal'>0xkaggayu324k</span></p>
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
                
                <Link href={"/home/assets"}>
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