import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestCourseCards = ({ course }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/description/${course._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{course?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{course?.title}</h1>
                <p className='text-sm text-gray-600'>{course?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{course?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{course?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{course?.salary}LPA</Badge>
            </div>
        </div>
    )
}

export default LatestCourseCards
