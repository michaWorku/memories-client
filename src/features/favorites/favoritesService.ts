import API from '../../api'

// Get Favorites
const getFavorites =async () => {
    const response = await API.get('/favorites')
    
    return response.data
}

// Add to Favorites
const addToFavorites =async (id: string) => {
    const response = await API.post(`/favorites/${id}`)
    
    return response.data
}

// Add to Favorites
const removeFromFavorites =async (id: string) => {
    const response = await API.delete(`/favorites/${id}`)
    
    return response.data
}

const favoritesService = {
    getFavorites,
    addToFavorites,
    removeFromFavorites
}

export default favoritesService