import { setSingleLanguage } from '@/redux/languageSlice';
import { LANGUAGE_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetLanguageById = (languageId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleLanguage = async () => {
            try {
                const res = await axios.get(`${LANGUAGE_API_END_POINT}/get/${languageId}`, { withCredentials: true });
                console.log(res.data.language);
                if (res.data.success) {
                    dispatch(setSingleLanguage(res.data.language));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleLanguage();
    }, [languageId, dispatch]);
};

export default useGetLanguageById;
