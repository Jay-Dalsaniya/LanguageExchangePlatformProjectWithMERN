import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        learners: null,
    },
    reducers: {
        setAllLearners: (state, action) => {
            state.learners = action.payload;
        }
    }
});

export const { setAllLearners } = applicationSlice.actions;
export default applicationSlice.reducer;
