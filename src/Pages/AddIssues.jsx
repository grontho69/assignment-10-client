import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { issueService } from '../services/issue.service';
import { useNavigate } from 'react-router';

const AddIssues = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    
    // Ensure numeric amount
    const amt = parseFloat(form.amount.value);
    if (isNaN(amt)) {
       toast.error("Invalid amount");
       setLoading(false);
       return;
    }

    const issueData = {
        title: form.title.value,
        image: form.image.value,
        location: form.location.value,
        category: form.category.value,
        amount: amt,
        description: form.description.value,
        email: user.email,
        userName: user.name || user.displayName || "Citizen",
        userPhoto: user.photoURL || `https://ui-avatars.com/api/?name=${user.name || 'User'}`,
        status: 'Pending'
    };

    try {
        await issueService.createIssue(issueData);
        toast.success("Issue Synchronized Successfully!");
        navigate('/my-issues');
    } catch (err) { 
        console.error("Transmission Error:", err.response?.data || err);
        const serverMsg = err.response?.data?.message || err.response?.data?.errors?.[0]?.message;
        toast.error(serverMsg || "Transmission Failed");
    } finally { 
        setLoading(false); 
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl text-slate-800 dark:text-white">
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">Report <span className="text-emerald-500">Concern</span></h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs italic">Initiate a new environmental resolution request</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-900 p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] shadow-2xl border border-slate-50 dark:border-gray-800">
        <div className="space-y-6">
            <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Manifestation Title</label>
                <input name="title" required placeholder="Short descriptive title" className="w-full h-16 bg-slate-50 dark:bg-gray-800 p-6 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 border dark:border-gray-700 mt-2 font-bold" />
            </div>
            <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Visual Evidence (URL)</label>
                <input name="image" required placeholder="Public link to incident photo" className="w-full h-16 bg-slate-50 dark:bg-gray-800 p-6 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 border dark:border-gray-700 mt-2 font-bold" />
            </div>
            <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Geographical Nexus</label>
                <input name="location" required placeholder="Area, Landmark or Street" className="w-full h-16 bg-slate-50 dark:bg-gray-800 p-6 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 border dark:border-gray-700 mt-2 font-bold" />
            </div>
        </div>

        <div className="space-y-6">
            <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Sector Classification</label>
                <select name="category" className="w-full h-16 bg-slate-50 dark:bg-gray-800 px-6 rounded-2xl outline-none border dark:border-gray-700 mt-2 font-bold appearance-none">
                    <option>Waste Management</option>
                    <option>Broken Infrastructure</option>
                    <option>Waterlogging</option>
                    <option>Air Quality</option>
                    <option>Other</option>
                </select>
            </div>
            <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Resource Estimation ($)</label>
                <input name="amount" type="number" required min="0" placeholder="Estimated budget impact" className="w-full h-16 bg-slate-50 dark:bg-gray-800 p-6 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 border dark:border-gray-700 mt-2 font-bold" />
            </div>
            <div className="md:row-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Situation Log</label>
                <textarea name="description" required placeholder="Detailed description of the environmental incident..." className="w-full h-16 bg-slate-50 dark:bg-gray-800 p-6 rounded-2xl outline-none border dark:border-gray-700 mt-2 font-bold min-h-[4rem]"></textarea>
            </div>
        </div>

        <button 
            disabled={loading} 
            className="md:col-span-2 h-20 bg-slate-900 dark:bg-emerald-600 text-white font-black rounded-[2rem] text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-emerald-500/20"
        >
            {loading ? <span className="animate-spin border-4 border-white/20 border-t-white w-6 h-6 rounded-full"></span> : 'Broadcast Report'}
        </button>
      </form>
    </div>
  );
};
export default AddIssues;
