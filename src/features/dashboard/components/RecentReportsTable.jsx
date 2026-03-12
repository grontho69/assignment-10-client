import React, { useEffect, useState } from 'react';
import { issueService } from '../../../services/issue.service';
import { Loader2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router';

const RecentReportsTable = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const data = await issueService.getRecentIssues();
                const pendingOnly = data.filter(i => (i.status || 'Pending').toLowerCase() === 'pending');
                setReports(pendingOnly.slice(0, 5));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecent();
    }, []);

    if (loading) return <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-emerald-500" /></div>;

    return (
        <div className="bg-white dark:bg-gray-900 rounded-[3.5rem] p-10 lg:p-14 shadow-sm border border-slate-50 dark:border-gray-800">
             <div className="flex items-center justify-between mb-12 px-2">
                <h3 className="text-2xl font-black text-slate-800 dark:text-white">Active Deployments</h3>
                <Link to="/reports" className="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-600 transition-colors">View All Logs</Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-left border-b dark:border-gray-800">
                            <th className="pb-8 pl-4 uppercase tracking-widest">Tracking ID</th>
                            <th className="pb-8 uppercase tracking-widest">Reporter</th>
                            <th className="pb-8 uppercase tracking-widest">Vector</th>
                            <th className="pb-8 uppercase tracking-widest">Validation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report._id} className="group hover:bg-slate-50 dark:hover:bg-gray-800 transition-all border-b dark:border-gray-800 last:border-0">
                                <td className="py-8 pl-4 font-black text-slate-800 dark:text-white">#{report._id.slice(-6).toUpperCase()}</td>
                                <td className="py-8 font-medium text-slate-500">{report.userName || 'Citizen'}</td>
                                <td className="py-8"><span className="px-5 py-2.5 bg-slate-100 dark:bg-gray-950 rounded-xl text-[10px] font-black uppercase tracking-widest">{report.category}</span></td>
                                <td className="py-8"><span className={`text-[10px] font-black uppercase tracking-widest ${report.status === 'Approved' ? 'text-emerald-500' : 'text-amber-500'}`}>{report.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {reports.length === 0 && (
                <div className="text-center py-12 text-slate-400 font-medium">No recent deployments found.</div>
            )}
        </div>
    );
};
export default RecentReportsTable;

