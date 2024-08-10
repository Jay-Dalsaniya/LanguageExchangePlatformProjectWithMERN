import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import LearnersTable from './LearnersTable'
import axios from 'axios';
import { COURSE_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllLearners } from '@/redux/applicationSlice';

const Learners = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {learners} = useSelector(store => store.course);

    useEffect(() => {
        const fetchAllLearners = async () => {
            try {
                const res = await axios.get(`${COURSE_API_END_POINT}/${params.id}/learners`, { withCredentials: true });
                dispatch(setAllLearners(res.data.course));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllLearners();
    }, [params.id, dispatch]);
    
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Learners {learners?.length}</h1>
                <LearnersTable />
            </div>
        </div>
    )
}

export default Learners
