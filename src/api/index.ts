import axios from 'axios'
import { AuthFormData, Memory } from '../type'

const API = axios.create({
  baseURL: "http://localhost:5000/api",
})

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
      // @ts-ignore
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile') as string).token
    }`
  }
  return req
})

export default API