import { useState, useEffect } from 'react';
import { issueService } from '../services/issue.service';

export const useIssues = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const data = await issueService.getAllIssues();
                setIssues(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchIssues();
    }, []);

    return { issues, loading, error };
};
