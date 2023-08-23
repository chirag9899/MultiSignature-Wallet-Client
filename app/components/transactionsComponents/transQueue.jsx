"use client";

import { KeyboardArrowRightOutlined } from "@mui/icons-material";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useState } from "react";
import { useSelector } from "react-redux";

const User=({proposal})=>{
    return (
        <div className="text-black flex flex-row w-full items-center gap-8">
            <div className="flex flex-row justify-between w-full">
                <p className="text-xs font-semibold ">Id: {proposal?.id}</p>
                <p className="text-xs font-semibold ">Title: {proposal.title}</p>
                <p className="text-xs font-semibold ">Threshold: {proposal.threshold.absolute_count.weight}/{proposal.threshold.absolute_count.total_weight}</p>
                <p className="text-xs font-semibold ">Status: <span className={proposal.status==="passed"?"text-green-600":"text-red-600"}>{proposal.status}</span></p>
                
            </div>
            <KeyboardArrowRightOutlined className='text-gray-300/70'/>
        </div>
    )
}

const TransQueue = () => {
    const [open,setOpen]=useState(false)
    const [divId,setDivId]=useState(0)
    const proposalsData = useSelector(state => state.fetchProposalsReducer?.proposalList);
    const handleOpen=(id)=>{
        setOpen((prev)=>prev===false?true:false)
        setDivId(id)
    }
  return (
    <div className="w-full flex flex-col gap-3 p-1">
        {
            proposalsData.map((proposal)=>(
                <div className="w-full bg-white flex flex-col border-1 border-gray-300/40 cursor-pointer rounded-2xl shadow-md p-4" onClick={()=>handleOpen(proposal.id)} >
                    <User proposal={proposal}/>
                    {(open===true && divId===proposal.id) && (
                        <div className="flex flex-row mt-2">
                            <div className="basis-4/6 flex flex-col gap-2">
            
                                <p className="text-xs font-bold">Proposer: <span className="text-xs text-cyan-700 font-medium">{proposal.proposer}</span></p>
                                <p className="text-xs font-bold">Interact with: <span className="text-xs text-amber-700 font-medium">{proposal.proposer}</span></p>

                            </div>
                            <div className="basis-2/6">hello2</div>

                        </div>
                    )}

                </div>
            ))
        }

    </div>
    // <div>
    //     <Accordion variant="splitted" selectionMode="multiple">
    //         {proposalsData.map((proposal,i)=>(
    //             <AccordionItem key={i} aria-label={`name${i}`} startContent={
    //                 <User proposal={proposal}/>
    //             }>
    //                 <div>
                        
    //                 </div>

    //             </AccordionItem>
    //         ))}
    //     </Accordion>
    // </div>
  )
}

export default TransQueue  