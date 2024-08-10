import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import LanguagesTable from './LanguagesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllLanguages from '@/hooks/useGetAllLanguages'
import { useDispatch } from 'react-redux'
import { setSearchLanguageByText } from '@/redux/languageSlice'

const Languages = () => {
    useGetAllLanguages();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchLanguageByText(input));
    },[input, dispatch]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/languages/create")}>New Language</Button>
                </div>
                <LanguagesTable/>
            </div>
        </div>
    )
}

export default Languages
