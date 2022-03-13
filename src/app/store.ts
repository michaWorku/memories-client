import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import signupModeReducer from '../features/auth/signupMode'
import memoryReducer from '../features/memory/memorySlice';

export const store = configureStore({
  reducer: {
    profile : authReducer,
    isSignUp: signupModeReducer,
    memories: memoryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
