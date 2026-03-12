import React, { useEffect, useState } from 'react';
import DashboardLayout from '../features/dashboard/components/DashboardLayout';
import { issueService } from '../services/issue.service';
import { useAuth } from '../context/AuthContext';
import { FileText, Download, CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchReports = async () => {
        try {
            const data = await issueService.getAllIssues();
            setReports(data);
        } catch (err) {
            toast.error("Failed to load reports");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            await issueService.updateIssue(id, { status });
            toast.success(`Status updated to ${status}`);
            fetchReports();
        } catch (err) {
            toast.error("Update failed");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Delete Report?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await issueService.deleteIssue(id);
                toast.success("Report deleted");
                fetchReports();
            } catch (err) {
                toast.error("Deletion failed");
            }
        }
    };

    const handleExport = async () => {
        window.open('http://localhost:3000/export/csv', '_blank');
    };

    return (
        <DashboardLayout>
            <div className="space-y-12">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <motion.h1 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-black text-slate-800 dark:text-white tracking-tight"
                        >
                            Incident <span className="text-emerald-500">Reports</span>
                        </motion.h1>
                        <p className="text-slate-500 dark:text-gray-400 mt-2 font-medium">Manage and monitor all community-reported environmental concerns.</p>
                    </div>
                    <button 
                        onClick={handleExport}
                        className="h-14 px-8 bg-slate-900 dark:bg-emerald-600 rounded-2xl text-white font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-slate-200 dark:shadow-none"
                    >
                        <Download size={18} /> Export CSV
                    </button>
                </header>

                <div className="bg-white dark:bg-gray-900 rounded-[3.5rem] shadow-sm border border-slate-50 dark:border-gray-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-gray-800/50 border-b dark:border-gray-800">
                                    <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Reporter</th>
                                    <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Issue Details</th>
                                    <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                                    <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                    <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => (
                                    <tr key={report._id} className="border-b dark:border-gray-800 hover:bg-slate-50/30 dark:hover:bg-gray-800/30 transition-colors">
                                        <td className="p-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 font-bold">
                                                    {report.userName?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-slate-800 dark:text-white">{report.userName || 'Anonymous'}</p>
                                                    <p className="text-xs text-slate-400 font-medium">{report.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <div>
                                                <p className="font-black text-sm text-slate-800 dark:text-white mb-1">{report.title}</p>
                                                <p className="text-xs text-slate-400 font-medium line-clamp-1">{report.description}</p>
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <span className="px-4 py-1.5 bg-slate-100 dark:bg-gray-800 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-500">
                                                {report.category}
                                            </span>
                                        </td>
                                        <td className="p-8">
                                            <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                                                report.status === 'Approved' ? 'text-emerald-500' : 
                                                report.status === 'Rejected' ? 'text-rose-500' : 'text-amber-500'
                                            }`}>
                                                {report.status === 'Approved' ? <CheckCircle size={14} /> : 
                                                 report.status === 'Rejected' ? <XCircle size={14} /> : <Clock size={14} />}
                                                {report.status}
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <div className="flex items-center gap-3">
                                                {user?.role === 'admin' && report.status !== 'Approved' && (
                                                    <button 
                                                        onClick={() => handleStatusUpdate(report._id, 'Approved')}
                                                        className="p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl transition-all"
                                                        title="Approve"
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                )}
                                                {user?.role === 'admin' && report.status !== 'Rejected' && (
                                                    <button 
                                                        onClick={() => handleStatusUpdate(report._id, 'Rejected')}
                                                        className="p-3 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all"
                                                        title="Reject"
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => handleDelete(report._id)}
                                                    className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-rose-600 rounded-xl transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {reports.length === 0 && !loading && (
                        <div className="p-32 text-center">
                            <FileText className="mx-auto h-16 w-16 text-slate-200 mb-6" />
                            <h3 className="text-xl font-black text-slate-800 dark:text-white">No reports found</h3>
                            <p className="text-slate-400 font-medium">There are currently no incidents reported by citizens.</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Reports;
