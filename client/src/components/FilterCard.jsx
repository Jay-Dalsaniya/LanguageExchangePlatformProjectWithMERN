import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/courseSlice';

// Updated filter data including Fees and Country
const filterData = [
    {
        filterType: "Course Name",
        key: "courseName",
        array: ["Basic Course", "English","Intermediate Course", "Advanced Course"] // Example course names
    },
    {
        filterType: "Fees",
        key: "fees",
        array: ["0-50", "51-100", "101-200"] // Example fee ranges
    },
   
];

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        courseName: '',
        language: '',
        fees: '',
        country: ''
    });
    const dispatch = useDispatch();

    const changeHandler = (key, value) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value
        }));
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedFilters));
    }, [selectedFilters, dispatch]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Courses</h1>
            <hr className='mt-3' />
            {filterData.map((data, index) => (
                <div key={index}>
                    <h1 className='font-bold text-lg'>{data.filterType}</h1>
                    <RadioGroup 
                        value={selectedFilters[data.key]} 
                        onValueChange={(value) => changeHandler(data.key, value)}
                    >
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div className='flex items-center space-x-2 my-2' key={itemId}>
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            );
                        })}
                    </RadioGroup>
                </div>
            ))}
        </div>
    );
};

export default FilterCard;
