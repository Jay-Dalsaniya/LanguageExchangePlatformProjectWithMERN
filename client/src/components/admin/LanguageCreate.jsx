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
    const [creator, setCreator] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const registerNewLanguage = async () => {
        if (!languageName.trim() || !creator.trim() || !country.trim()) {
            toast.error('Language name, creator, and country cannot be empty.');
            return;
        }
        try {
            const formData = new FormData();
            formData.append("languageName", languageName);
            formData.append("creator", creator);
            formData.append("country", country);
            formData.append("description", description);
            if (file) {
                formData.append("file", file);
            }

            const res = await axios.post(`${LANGUAGE_API_END_POINT}/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Register New Language</h1>
                    <p className='text-gray-500'>Provide details to register a new language.</p>
                </div>

                <Label>Language Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="English, Spanish, etc."
                    value={languageName}
                    onChange={(e) => setLanguageName(e.target.value)}
                />

                <Label>Creator</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="Creator Name"
                    value={creator}
                    onChange={(e) => setCreator(e.target.value)}
                />

                <Label>Country</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />

                <Label>Description</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Label>Logo</Label>
                <Input
                    type="file"
                    className="my-2"
                    accept="image/*"
                    onChange={handleFileChange}
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
