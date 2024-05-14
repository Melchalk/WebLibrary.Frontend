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
        login: (state, action) => {
            state.isLogin = action.payload
        },
        addAuthToken: (state, action) => {
            state.accessToken = action.payload,
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
        }
    },
})

export const { login, addAuthToken, addRefreshToken, addId, logout} = authSlice.actions