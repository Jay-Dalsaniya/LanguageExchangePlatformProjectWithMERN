import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminCoursesTable = () => { 
    const {allAdminCourses, searchCourseByText} = useSelector(store=>store.course);

    const [filterCourses, setFilterCourses] = useState(allAdminCourses);
    const navigate = useNavigate();

    useEffect(()=>{ 
        console.log('called');
        const filteredCourses = allAdminCourses.filter((course)=>{
            if(!searchCourseByText){
                return true;
            };
            return course?.title?.toLowerCase().includes(searchCourseByText.toLowerCase()) || course?.language?.name.toLowerCase().includes(searchCourseByText.toLowerCase());

        });
        setFilterCourses(filteredCourses);
    },[allAdminCourses,searchCourseByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posted courses</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Language Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCourses?.map((course) => (
                            <tr>
                                <TableCell>{course?.language?.languageName}</TableCell>
                                <TableCell>{course?.title}</TableCell>
                                <TableCell>{course?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=> navigate(`/admin/languages/${course._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=> navigate(`/admin/courses/${course._id}/learners`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4'/>
                                                <span>Learners</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminCoursesTable
