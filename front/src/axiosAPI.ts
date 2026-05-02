import axios from 'axios';

const axiosAPI = axios.create({
    baseURL: 'http://localhost:8000'
});

axiosAPI.defaults.withCredentials = true;

axiosAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await axiosAPI.post('/users/token');
                return axiosAPI(originalRequest);
            } catch (err) {
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosAPI;