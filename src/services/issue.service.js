const API_URL = import.meta.env.VITE_API_URL || 'https://eco-report-server.vercel.app';

export const issueService = {
    getAllIssues: async () => {
        const response = await fetch(`${API_URL}/issues`);
        return response.json();
    },
    getRecentIssues: async () => {
        const response = await fetch(`${API_URL}/issues/recent-issues`);
        return response.json();
    },
    getIssueById: async (id, token) => {
        const response = await fetch(`${API_URL}/issues/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.json();
    }
};
