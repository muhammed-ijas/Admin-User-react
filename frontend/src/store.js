import { configureStore } from "@reduxjs/toolkit"
import authReducer from './slices/authSlice.js';
import adminReducer from './slices/adminSlice.js'
import { apiSlice } from "./slices/apiSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})


export default store