import axios from "axios";

const ip = window.location.hostname;
const port = 5000; 
const baseURL = `https://personal-blog-portfolio-backend.vercel.app`;

const baseConfig = {
    baseURL: baseURL,
    headers: {
       "content-type": "application/json" 
    }
}

const axiosInstance = axios.create(baseConfig)

axiosInstance.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('token')
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default axiosInstance