import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LanguagesTable = () => {
    const { languages, searchLanguageByText } = useSelector(store => store.language);
    const [filterLanguage, setFilterLanguage] = useState(languages);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredLanguage = languages.length >= 0 && languages.filter((language) => {
            if (!searchLanguageByText) {
                return true;
            }
            return language?.languageName?.toLowerCase().includes(searchLanguageByText.toLowerCase());
        });
        setFilterLanguage(filteredLanguage);
    }, [languages, searchLanguageByText]);

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered languages</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Creator</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterLanguage?.map((language) => (
                            <TableRow key={language._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={language.logo} alt={language.languageName} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{language.languageName}</TableCell>
                                <TableCell>{language.creator}</TableCell>
                                <TableCell>{language.country}</TableCell>
                                <TableCell>{new Date(language.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={() => navigate(`/admin/languages/${language._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default LanguagesTable;
