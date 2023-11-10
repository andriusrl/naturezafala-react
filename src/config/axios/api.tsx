import axios from 'axios'

const apiUrl = import.meta.env.VITE_APIURL

const api = axios.create({
    baseURL: apiUrl,
    // headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    // }
})

export default api