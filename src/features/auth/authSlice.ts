import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import authService from './authService'
import { Profile, AuthFormData } from '../../type'

export const register = createAsyncThunk<
  Profile,
  AuthFormData,
  { rejectValue: string }
>('auth/register', async (formData, thunkAPI) => {
  try {
    return await authService.register(formData) as Profile
  } catch (error: any) {
        const message = 
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
        return thunkAPI.rejectWithValue(message)
  }
})

export const login = createAsyncThunk<
  Profile,
  AuthFormData,
  { rejectValue: string }
>('auth/login', async (formData, thunkAPI) => {
  try {
    return await authService.login(formData) as Profile
  } catch (error: any) {
        const message = 
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
        return thunkAPI.rejectWithValue(message)
  }
})

export const getProfile = createAsyncThunk<
  Profile,
  null,
  { rejectValue: string }
>('auth/getProfile', async (_, thunkAPI) => {
  try {
    return await authService.getProfile() as Profile
  } catch (error: any) {
        const message = 
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
        return thunkAPI.rejectWithValue(message)
  }
})

const initialState: Profile = {
  status: '',
  token: '',
  user: {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    memoriesNumber: 0,
  },
  error: false,
  errorMsg: '',
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers: {
        setUser: (state) =>
        (state = JSON.parse(localStorage.getItem('profile') as string)),
        googleLogin : (state,  { payload }: PayloadAction<Profile>) =>{
          localStorage.setItem('profile', JSON.stringify(payload));
          (state = { ...payload, error: false, errorMsg: '' })
        },
        logoutUser: (state) => (state = initialState),
        clearAuthError: (state) =>
        (state = { ...state, error: false, errorMsg: '' }),
        incrementMemoriesNumber: (state) => {
        state.user.memoriesNumber = state.user.memoriesNumber + 1
        },
        decrementMemoriesNumber: (state) => {
        state.user.memoriesNumber = state.user.memoriesNumber - 1
        },
    },
    extraReducers : (builder) =>{
        // Register
        builder
            .addCase( register.rejected, (state, { payload }) =>
                (state = { ...state, error: true, errorMsg: payload }))
            .addCase( register.fulfilled, (state, { payload }: PayloadAction<Profile>) =>
                (state = { ...payload, error: false, errorMsg: '' }))

        // Login
        builder
            .addCase( login.rejected,(state, { payload }) =>
                (state = { ...state, error: true, errorMsg: payload }))
            .addCase( login.fulfilled, (state, { payload }: PayloadAction<Profile>) =>
                (state = { ...payload, error: false, errorMsg: '' }))
        
        // Get profile
        builder
            .addCase( getProfile.rejected, (state, { payload }) =>
              (state = { ...state, error: false, errorMsg: payload }))
            .addCase( getProfile.fulfilled, (state, { payload }: PayloadAction<Profile>) => 
              (state = { ...payload, error: false, errorMsg: '' })
        )
    }
})

export const {
  setUser: setUserActionCreator,
  googleLogin,
  incrementMemoriesNumber: incrementMemoriesNumberActionCreator,
  decrementMemoriesNumber: decrementMemoriesNumberActionCreator,
  logoutUser: logoutUserActionCreator,
  clearAuthError: clearAuthErrorActionCreator,
} = authSlice.actions

export default authSlice.reducer