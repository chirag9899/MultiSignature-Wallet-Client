import { Badge, Button } from '@nextui-org/react'
import React from 'react'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { KeyboardArrowRightOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';

const TransactionQueue = () => {
    const proposalsData = useSelector(state => state.fetchProposalsReducer?.proposalList);
    const router=useRouter()
    const queryParams=useSearchParams()
    const contract=queryParams.get("multi_sig")
    console.log(proposalsData)
  return (
    <div className='w-2/5 flex flex-col gap-4'>
        {/* text heading  */}
        <div>
            <p className='text-md font-semibold'>Transaction queue</p>
        </div>
        <div className='flex flex-col gap-2'>
            {proposalsData?.map((proposal)=>(

                <div onClick={()=>router.push(`/home/transactions?multi_sig=${contract}`)} key={proposal.id} className=' cursor-pointer flex flex-row items-center justify-between bg-white rounded-md px-3 py-2'>
                    <div className='text-xs font-semibold'>{proposal.id}</div>
                    <div>
                        <p className='text-xs font-semibold'>{proposal.title}</p>
                    </div>
                    <div className='flex flex-row gap-4 items-center'>
                        <Button size='md' radius='sm' className='bg-green-300/80'>
                            <GroupOutlinedIcon/>
                            <p className='text-xs font-medium'>{proposal.threshold.absolute_count.weight}/{proposal.threshold.absolute_count.total_weight}</p>
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