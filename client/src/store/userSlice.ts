import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {IUser} from "../models/IUser"
import AuthService from "../services/AuthService"
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";

interface userState {
    user: IUser
    isAuth: boolean
    isLoading: boolean
}

const initialState: userState = {
    user: {} as IUser,
    isAuth: false,
    isLoading: false
}

export const login = createAsyncThunk(
  'user/login',
  async (data: {email: string, password: string}) => {
    try {
        return await AuthService.login(data.email, data.password)
    } catch (err) {
        console.log(err)
    }
  }
)

export const registration = createAsyncThunk(
  'user/registration',
  async (data: {email: string, password: string}) => {
    try {
        return await AuthService.registration(data.email, data.password)
    } catch (err) {
        console.log(err)
    }
  }
)

export const logout = createAsyncThunk(
  'user/logout',
  async () => {
    try {
        return await AuthService.logout()
    } catch (err) {
        console.log(err)
    }
  }
)

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
        return await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
    } catch (err) {
        console.log(err)
    }
  }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload) {
                localStorage.setItem('token', action.payload.data.accessToken)
                state.isAuth = true
                state.user = action.payload.data.user
            }
        })
        builder.addCase(registration.fulfilled, (state, action) => {
            if (action.payload) {
                localStorage.setItem('token', action.payload.data.accessToken)
                state.isAuth = true
                state.user = action.payload.data.user
            }
        })
        builder.addCase(logout.fulfilled, (state) => {
            localStorage.removeItem('token')
            state.isAuth = false
            state.user = {} as IUser
        })
        builder.addCase(checkAuth.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            if (action.payload) {
                localStorage.setItem('token', action.payload.data.accessToken)
                state.isAuth = true
                state.user = action.payload.data.user
            }
            state.isLoading = false
        })
        builder.addCase(checkAuth.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export default userSlice.reducer