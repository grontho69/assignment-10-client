import axios from 'axios';
import { auth } from '../config/firebase.config';

const baseURL = import.meta.env.VITE_API_URL || 'https://eco-report-server.vercel.app';

const api = axios.create({
    baseURL,
});

api.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    if (user) {
        try {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        } catch (e) {
            console.error("Error getting Firebase token", e);
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export { baseURL };
export default api;
