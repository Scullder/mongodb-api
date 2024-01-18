import axios from "axios"

const axiosClient = axios.create({
    //baseURL: `${import.meta.env.VITE_APP_BASE_URL}/api`
    baseURL: `http://127.0.0.1:8000/api`
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;

    return config;
})

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const {response} = error;
    if (response.status === 401) { 
        // unauthorize
        localStorage.removeItem('ACCESS_TOKEN');
    }

    throw error;
})


export default axiosClient;