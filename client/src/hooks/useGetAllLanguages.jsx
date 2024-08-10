import { setLanguages } from '@/redux/languageSlice'
import { LANGUAGE_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllLanguages = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchLanguages = async () => {
            try {
                const res = await axios.get(`${LANGUAGE_API_END_POINT}/get`, { withCredentials: true });
                console.log('called');
                if (res.data.success) {
                    dispatch(setLanguages(res.data.languages));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchLanguages();
    }, [dispatch])
}

export default useGetAllLanguages
