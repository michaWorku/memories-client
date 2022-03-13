import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {
  authReducer,
  signupModeReducer,
  editModeReducer,
  currentMemoryReducer,
  memoryReducer,
  favoritesReducer,
  categoryReducer,
  drawerReducer,
  selectedCategoryReducer,
  pageReducer,
  limitReducer,
  lastChangedMemoryReducer,
  memoriesLoadingReducer,
} from '../features'

export const store = configureStore({
  reducer: {
      isSignUp: signupModeReducer,
      isEdit: editModeReducer,
      profile: authReducer,
      memories: memoryReducer,
      memoriesLoading: memoriesLoadingReducer,
      currentMemory: currentMemoryReducer,
      favorites: favoritesReducer,
      categories: categoryReducer,
      isDrawer: drawerReducer,
      selectedCategory: selectedCategoryReducer,
      page: pageReducer,
      limit: limitReducer,
      lastChangedMemory: lastChangedMemoryReducer,
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
