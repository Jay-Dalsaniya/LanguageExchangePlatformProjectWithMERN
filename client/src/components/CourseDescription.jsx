import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, COURSE_API_END_POINT } from '@/utils/constant';
import { setSingleCourse } from '@/redux/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const CourseDescription = () => {
    const { singleCourse } = useSelector(store => store.course);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleCourse?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const courseId = params.id;
    const dispatch = useDispatch();

    const applyCourseHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${courseId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleCourse = { ...singleCourse, applications: [...singleCourse.applications, { applicant: user?._id }] }
                dispatch(setSingleCourse(updatedSingleCourse)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleCourse = async () => {
            try {
                const res = await axios.get(`${COURSE_API_END_POINT}/get/${courseId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleCourse(res.data.course));
                    setIsApplied(res.data.course.applications.some(application => application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCourse();
    }, [courseId, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleCourse?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleCourse?.position} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleCourse?.courseType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleCourse?.salary}LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyCourseHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Course Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleCourse?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleCourse?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleCourse?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleCourse?.experience} yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleCourse?.salary}LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleCourse?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleCourse?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default CourseDescription
