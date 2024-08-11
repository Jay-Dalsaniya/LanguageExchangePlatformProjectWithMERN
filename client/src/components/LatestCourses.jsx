import React from 'react'
import LatestCourseCards from './LatestCourseCards';
import { useSelector } from 'react-redux'; 

const LatestCourses = () => {
    const { allCourses } = useSelector(store => store.course);
   
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Language Course Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allCourses.length <= 0 ? <span>No course Available</span> : allCourses?.slice(0, 6).map((course) => <LatestCourseCards key={course._id} course={course}/>)
                }
            </div>
        </div>
    )
}

export default LatestCourses
