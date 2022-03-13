import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import signupModeReducer from '../features/auth/signupMode'
import memoryReducer from '../features/memory/memorySlice';
import memoriesLoadingReducer from '../features/memory/memoriesLoadingSlice';
import currentMemoryReducer from '../features/memory/currentMemory';
import favoritesReducer from '../features/favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    profile : authReducer,
    isSignUp: signupModeReducer,
    memories: memoryReducer,
    memoriesLoading: memoriesLoadingReducer,
    currentMemory: currentMemoryReducer,
    favorites: favoritesReducer,
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
