import axios from "axios"

const baseurl = "http://localhost:8000/api"

const axiosInstance = axios.create()

axiosInstance.defaults.baseURL = baseurl

export default axiosInstance