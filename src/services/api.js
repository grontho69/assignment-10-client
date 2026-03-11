import axios from 'axios';
import { auth } from '../config/firebase.config';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://eco-report-server.vercel.app',
});

// Axios interceptor to attach Firebase ID Token to every request
api.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
