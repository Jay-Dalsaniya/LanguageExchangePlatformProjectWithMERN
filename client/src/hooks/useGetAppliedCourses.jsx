import { setAllAppliedCourses } from "@/redux/courseSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedCourses = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedCourses = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                console.log(res.data);
                if (res.data.success) {
                    dispatch(setAllAppliedCourses(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedCourses();
    }, [dispatch]);
};

export default useGetAppliedCourses;
