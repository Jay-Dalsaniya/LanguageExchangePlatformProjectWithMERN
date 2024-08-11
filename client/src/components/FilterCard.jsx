import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/courseSlice';

// Updated filter data based on new schema fields
const filterData = [
    {
        filterType: "Course Name",
        array: ["Course A", "Course B", "Course C"] // Sample values, update as needed
    },
    {
        filterType: "Subject",
        array: ["Math", "Science", "History"] // Sample values, update as needed
    },
    {
        filterType: "Platform",
        array: ["Online", "In-Person"] // Sample values, update as needed
    },
    {
        filterType: "Duration",
        array: ["1 Month", "3 Months", "6 Months"] // Sample values, update as needed
    },
    {
        filterType: "Fees",
        array: ["0-50", "51-100", "101-200"] // Sample values, update as needed
    },
    {
        filterType: "Fee Type",
        array: ["One-time", "Monthly", "Yearly"] // Sample values, update as needed
    },
    {
        filterType: "Level",
        array: ["Beginner", "Intermediate", "Advanced"] // Sample values, update as needed
    },
    {
        filterType: "Language",
        array: ["English", "Spanish", "French"] // Sample values, update as needed
    }
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Courses</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`;
                                    return (
                                        <div className='flex items-center space-x-2 my-2' key={itemId}>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    );
}

export default FilterCard;
