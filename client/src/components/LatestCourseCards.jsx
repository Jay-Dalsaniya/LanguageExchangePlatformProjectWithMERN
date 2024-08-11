import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestCourseCards = ({ course }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/description/${course._id}`)} 
            className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'
        >
            <div>
                <h1 className='font-medium text-lg'>{course?.platform}</h1> {/* Updated field */}
                <p className='text-sm text-gray-500'>{course?.language?.languageName || "Unknown Language"}</p> {/* Assuming you need to display language name */}
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{course?.courseName}</h1> {/* Updated field */}
                <p className='text-sm text-gray-600'>{course?.aboutCourse}</p> {/* Updated field */}
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{course?.duration}</Badge> {/* Updated field */}
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{course?.feeType}</Badge> {/* Updated field */}
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{course?.fees} {course?.feeType}</Badge> {/* Updated field */}
            </div>
        </div>
    );
}

export default LatestCourseCards;
