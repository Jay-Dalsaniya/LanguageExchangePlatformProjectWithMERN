import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Course from './Course';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Courses = () => {
    const { allCourses, searchedQuery } = useSelector(store => store.course);
    const [filterCourses, setFilterCourses] = useState(allCourses);

    useEffect(() => {
        if (searchedQuery) {
            const filteredCourses = allCourses.filter((course) => {
                const matchCourseName = searchedQuery.courseName
                    ? course.courseName.toLowerCase().includes(searchedQuery.courseName.toLowerCase())
                    : true;
                const matchLanguage = searchedQuery.language
                    ? course.language.toLowerCase().includes(searchedQuery.language.toLowerCase())
                    : true;
                const matchFees = searchedQuery.fees
                    ? course.fees >= parseInt(searchedQuery.fees.split('-')[0]) && course.fees <= parseInt(searchedQuery.fees.split('-')[1])
                    : true;
                const matchCountry = searchedQuery.country
                    ? course.country.toLowerCase().includes(searchedQuery.country.toLowerCase())
                    : true;

                return matchCourseName && matchLanguage && matchFees && matchCountry;
            });
            setFilterCourses(filteredCourses);
        } else {
            setFilterCourses(allCourses);
        }
    }, [allCourses, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterCourses.length <= 0 ? <span>Course not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterCourses.map((course) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={course?._id}>
                                                <Course course={course} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Courses;
