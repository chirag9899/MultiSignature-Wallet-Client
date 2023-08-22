import { Badge, Button } from '@nextui-org/react'
import React from 'react'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { KeyboardArrowRightOutlined } from '@mui/icons-material';

const TransactionQueue = () => {
  return (
    <div className='basis-1/2 flex flex-col gap-4'>
        {/* text heading  */}
        <div>
            <p className='text-md font-semibold'>Transaction queue</p>
        </div>
        <div className='flex flex-col gap-2'>
            {[1,2,3].map(()=>(

                <div className='flex flex-row items-center justify-between bg-white rounded-md px-3 py-2'>
                    <div>1</div>
                    <div>
                        <p className='text-sm'>Contract interaction</p>
                    </div>
                    <div className='flex flex-row gap-4 items-center'>
                        <Button size='md' radius='sm' className='bg-green-300/80'>
                            <GroupOutlinedIcon/>
                            <p className='text-xs font-medium'>3/3</p>
                        </Button>
                        <KeyboardArrowRightOutlined className='text-gray-300/70'/>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TransactionQueue