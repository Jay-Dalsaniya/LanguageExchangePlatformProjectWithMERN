import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Course from './Course';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/courseSlice';
import useGetAllCourses from '@/hooks/useGetAllCourses';

// const randomCourses = [1, 2,45];

const Browse = () => {
    useGetAllCourses();
    const { allCourses } = useSelector(store => store.course);
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allCourses.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allCourses.map((course) => {
                            return (
                                <Course key={course._id} course={course} />
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse
