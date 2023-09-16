import React, { useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import ContactsIcon from '@mui/icons-material/Contacts';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


const CreateInputSection = ({ state, setState }) => {

    const handleInputChange = (index, field, value) => {
        const newData = [...state.owners];
        newData[index] = {
            ...newData[index],
            [field]: value
        };
        setState(prev => ({ ...prev, owners: newData }))
    };


    const handleDeleteInput = (index) => {

        const newInputTags = state.owners.filter((_, i) => i !== index);
        setState(prev => ({ ...prev, owners: newInputTags }))
    };

    const [totalWeight, setTotalWeight] = useState();
    const [thresholderror, setThresholderror] = useState(false);
    const handleThresholdAndVote = (event) => {
        const { name, value } = event.target;

        if (name === 'threshold') {
            const newThreshold = Number(value);

            if (newThreshold <= totalWeight) {
                setState(prev => ({ ...prev, [name]: newThreshold }));
            } else {
                setThresholderror(true);
                console.error("Threshold should be less than or equal to total weight.");
            }
        } else {
            setState(prev => ({ ...prev, [name]: Number(value) }));
        }
    }

    useEffect(() => {
        const calculatedTotalWeight = state.owners.reduce((sum, curr) => {
            if (curr.weight) {
                return sum + Number(curr.weight);
            }
            return sum;
        }, 0);

        setTotalWeight(calculatedTotalWeight); // Update total weight
    }, [state.owners]);

    return (
        <div>

            {
                state.owners.map((item, index) => {
                    return (
                        <div className='flex my-3 px-3 py-1 items-center' key={index}  >
                            <div className='border flex justify-start items-center rounded'>
                                <div className='border py-3 px-3 bg-gray-950 rounded'>
                                    <PersonIcon className='text-white bg-transparent' />
                                </div>
                                <input type="text" name='name' value={state.owners[index]?.name ?? ""} onChange={(e) => { handleInputChange(index, "name", e.target.value) }} className='px-2 py-3 outline-none' placeholder='Owner Name' />
                            </div>
                            <div className='border flex justify-start items-center rounded ml-5'>
                                <div className='border py-3 px-3 bg-gray-950 rounded'>
                                    <ContactsIcon className='text-white bg-transparent' />
                                </div>
                                <input type="text" name='address' value={state.owners[index]?.address ?? ""} onChange={(e) => { handleInputChange(index, "address", e.target.value) }} className='px-2 py-3 outline-none' placeholder='Owner Address' />
                            </div>
                            <div className='border flex justify-start items-center rounded ml-5'>
                                <div className='border py-3 px-3 bg-gray-950 rounded'>
                                    <ContactsIcon className='text-white bg-transparent' />
                                </div>
                                <input type="text" name='weight' value={state.owners[index]?.weight ?? ""} onChange={(e) => { handleInputChange(index, "weight", Number(e.target.value)) }} className='px-2 py-3 outline-none' placeholder='Owner Weight' />
                            </div>
                            {index > 0 && <DeleteIcon className='text-gray-400 ml-2' onClick={() => handleDeleteInput(index)} />}
                        </div>
                    );
                })
            }

            <button onClick={() => handleInputChange(state.owners.length, "name", "")} className='flex justify-start items-center hover:bg-gray-100 my-3 px-2 py-3 mx-3 border rounded'>
                <AddIcon className='mr-2' /> <span>Add new owner</span>
            </button>

            <div className='border-t px-3 py-5 space-y-4'>
                <h3 className='font-semibold text-xl'>Threshold</h3>
                <p className='text-sm'>Any transaction requires the confirmation of:</p>

                <input type="number" min="0" placeholder='Enter the threshold' name='threshold' value={state?.threshold.toString() ?? ""} onChange={(e) => handleThresholdAndVote(e)} className='p-2 m-2 border outline-none' />
                <span className='ml-2 font-normal text-gray-800 hover:underline'>out of {totalWeight} weight</span>
                {thresholderror && (
                    <div className='flex'>
                        <HelpOutlineIcon className='w-3 h-3 mr-2' />
                        <p className="text-red-400 text-xs font-normal ">Threshold should be less than or equal to total weight.</p>
                    </div>
                )}

            </div>

            <div className="border-t px-3 py-5 space-y-4 mb-8">
                <h3 className='font-semibold text-xl'>Maximum Voting Period</h3>
                <p className='text-sm font-normal'>Any transaction requires the confirmation of:</p>
                <input type="number" min="0" placeholder='Enter max voting period ' className='p-2 m-2 border outline-none' value={state?.maxVotingPeriod.toString() ?? ""}
                    name='maxVotingPeriod' onChange={(e) => handleThresholdAndVote(e)} /> <span className='ml-2 font-normal text-gray-800 hover:underline'> Enter In Days.</span>
            </div>
        </div>
    )
}

export default CreateInputSection