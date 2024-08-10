import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: "course",
    initialState: {
        allCourses: [],
        allAdminCourses: [],
        singleCourse: null,
        searchCourseByText: "",
        allAppliedCourses: [],
        searchedQuery: "",
    },
    reducers: {
        // actions
        setAllCourses: (state, action) => {
            state.allCourses = action.payload;
        },
        setSingleCourse: (state, action) => {
            state.singleCourse = action.payload;
        },
        setAllAdminCourses: (state, action) => {
            state.allAdminCourses = action.payload;
        },
        setSearchCourseByText: (state, action) => {
            state.searchCourseByText = action.payload;
        },
        setAllAppliedCourses: (state, action) => {
            state.allAppliedCourses = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        }
    }
});

export const {
    setAllCourses,
    setSingleCourse,
    setAllAdminCourses,
    setSearchCourseByText,
    setAllAppliedCourses,
    setSearchedQuery
} = courseSlice.actions;

export default courseSlice.reducer;
