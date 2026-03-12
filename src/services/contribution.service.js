import api from './api';

export const contributionService = {
    createContribution: async (data) => {
        const res = await api.post('/contributions', data);
        return res.data;
    },
    getMyContributions: async () => {
        const res = await api.get('/contributions/my');
        return res.data;
    },
    getImpactStats: async () => {
        const res = await api.get('/stats/impact');
        return res.data;
    }
};
