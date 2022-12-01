import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import AsyncStorage from '@react-native-async-storage/async-storage';

// Feilds that are set when a user logs in
export interface AuthState {
    name: string | null,
    token: string | null,
    cypher: string | null
}

const initialState: AuthState = {
    name: null,
    token: null,
    cypher: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser: (state, action: PayloadAction<{name: string, token: string, cypher: string}>) =>{
            AsyncStorage.setItem("user",JSON.stringify({
                name: action.payload.name,
                token: action.payload.token,
                cypher: action.payload.cypher
            }))
            state.name = action.payload.name;
            state.token = action.payload.token;
            state.cypher = action.payload.cypher;

        }
    }
})
// Allows to get state of current user
export const selectAuth = (state: RootState) => state.auth;

export const {setUser} = authSlice.actions;

export default authSlice.reducer;