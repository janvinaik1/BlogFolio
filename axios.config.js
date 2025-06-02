import axios from "axios";

const isLocalhost = window.location.hostname === "localhost";
const baseURL = isLocalhost
  ? "http://localhost:5000"
  : "https://personal-blog-portfolio-backend.vercel.app";//PUT THIS IN .ENV 

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