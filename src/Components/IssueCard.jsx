import React, { useContext } from "react";
import { Link } from "react-router";
import { MapPin, DollarSign, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { issueService } from "../services/issue.service";
import { toast } from "react-toastify";

const IssueCard = ({ issue, onUpdate }) => {
  const { user } = useContext(AuthContext);
  if (!issue) return null;

  const handleApprove = async () => {
    try {
      const res = await issueService.approveIssue(issue._id);
      if (res.success) {
        toast.success("Issue approved!");
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      toast.error("Approval failed");
    }
  };

  const statusColors = {
    'Pending': 'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-500 border-amber-200 dark:border-amber-800',
    'Approved': 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-500 border-green-200 dark:border-green-800',
    'Resolved': 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-500 border-blue-200 dark:border-blue-800'
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 flex flex-col h-full">
      {}
      <div className="absolute top-4 left-4 z-10">
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusColors[issue.status || 'Pending']}`}>
          {issue.status || 'Pending'}
        </span>
      </div>

      {}
      <div className="relative h-56 overflow-hidden">
        <img
          src={issue.image || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800'}
          alt={issue.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-black uppercase tracking-tighter text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">
            {issue.category}
          </span>
          <span className="text-[10px] text-gray-400 font-bold">• {new Date(issue.date).toLocaleDateString()}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">
          {issue.title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed">
          {issue.description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-700/50 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center text-xs text-gray-400 font-medium mb-1">
              <MapPin className="w-3 h-3 mr-1" />
              {issue.location}
            </div>
            <div className="flex items-center text-green-600 dark:text-green-400 font-black">
              <DollarSign className="w-4 h-4" />
              <span className="text-lg">{issue.amount}</span>
            </div>
          </div>

          <Link to={`/issue-details/${issue._id}`}>
            <button className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-green-600 hover:text-white rounded-2xl transition-all duration-300 group/btn">
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {}
        {user?.role === 'admin' && issue.status !== 'Approved' && (
          <button 
            onClick={(e) => { e.preventDefault(); handleApprove(); }}
            className="mt-4 w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-200 dark:shadow-none"
          >
            <CheckCircle className="w-4 h-4" />
            Approve Report
          </button>
        )}
      </div>
    </div>
  );
};

export default IssueCard;
