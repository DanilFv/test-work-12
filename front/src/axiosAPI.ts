import axios from 'axios';

const axiosAPI = axios.create({
    baseURL: 'http://localhost:8000'
});

axiosAPI.defaults.withCredentials = true;

export default axiosAPI;