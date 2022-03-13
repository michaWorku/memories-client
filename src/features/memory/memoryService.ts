import API from '../../api'
import { Memory } from '../../type'

// Create memory
const createMemory = async (formData: Memory) =>{
    const response = await API.post('/memories', formData)

    return response.data
}

// Get memory
const getMemories = async (
  page: number = 1,
  limit: number = 3,
  categoryName: string = 'all'
) =>{
    const response = await API.get(`/memories?page=${page}&limit=${limit}&category=${categoryName}`)

    return response.data
}

// Update memory
const updateMemory = async (id: string, formData: Memory) =>{
    const response = await API.patch(`/memories/${id}`, formData)

    return response.data
}

// Delete memory
const deleteMemory = async (id: string) =>{
    const response = await API.delete(`/memories/${id}`)

    return response.data
}


const memoryService = {
    createMemory,
    getMemories, 
    updateMemory,
    deleteMemory,
}

export default memoryService