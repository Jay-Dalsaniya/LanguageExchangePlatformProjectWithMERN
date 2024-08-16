import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/courseSlice';

// Updated filter data including Fees and Country
const filterData = [
    {
        filterType: "Course Name",
        array: ["Basic Course", "Intermediate Course", "Advanced Course"] // Example course names
    },
    {
        filterType: "Language",
        array: ["English", "Spanish", "French", "German", "Mandarin", "Hindi", "Japanese"] // Example languages
    },
    {
        filterType: "Fees",
        array: ["0-50", "51-100", "101-200"] // Example fee ranges
    },
    {
        filterType: "Country",
        array: ["USA", "India", "Germany", "Japan", "China", "Spain", "France"] // Example countries
    }
];

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        courseName: '',
        language: '',
        fees: '',
        country: ''
    });
    const dispatch = useDispatch();

    const changeHandler = (filterType, value) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value
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
                        value={selectedFilters[data.filterType.toLowerCase().replace(' ', '')]} 
                        onValueChange={(value) => changeHandler(data.filterType.toLowerCase().replace(' ', ''), value)}
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
