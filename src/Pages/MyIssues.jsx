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
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchMyIssues = async () => {
    if (!user?.email) return;
    try {
      const res = await issueService.getMyIssues();
      const data = res?.result || res;
      setIssues(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to fetch issues");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMyIssues(); }, [user?.email]);

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-emerald-500" /></div>;

  const totalPages = Math.ceil(issues.length / itemsPerPage);
  const paginatedIssues = issues.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-12 text-slate-800 dark:text-white">My Reported Issues</h1>
      
      {issues.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm p-12 text-center border dark:border-gray-800 text-slate-500 font-medium">
            You haven't reported any issues yet.
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm p-8 border dark:border-gray-800 overflow-x-auto">
          <table className="table w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b dark:border-gray-800">
                  <th className="pb-4">Issue</th>
                  <th className="pb-4">Category</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Budget</th>
              </tr>
            </thead>
            <tbody>
              {paginatedIssues.map((issue) => (
                  <tr key={issue._id} className="border-b dark:border-gray-800/50 hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="py-4 font-bold text-slate-800 dark:text-white">{issue.title}</td>
                      <td className="py-4 text-slate-500 dark:text-gray-400">{issue.category}</td>
                      <td className="py-4">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              issue.status === 'Approved' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10' :
                              issue.status === 'Rejected' ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/10' :
                              'bg-amber-100 text-amber-600 dark:bg-amber-500/10'
                          }`}>
                              {issue.status}
                          </span>
                      </td>
                      <td className="py-4 font-bold text-slate-600 dark:text-gray-300">${issue.amount}</td>
                  </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                  <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 rounded-lg text-xs font-black uppercase tracking-widest disabled:opacity-50 hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
                  >
                      Prev
                  </button>
                  <span className="text-sm font-bold text-slate-500 dark:text-gray-400 mx-4">
                      {currentPage} / {totalPages}
                  </span>
                  <button 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 rounded-lg text-xs font-black uppercase tracking-widest disabled:opacity-50 hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
                  >
                      Next
                  </button>
              </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MyIssues
