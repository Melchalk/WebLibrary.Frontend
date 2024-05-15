import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
    isLogin: boolean
    accessToken: string | null
    refreshToken: string | null
    id: string
}

const initialState: AuthState = {
    isLogin: false,
    accessToken: null,
    refreshToken: null,
    id: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addAuthToken: (state, action) => {
            state.accessToken = action.payload,
            state.isLogin = false;
            localStorage.setItem('accessToken', action.payload)
        },
        addRefreshToken: (state, action) => {
            state.refreshToken = action.payload
        },
        addId: (state, action) => {
            state.id = action.payload
        },
        logout: (state) => {
            state.isLogin = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.id = '';
            localStorage.removeItem('accessToken')
        }
    },
})

export const { addAuthToken, addRefreshToken, addId, logout} = authSlice.actions