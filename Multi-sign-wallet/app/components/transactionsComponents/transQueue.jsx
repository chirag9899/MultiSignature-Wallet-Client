"use client";

import { fetchProposals } from "@/app/redux/feature/fetchProposalsSlice";
import { KeyboardArrowRightOutlined } from "@mui/icons-material";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpirationCounter from "./expirationCounter";

const User = ({ proposal }) => {
    return (
        <div className="text-black flex flex-row w-full items-center gap-8">
            <div className="flex flex-row justify-between w-full">
                <p className="text-xs font-semibold ">Id: {proposal?.id}</p>
                <p className="text-xs font-semibold ">Title: {proposal.title}</p>
                <p className="text-xs font-semibold ">Threshold: {proposal.threshold.absolute_count.weight}/{proposal.threshold.absolute_count.total_weight}</p>
                <p className="text-xs font-semibold ">Status: <span className={proposal.status === "passed" ? "text-green-600" : "text-red-600"}>{proposal.status}</span></p>

            </div>
            <KeyboardArrowRightOutlined className='text-gray-300/70' />
        </div>
    )
}

const TransQueue = () => {
    const [open, setOpen] = useState(false)
    const [divId, setDivId] = useState(" <---Click Button to get Current Vote Count")
    const [voteCount, setVoteCount] = useState(0)
    const proposalsData = useSelector(state => state?.fetchProposalsReducer?.proposalList);
    const { clientSigner, signer } = useSelector(state => state?.connectWalletReducer.user)
    const [isProposalStatusChanged, setIsProposalStatusChanged] = useState("")
    const queryParams = useSearchParams()
    const contract = queryParams.get('multi_sig')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProposals({ clientSigner, contract }))
       

    }, [proposalsData?.length, signer, isProposalStatusChanged])

    console.log(proposalsData)
    const handleOpen = (id) => {
        setOpen((prev) => prev === false ? true : false)
        setDivId(id)
        setVoteCount(" <--- Click Button to get Current Vote Count")
    }

    const handleVote = async (id, voteDecision) => {
        try {
            const voteTxn = await clientSigner.execute(
                signer,
                queryParams.get("multi_sig"),
                {
                    vote: {
                        proposal_id: id,
                        vote: voteDecision
                    }
                },
                "auto"
            )

            setIsProposalStatusChanged(voteTxn)

        } catch (error) {
            console.log(error)
        }
    }

    const handleExecuteProposal = async (id) => {
        try {
            const executeProposalTxn = await clientSigner.execute(
                signer,
                queryParams.get("multi_sig"),
                {
                    execute: {
                        proposal_id: id,
                    },
                },
                "auto"
            )
            setIsProposalStatusChanged(executeProposalTxn)
        } catch (error) {
            console.log(error)
        }
    }

    const queryVotes = async (id) => {
        try {
            const queryVotetxn = await clientSigner.queryContractSmart(
                contract,
                {
                    list_votes: {
                        proposal_id: id,
                        start_after: undefined,
                        limit: 100
                    }
                }
            )

            const totalVotes = queryVotetxn?.votes?.reduce((sum, curr) => {
                if (curr.weight) {
                    return sum + Number(curr.weight);
                }
                return sum;
            }, 0);

            setVoteCount(totalVotes)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="w-full flex flex-col gap-3 p-1">
            {
                proposalsData?.map((proposal) => (
                    <div key={proposal.id} className=" w-full bg-white flex flex-col border-1 border-gray-300/40 cursor-pointer rounded-2xl shadow-md p-4" onClick={() => handleOpen(proposal.id)} >
                        <User proposal={proposal} />
                        {(open === true && divId === proposal.id) && (
                            <div className="flex flex-row mt-2">
                                <div className="basis-5/6 flex flex-col gap-2">

                                    <p className="text-xs font-bold">Proposer: <span className="text-xs text-cyan-700 font-medium">{proposal.proposer}</span></p>
                                    <p className="text-xs font-bold">Interact with: <span className="text-xs text-amber-700 font-medium">{proposal.msgs.length===0?(`Text Proposal Message : ${proposal.description}`):(Object.keys(proposal.msgs[0]).includes("wasm")?proposal.msgs[0].wasm.execute.contract_addr :proposal.msgs[0].bank.send.to_address)}</span></p>
                                    <div className=" basis-1/2 flex flex-row gap-4 items-center">
                                        <Button size="sm" radius="md" className="bg-teal-600 text-white font-semibold" onClick={() => queryVotes(proposal.id)}>Get Vote Count</Button>
                                        <p className="font-semibold text-xs text-teal-600">{voteCount}</p>
                                    </div>
                                    <p className="text-sm font-semibold">{<ExpirationCounter proposal={proposal}/>} </p>

                                </div>
                                <div className="basis-1/6 p-4" >
                                    <div className="flex flex-col gap-3">
                                        {proposal.status === "open" ? (
                                            <Button onClick={() => handleVote(proposal.id, "yes")} className="bg-blue-600 text-white font-semibold tracking-wide" size="md" radius="md">Confirm</Button>
                                        ) : (
                                            <Button className="text-white font-semibold tracking-wide" disabled size="md" radius="md">Confirm</Button>
                                        )}
                                        {proposal.status === "passed" ? (
                                            <Button onClick={() => handleExecuteProposal(proposal.id)} className="bg-green-600 text-white font-semibold tracking-wide" size="md" radius="md">Execute</Button>
                                        ) : (
                                            <Button className="text-white font-semibold tracking-wide" disabled size="md" radius="md">Execute</Button>
                                        )}
                                        {(proposal.status !== "passed" && proposal.status !== "executed") ? (
                                            <Button onClick={() => handleVote(proposal.id, "no")} className="bg-red-600 text-white font-semibold tracking-wide" size="md" radius="md">Reject</Button>
                                        ) : (
                                            <Button onClick={() => handleVote(proposal.id, "no")} className="text-white font-semibold tracking-wide" size="md" radius="md">Reject</Button>
                                        )}
                                    </div>
                                </div>

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