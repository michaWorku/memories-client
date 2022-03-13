import API from "../../api"

// Create Category
const createCategory =async (name:string) => {
    const response = await API.post('/categories', {name})

    return response.data
}

// Get Categories
const getCategories =async () => {
    const response = await API.get('/categories')

    return response.data
}

// Update Category
const updateCategory =async (id:string, name:string) => {
    const response = await API.patch(`/categories/${id}`, {name})

    return response.data
}

// Delete Category
const deleteCategory =async (id:string) => {
    const response = await API.delete(`/categories/${id}`)

    return response.data
}

// Add memory to Category
const addMemoryToCategory = async (memoryId: string, categoryId: string) =>{
    const response = await API.post(`/memories/${memoryId}`, { _id: categoryId })

    return response.data
}

// Remove memory from category
const removeMemoryFromCategories = async ( memoryId: string,
  categoryId: string) =>{
    const response = await API.delete(`/memories/${memoryId}/${categoryId}`)

    return response.data
}

const categoryService = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    addMemoryToCategory,
    removeMemoryFromCategories
}

export default categoryService