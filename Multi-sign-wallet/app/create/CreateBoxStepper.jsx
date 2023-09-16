"use client"

import React, { useState } from 'react'
import CreateInputSection from './CreateInputSection'
import { chainData } from './chainAsset';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Avatar, CircularProgress, User } from '@nextui-org/react'
import { Alert, AlertTitle } from '@mui/material';
import { setGroupContract } from '../redux/feature/groupContractSlice';

const steppers = [
    { id: 1, name: "Select network and name of your Safe Account", description: "Select the network on which to create your Safe Account" },
    { id: 2, name: "Owners and confirmations", description: "Set the owner wallets of your Safe Account and how many need to confirm to execute a valid transaction." },
    { id: 3, name: "Review", description: "You're about to create a new Safe Account and will have to confirm the transaction with your connected wallet." }
]

const CreateBoxStepper = () => {
    const [stepperCount, setStepperCount] = useState(0);
    const selectedChain = useSelector((state) => state.selectedChainReducer);
    const router = useRouter();
    const dispatch=useDispatch()
    const [chain, setChain] = useState(0);
    const [onChain, setOnChain] = useState(false);

    const [showNameError, setShowNameError] = useState(false);
    const [showError, setShowError] = useState(false);

    const [transactionLoader, setTransactionLoader] = useState(true);
    const [txerror, setTxerror] = useState(false);

    const { clientSigner, signer } = useSelector(state => state.connectWalletReducer.user);
    const deployer_contract = process.env.NEXT_PUBLIC_DEPLOYER_CONTRACT;

    const [userWalletData, setUserWalletData] = useState({
        walletName: "",
        threshold: "",
        maxVotingPeriod: "",
        owners: [
            {
                name: "Owner",
                address: signer,
                weight: 55
            }
        ],
        walletAddress: "",
        groupContract:""
    });

    const handleInputName = (e) => {
        const { name, value } = e.target;
        setUserWalletData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const ownersWithEmptyFields = userWalletData.owners.filter(owner => (
        (!owner.name || owner.name.trim() === '') &&
        (!owner.address || owner.address.trim() === '') &&
        (!owner.weight || owner.weight === '')
    ));

    const voteValidation = stepperCount > 0 && (!userWalletData.maxVotingPeriod);

    const thresholdValidation = stepperCount > 0 && (!userWalletData.threshold);


    const handle = async () => {
        let currentTime = Math.floor(Date.now() / 1000);

        if (userWalletData.walletName.trim() === '') {
            setShowNameError(true);
            return;
        }


        if (stepperCount == 1 && ownersWithEmptyFields.length > 0) {
            setShowError(true);
            return;
        }

        if (voteValidation || thresholdValidation) {
            setShowError(true);
            return;
        }

        stepperCount >= 2 ? setStepperCount(stepperCount) : setStepperCount(stepperCount + 1);

        if (stepperCount == 0) {
            const newData = [...userWalletData.owners];
            newData[0] = {
                ...newData[0],
                address: signer
            };
            setUserWalletData(prev => ({ ...prev, owners: newData }))
        }

        else if (stepperCount == 2) {
            setTransactionLoader(false);
            setTxerror(false);
            if (clientSigner && signer) {
                let owner_arr = []

                for (let i = 0; i < userWalletData?.owners.length; i++) {
                    const owner_obj = {
                        addr: userWalletData?.owners[i].address,
                        weight: userWalletData?.owners[i].weight
                    }

                    owner_arr.push(owner_obj)
                }

                let transaction;
                let TimeConversion = 24 * 60 * 60;
                try {
                    console.log(clientSigner)
                    console.log(deployer_contract)
                    transaction = await clientSigner.execute(
                        signer,
                        deployer_contract,
                        {
                            connector: {
                                members: owner_arr,
                                threshold_weight: userWalletData?.threshold,
                                max_voting_period:(userWalletData?.maxVotingPeriod * TimeConversion),
                                //converting maxvotingPeriod from days to seconds.
                            }
                        },
                        "auto"
                    )

                    console.log(transaction)
                    console.log({
                        time: currentTime + (userWalletData?.maxVotingPeriod * TimeConversion),
                        currTime: currentTime,
                        maxVotePeriod: userWalletData?.maxVotingPeriod,
                        conversion: TimeConversion
                    });

                    const multi_contract_address = ((transaction?.logs[0]?.events.filter(item => item.type === "wasm"))[0].attributes.filter(items => items.key === "multi_contract_address"))[0].value;
                    const groupContract = ((transaction?.logs[0]?.events.filter(item => item.type === "wasm"))[0].attributes.filter(items => items.key === "cw4_group_address"))[0].value;

                    console.log(groupContract)

                    dispatch(setGroupContract(groupContract))


                    if (multi_contract_address) {
                        setUserWalletData(prev => ({ ...prev, walletAddress: multi_contract_address,
                        groupContract }))
                        setTransactionLoader(true)

                        setUserWalletData(prev => {
                            const userWalletAddr = {
                                ...prev,
                                walletAddress: multi_contract_address,
                                groupContract
                            }

                            const userWallets = localStorage.getItem("/****user_wallet****/") === null ? [] : localStorage.getItem("/****user_wallet****/");

                            if (userWallets.length > 0) {
                                const wallets = JSON.parse(userWallets);
                                wallets.push(userWalletAddr);
                                localStorage.setItem('/****user_wallet****/', JSON.stringify(wallets))
                            } else {
                                userWallets.push(userWalletAddr);
                                localStorage.setItem('/****user_wallet****/', JSON.stringify(userWallets))
                            }

                            return userWalletAddr
                        })

                        router.push(`/home?multi_sig=${multi_contract_address}`)
                    }

                } catch (error) {
                    setTransactionLoader(true);
                    setTxerror(true);
                    console.log(error)
                }



            }
        }
    }

    return (
        <div className='w-[80%] bg-white rounded-md border shadow-xl'>
            <div className='flex justify-start items-start border-b-gray-300 border-b px-3 py-5 bg-white text-black rounded-lg'>
                <span className='border bg-black text-white flex justify-center items-center w-8 h-8 rounded-full mr-4 mt-2 '>{stepperCount + 1}</span>

                <div>
                    <h3 className='font-semibold text-[18px]'>{steppers[stepperCount].name}</h3>
                    <p className='text-[12px]'>{steppers[stepperCount].description}</p>
                </div>
            </div>
            <div>
                {
                    stepperCount === 0 ?
                        <>
                            <div className='flex items-center px-3 py-5 gap-4'>
                                <input name='walletName' onChange={(e) => handleInputName(e)}
                                    type="text" value={userWalletData.walletName}
                                    placeholder='Enter your multi signature account wallet name'
                                    className='outline-none border px-3 py-3 my-2 w-[50%] rounded realtive' />

                                <div>
                                    <div className="flex items-center justify-center border p-1 ml-2 rounded relative" onClick={() => setOnChain(true)} >
                                        <img src={chainData[chain].image} alt="" className="w-10 h-10" />
                                        <h3 className="font-semibold text-[13px]">{chainData[chain].name}</h3>

                                    </div>
                                    {onChain && <div className="border rounded absolute mt-2 bg-white">
                                        {
                                            chainData.map((item, index) => {
                                                return (
                                                    <div className="flex justify-between items-center bg-green-100 m-2" onClick={() => {
                                                        setChain(index);
                                                        setOnChain(false);
                                                    }} key={index} >
                                                        <img src={item.image} alt="" className="w-10 h-10" />
                                                        <h3 className="font-semibold text-[13px] pr-3">{item.name}</h3>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>}
                                </div>
                            </div>
                            {showNameError && userWalletData.walletName === "" && (
                                <div className="absolute -mt-6">
                                    <p className="text-red-500 ml-4 text-xs font-normal hover:underline">
                                        <HelpOutlineIcon className='w-3 h-3 mr-2' />
                                        Please Enter a Wallet name.</p>
                                </div>
                            )}
                        </>
                        :
                        stepperCount === 1 ?
                            <div>
                                <CreateInputSection state={userWalletData} setState={setUserWalletData} />
                                {showError && stepperCount > 0 && (
                                    <div className="absolute -mt-6">
                                        <p className="text-red-500 ml-4 text-xs font-normal hover:underline">
                                            <HelpOutlineIcon className='w-3 h-3 mr-2' />
                                            Please Check Entered Data Again.</p>
                                    </div>
                                )}
                            </div>
                            :
                            <div className="flex flex-col items-center justify-center h-[60vh] gap-2">
                                <div className="mx-auto">
                                    <table className="border-collapse w-[50vw] h-[40vh]">
                                        <tbody>
                                            <tr className="border-b">
                                                <td className="py-2 px-4 font-semibold">Network</td>
                                                <td className="py-2 px-4">{selectedChain?.chainName}</td>  {/* @todo- dynamic chain */}
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 px-4 font-semibold">Name</td>
                                                <td className="py-2 px-4">{userWalletData.owners[0].name}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 px-4 font-semibold">Address</td>
                                                <td className="py-2 px-4">
                                                    <div className="flex items-center space-x-2 gap-6">
                                                        <Avatar name={userWalletData.owners[0].name} size="md" isBordered radius="full" />
                                                        <p className="font-light">{userWalletData.owners[0].address}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 px-4 font-semibold">Threshold</td>
                                                <td className="py-2 px-4">
                                                    <p className="font-semibold">{userWalletData.threshold} <span className='semibold'>Weight</span>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 px-4 font-semibold">Max Voting Period</td>
                                                <td className="py-2 px-4 ">
                                                    <p className="font-semibold">{userWalletData.maxVotingPeriod}
                                                        <span>
                                                            {userWalletData.maxVotingPeriod === 1 ? " Day" : " Days"}
                                                        </span>
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {txerror && <Alert severity="error" className='w-[100vh] border border-red-400'>
                                        <AlertTitle>Error</AlertTitle>
                                        Transaction reverted — <strong>TRY AGAIN!</strong>
                                    </Alert>}

                                </div>

                                <div className="flex items-center justify-center p-4">
                                    {!transactionLoader ? (
                                        <div className="text-gray-400 z-20" >
                                            <CircularProgress color="default" aria-label="Loading..." label="Transacting..." />
                                        </div>
                                    ) : null}
                                </div>

                            </div>
                }
            </div>

            <div className='px-3 py-5 border-t flex items-center justify-between'>
                {
                    stepperCount > 0 &&
                    <button className='border py-2 w-[130px] rounded bg-gray-950 text-white' onClick={() => {
                        setTransactionLoader(true);
                        setTxerror(false);
                        stepperCount <= 0 ? setStepperCount(stepperCount) : setStepperCount(stepperCount - 1)
                    }}>Back</button>
                }
                <button className='border py-2 w-[130px] rounded bg-gray-950 text-white' onClick={handle}>Next</button>
            </div>
        </div>
    )
}

export default CreateBoxStepper