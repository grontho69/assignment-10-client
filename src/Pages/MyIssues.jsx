import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Pencil, Trash2, X, Loader2 } from 'lucide-react'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { issueService } from '../services/issue.service'

const MyIssues = () => {
  const { user } = useAuth()
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true);

  const fetchMyIssues = async () => {
    if (!user?.email) return;
    try {
      const data = await issueService.getMyIssues();
      setIssues(data);
    } catch (error) {
      toast.error("Failed to fetch issues");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMyIssues(); }, [user?.email]);

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-emerald-500" /></div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-12">My Reported Issues</h1>
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm p-8 border dark:border-gray-800">
        <table className="table w-full">
          <thead>
            <tr><th>Issue</th><th>Category</th><th>Status</th><th>Budget</th></tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
                <tr key={issue._id}>
                    <td>{issue.title}</td>
                    <td>{issue.category}</td>
                    <td>{issue.status}</td>
                    <td>${issue.amount}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyIssues
