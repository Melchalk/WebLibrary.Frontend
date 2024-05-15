import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
    isLogin: boolean
    accessToken: string | null
    refreshToken: string | null
    id: string | null
}

const initialState: AuthState = {
    isLogin: localStorage.getItem('accessToken') != null,
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: null,
    id: localStorage.getItem('id')
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addAuthToken: (state, action) => {
            localStorage.setItem('accessToken', action.payload)
        },
        addRefreshToken: (state, action) => {
            state.refreshToken = action.payload
        },
        addId: (state, action) => {
            localStorage.setItem('id', action.payload)
        },
        logout: (state) => {
            localStorage.removeItem('accessToken'),
            localStorage.removeItem('id')
        }
    },
})

export const { addAuthToken, addRefreshToken, addId, logout} = authSlice.actions