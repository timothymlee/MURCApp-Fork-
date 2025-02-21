import { configureStore,ThunkAction,Action } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authReducer from '../api/authSlice'
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void>= ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<String>
>;