const API_URL = import.meta.env.VITE_API_URL || 'https://eco-report-server.vercel.app';

export const userService = {
    getAllUsers: async () => {
        const response = await fetch(`${API_URL}/users`, {
            credentials: 'include'
        });
        return response.json();
    },
    updateUserRole: async (email, role) => {
        const response = await fetch(`${API_URL}/users/role`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, role }),
            credentials: 'include'
        });
        return response.json();
    }
};
