"use client"

import React, { useState } from 'react'
import CreateInputSection from './CreateInputSection'
import { chainData } from './chainAsset';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { LocalActivitySharp } from '@mui/icons-material';

const steppers = [
    { id: 1, name: "Select network and name of your Safe Account", description: "Select the network on which to create your Safe Account" },
    { id: 2, name: "Owners and confirmations", description: "Set the owner wallets of your Safe Account and how many need to confirm to execute a valid transaction." },
]

const CreateBoxStepper = () => {
    const [stepperCount, setStepperCount] = useState(0);
    const [chain, setChain] = useState(0);
    const [onChain, setOnChain] = useState(false);
    const router = useRouter();

    const { clientSigner, signer } = useSelector(state => state.connectWalletReducer.user);
    const deployer_contract = "osmo167xy6uqcxjwke4xr3se8a32w957eaagy9eftnas8fju4xse4mspslcw6fk";

    const [userWalletData, setUserWalletData] = useState({
        walletName: "",
        threshold: 55,
        maxVotingPeriod: 547643875634,
        owners: [
            {
                name: "Owner",
                address: signer,
                weight: 55
            }
        ],
        walletAddress: ""
    });

    const handleInputName = (e) => {
        const { name, value } = e.target;
        setUserWalletData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handle = async () => {
        stepperCount >= 1 ? setStepperCount(stepperCount) : setStepperCount(stepperCount + 1);

        if (stepperCount == 0) {
            const newData = [...userWalletData.owners];
            newData[0] = {
                ...newData[0],
                address: signer
            };
            setUserWalletData(prev => ({ ...prev, owners: newData }))
        }

        else if (stepperCount == 1) {
            console.log(userWalletData);
            console.log("Hello World")
            if (clientSigner && signer) {
                console.log("transaction")
                console.log(signer)
                console.log(clientSigner)
                let owner_arr = []

                for (let i = 0; i < userWalletData?.owners.length; i++) {
                    const owner_obj = {
                        addr: userWalletData?.owners[i].address,
                        weight: userWalletData?.owners[i].weight
                    }

                    owner_arr.push(owner_obj)
                }

                const transaction = await clientSigner.execute(
                    signer,
                    deployer_contract,
                    {
                        connector: {
                            members: owner_arr,
                            threshold_weight: userWalletData?.threshold,
                            max_voting_period: userWalletData?.maxVotingPeriod
                        }
                    },
                    "auto"
                )

                const multi_contract_address = ((transaction.logs[0].events.filter(item => item.type === "wasm"))[0].attributes.filter(items => items.key === "multi_contract_address"))[0].value;

                if (multi_contract_address) {
                    console.log("wallet created successfuly")
                    setUserWalletData(prev => ({ ...prev, walletAddress: multi_contract_address }))


                    setUserWalletData(prev => {
                        const userWalletAddr = {
                            ...prev,
                            walletAddress: multi_contract_address
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
            }
        }
    }

    return (
        <div className='w-[80%] bg-white'>
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
                        <div className='flex items-center px-3 py-5 gap-4'>
                            <input name='walletName' onChange={(e) => handleInputName(e)} type="text" placeholder='Enter your multi signature account wallet name' className='outline-none border px-3 py-3 w-[50%] rounded' />

                            <div>
                                <div className="flex items-center justify-center border p-1 ml-2 rounded relative" onClick={() => setOnChain(true)} >
                                    <img src={chainData[chain].image} alt="" className="w-10 h-10" />
                                    <h3 className="font-semibold text-[13px]">{chainData[chain].name}</h3>
                                    {/* <HiChevronDown className="" /> */}
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
                        </div> : <CreateInputSection state={userWalletData} setState={setUserWalletData} />
                }
            </div>

            <div className='px-3 py-5 border-t flex items-center justify-between'>
                {
                    stepperCount > 0 &&
                    <button className='border py-2 w-[130px] rounded bg-gray-950 text-white' onClick={() => stepperCount <= 0 ? setStepperCount(stepperCount) : setStepperCount(stepperCount - 1)}>Back</button>
                }
                <button className='border py-2 w-[130px] rounded bg-gray-950 text-white' onClick={handle}>Next</button>
            </div>
        </div>
    )
}

export default CreateBoxStepper