import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import courseSlice from "./courseSlice";  // Assuming jobSlice is now courseSlice
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import languageSlice from "./languageSlice";  // Renamed from companySlice
import applicationSlice from "./applicationSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    auth: authSlice,
    course: courseSlice,  // Renamed from jobSlice
    language: languageSlice,  // Renamed from companySlice
    application: applicationSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;
