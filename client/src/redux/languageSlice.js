import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
    name: "language",
    initialState: {
        singleLanguage: null,
        languages: [],
        searchLanguageByText: "",
    },
    reducers: {
        // actions
        setSingleLanguage: (state, action) => {
            state.singleLanguage = action.payload;
        },
        setLanguages: (state, action) => {
            state.languages = action.payload;
        },
        setSearchLanguageByText: (state, action) => {
            state.searchLanguageByText = action.payload;
        }
    }
});

export const { setSingleLanguage, setLanguages, setSearchLanguageByText } = languageSlice.actions;
export default languageSlice.reducer;
