import api from './api';

export const userService = {
    getAllUsers: async (search = '') => {
        const response = await api.get(`/users?search=${search}`);
        return response.data;
    },
    updateUserRole: async (userId, role) => {
        const response = await api.patch(`/users/${userId}/role`, { role });
        return response.data;
    },
    deleteUser: async (userId) => {
        const response = await api.delete(`/users/${userId}`);
        return response.data;
    }
};
