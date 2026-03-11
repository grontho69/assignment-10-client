import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { RotateLoader } from 'react-spinners';
import { Download } from 'lucide-react';
import { contributionService } from '../services/contribution.service';
import { toast } from 'react-toastify';

const MyContributions = () => {
    const { user } = useContext(AuthContext);
    const [myContributions, setMyContributions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContributions = async () => {
            if (user?.email) {
                try {
                    const data = await contributionService.getMyContributions();
                    setMyContributions(data);
                } catch (err) {
                    console.error("Error fetching contributions:", err);
                    toast.error("Failed to load contributions");
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchContributions();
    }, [user]);

    if (loading) {
        return (
            <div className='h-[80vh] flex items-center justify-center'>
                <RotateLoader color="#54b355" size={20} />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">My Cleanup Contributions</h2>
            <div className="card shadow-lg">
                <div className="card-content">
                    <div className="table-container overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="text-left p-4 text-xs font-bold uppercase tracking-wider">Issue Title</th>
                                    <th className="text-left p-4 text-xs font-bold uppercase tracking-wider">Category</th>
                                    <th className="text-left p-4 text-xs font-bold uppercase tracking-wider">Paid Amount</th>
                                    <th className="text-left p-4 text-xs font-bold uppercase tracking-wider">Date</th>
                                    <th className="text-center p-4 text-xs font-bold uppercase tracking-wider">Report</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myContributions.length > 0 ? (
                                    myContributions.map((item) => (
                                        <tr key={item._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="p-4 font-medium">{item.issueTitle}</td>
                                            <td className="p-4">
                                                <span className="badge badge-success text-[10px] font-bold">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="p-4 text-green-600 font-bold">
                                                ${item.amount}
                                            </td>
                                            <td className="p-4 text-sm text-gray-500">
                                                {new Date(item.date).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 text-center">
                                                <button 
                                                    className="btn btn-ghost btn-sm text-blue-500 hover:text-blue-700 p-2"
                                                    onClick={() => toast.info('Report generation coming soon!')}
                                                >
                                                    <Download className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center p-12 text-gray-500 italic">
                                            You haven't made any contributions yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyContributions;