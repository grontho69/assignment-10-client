import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'
import { RotateLoader } from 'react-spinners';
import { Download } from 'lucide-react';
import { contributionService } from '../services/contribution.service';

const MyContributions = () => {
    const { user } = useAuth();
    const [myContributions, setMyContributions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContributions = async () => {
            if (user?.email) {
                try {
                    const data = await contributionService.getMyContributions();
                    setMyContributions(data);
                } catch (err) { console.error(err); } finally { setLoading(false); }
            }
        };
        fetchContributions();
    }, [user]);

    if (loading) return <div className='h-screen flex items-center justify-center'><RotateLoader color="#10B981" /></div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-4xl font-black mb-12">My Contributions</h2>
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm p-8 border dark:border-gray-800">
                <table className="table w-full">
                    <thead><tr><th>Issue</th><th>Category</th><th>Amount</th><th>Date</th></tr></thead>
                    <tbody>
                        {myContributions.map((item) => (
                            <tr key={item._id}>
                                <td>{item.issueTitle}</td>
                                <td>{item.category}</td>
                                <td>${item.amount}</td>
                                <td>{new Date(item.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default MyContributions;
