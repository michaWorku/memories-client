import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Category } from '../../type'
import categoryService from './categoryService'

const initialState: Category[] = []

export const createUserCategory = createAsyncThunk(
  'categories/createUserCategory',
  async (name: string) => {
    const {
      data: { category },
    } = await categoryService.createCategory(name)
    return category
  }
)

export const addUserMemoryToCategory = createAsyncThunk(
  'categories/addUserMemoryToCategory',
  async (data: { _id: string; categoryId: string }) => {
    const {
      data: { memory },
    } = await categoryService.addMemoryToCategory(data._id, data.categoryId)
    return { memory, categoryId: data.categoryId }
  }
)

export const removeUserMemoryFromCategory = createAsyncThunk(
  'categories/removeUserMemoryFromCategory',
  async (data: { _id: string; categoryId: string }) => {
    await categoryService.removeMemoryFromCategories(data._id, data.categoryId)
    return { memory: data._id, categoryId: data.categoryId }
  }
)

export const getUserCategories = createAsyncThunk(
  'categories/getUserCategories',
  async () => {
    const {
      data: { categories },
    } = await categoryService.getCategories()
    return categories
  }
)

export const updateUserCategory = createAsyncThunk(
  'categories/updateUserCategory',
  async (data: { _id: string; name: string }) => {
    await categoryService.updateCategory(data._id, data.name)
    return data
  }
)

export const deleteUserCategory = createAsyncThunk(
  'categories/deleteUserCategory',
  async (_id: string) => {
    await categoryService.deleteCategory(_id)
    return _id
  }
)

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategories: (state) => (state = []),
  },
  extraReducers: (builder) => {
    builder.addCase(createUserCategory.fulfilled, (state, { payload }) => {
      state.push(payload)
    })

    builder.addCase(addUserMemoryToCategory.fulfilled, (state, { payload }) => {
      const category = state.find(
        (category) => category._id === payload.categoryId
      )
      category?.memories.push(payload.memory)
    })

    builder.addCase(
      removeUserMemoryFromCategory.fulfilled,
      (state, { payload }) => {
        const category = state.find(
          (category) => category._id === payload.categoryId
        )
        // @ts-ignore
        category.memories = category?.memories.filter(
          // @ts-ignore
          (memory) => memory._id !== payload.memory
        )
      }
    )

    builder.addCase(
      getUserCategories.fulfilled,
      (state, { payload }) => (state = payload)
    )

    builder.addCase(updateUserCategory.fulfilled, (state, { payload }) => {
      const category = state.find((category) => category._id === payload._id)
      if (category) {
        category.name = payload.name
      }
    })

    builder.addCase(
      deleteUserCategory.fulfilled,
      (state, { payload }) =>
        (state = state.filter((category) => category._id !== payload))
    )
  },
})

export const { clearCategories: clearCategoriesActionCreator } =
  categorySlice.actions

export default categorySlice.reducer
