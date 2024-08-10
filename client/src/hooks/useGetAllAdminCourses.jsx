import { setAllAdminCourses } from '@/redux/courseSlice'
import { COURSE_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminCourses = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminCourses = async () => {
            try {
                const res = await axios.get(`${COURSE_API_END_POINT}/getadmincourses`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAdminCourses(res.data.courses));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminCourses();
    }, [dispatch])
}

export default useGetAllAdminCourses
