import api from './api';

export const issueService = {
    getAllIssues: async () => {
        const res = await api.get('/issues');
        return res.data;
    },
    getRecentIssues: async () => {
        const res = await api.get('/issues/recent-issues');
        return res.data;
    },
    getIssueDetails: async (id) => {
        const res = await api.get(`/issues/${id}`);
        return res.data;
    },
    getMyIssues: async () => {
        const res = await api.get('/issues/my-issues');
        return res.data;
    },
    createIssue: async (data) => {
        const res = await api.post('/issues', data);
        return res.data;
    },
    updateIssue: async (id, data) => {
        const res = await api.patch(`/issues/${id}`, data);
        return res.data;
    },
    deleteIssue: async (id) => {
        const res = await api.delete(`/issues/${id}`);
        return res.data;
    }
};
