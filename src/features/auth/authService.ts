import API from '../../api'
import { AuthFormData } from '../../type'

// Register user
const register = async (formData: AuthFormData) =>{
    const response = await API.post('/users/signup', formData)

    if(response.data){
        localStorage.setItem('profile', JSON.stringify(response.data))
    }

    return response.data
}

// Login user
const login = async (formData: AuthFormData) =>{
    const response = await API.post('/users/signin', formData)

    if(response.data){
        localStorage.setItem('profile', JSON.stringify(response.data))
    }

    return response.data
}

// Get Profile
const getProfile =async () => {

    const profile = JSON.parse(localStorage.getItem('profile') as string)
    const userId = profile.user._id
    let { data } = await API.get(`/users/${userId}`)
    data = { ...data, error: false, errorMsg: '' }
    localStorage.setItem('profile', JSON.stringify(data))
    return data 

}


// Logout user
const logout = async ()=>{
    localStorage.removeItem('profile')
}

const authService = {
    register, 
    logout,
    login,
    getProfile
}

export default authService