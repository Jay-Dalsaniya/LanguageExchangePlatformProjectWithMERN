import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LANGUAGE_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleLanguage } from '@/redux/languageSlice';

const LanguageCreate = () => {
    const navigate = useNavigate();
    const [languageName, setLanguageName] = useState('');
    const dispatch = useDispatch();

    const registerNewLanguage = async () => {
        if (!languageName.trim()) {
            toast.error('Language name cannot be empty.');
            return;
        }
        try {
            const res = await axios.post(`${LANGUAGE_API_END_POINT}/register`, { languageName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleLanguage(res.data.language));
                toast.success(res.data.message);
                const languageId = res?.data?.language?._id;
                navigate(`/admin/languages/${languageId}`);
            }
        } catch (error) {
            console.error('Failed to register language:', error);
            toast.error('Failed to register language. Please try again.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Language Name</h1>
                    <p className='text-gray-500'>What would you like to give your language name? you can change this later.</p>
                </div>

                <Label>Language Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="English, Spanish, etc."
                    value={languageName}
                    onChange={(e) => setLanguageName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/languages")}>Cancel</Button>
                    <Button onClick={registerNewLanguage}>Continue</Button>
                </div>
            </div>
        </div>
    );
};

export default LanguageCreate;
