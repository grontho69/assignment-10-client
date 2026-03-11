import api from './api';

export const issueService = {
    getAllIssues: async () => {
        const response = await api.get('/issues');
        return response.data;
    },
    getRecentIssues: async () => {
        const response = await api.get('/issues/recent-issues');
        return response.data;
    },
    getIssueById: async (id) => {
        const response = await api.get(`/issues/${id}`);
        return response.data;
    },
    createIssue: async (issueData) => {
        const response = await api.post('/issues', issueData);
        return response.data;
    },
    updateIssue: async (id, issueData) => {
        const response = await api.put(`/issues/${id}`, issueData);
        return response.data;
    },
    deleteIssue: async (id) => {
        const response = await api.delete(`/issues/${id}`);
        return response.data;
    },
    getMyIssues: async (email) => {
        const response = await api.get(`/issues/my-issues?email=${email}`);
        return response.data;
    },
    approveIssue: async (id) => {
        const response = await api.patch(`/issues/${id}/approve`);
        return response.data;
    }
};
