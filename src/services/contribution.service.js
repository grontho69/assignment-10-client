import api from './api';

export const contributionService = {
    getContributionsByIssueId: async (issueId) => {
        const response = await api.get(`/contributions?issueId=${issueId}`);
        return response.data;
    },
    createContribution: async (contributionData) => {
        const response = await api.post('/contributions', contributionData);
        return response.data;
    },
    getMyContributions: async () => {
        const response = await api.get('/contributions/my');
        return response.data;
    }
};
