import React, { useEffect, useState } from "react";
import DashboardLayout from "../features/dashboard/components/DashboardLayout";
import api from "../services/api";
import { Search, Shield, User, Mail, ShieldAlert } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (e) { toast.error("Access Forbidden"); }
  };
  useEffect(() => { fetchUsers(); }, []);

  const handleUpdateRole = async (id, role) => {
    try {
      if (role === 'admin') {
        await api.patch(`/users/make-admin/${id}`);
      } else {
        await api.patch(`/users/${id}/role`, { role });
      }
      toast.success("Identity Updated");
      fetchUsers();
    } catch (e) { 
        toast.error(e.response?.data?.message || "Revision Failed"); 
    }
  };

  const filtered = users.filter(u => u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
       <header className="mb-12 flex items-center justify-between">
            <div>
                <motion.h1 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Citizen <span className="text-emerald-500">Registry</span></motion.h1>
                <p className="text-slate-500 dark:text-gray-400 mt-2 font-medium">Verify and authorize community members.</p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 px-6 py-3 rounded-2xl flex items-center gap-3 border border-emerald-100 dark:border-emerald-800">
                <Shield size={20} className="text-emerald-600" />
                <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">{users.length} Registered</span>
            </div>
        </header>

        <div className="bg-white dark:bg-gray-900 rounded-[3.5rem] shadow-sm border border-slate-50 dark:border-gray-800 overflow-hidden">
            <div className="p-10 border-b dark:border-gray-800">
                <div className="relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={24} />
                    <input 
                        className="w-full h-18 bg-slate-50 dark:bg-gray-800 rounded-[2rem] pl-16 pr-8 font-bold outline-none ring-offset-bg focus:ring-2 focus:ring-emerald-500/20 transition-all text-lg" 
                        placeholder="Search by name or email..." 
                        value={search} onChange={(e) => setSearch(e.target.value)} 
                    />
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 dark:bg-gray-800/30">
                            <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Identity</th>
                            <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Access Level</th>
                            <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(u => (
                            <tr key={u._id} className="border-b dark:border-gray-800 hover:bg-slate-50/30 dark:hover:bg-gray-800/30 transition-colors">
                                <td className="p-8">
                                    <div className="flex items-center gap-4">
                                        <img src={u.photoURL || `https://ui-avatars.com/api/?name=${u.name}`} className="w-12 h-12 rounded-2xl object-cover shadow-sm" alt="" />
                                        <div>
                                            <p className="font-black text-slate-800 dark:text-white uppercase text-xs tracking-wider">{u.name}</p>
                                            <p className="text-xs text-slate-400 font-medium flex items-center gap-2 mt-1"><Mail size={12} /> {u.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-8">
                                    <div className="relative inline-block w-48">
                                        <select 
                                            value={u.role || 'user'} 
                                            onChange={(e) => handleUpdateRole(u._id, e.target.value)}
                                            className="w-full h-12 bg-slate-100 dark:bg-gray-800 border-none rounded-xl px-4 font-black text-[10px] uppercase tracking-widest text-emerald-600 appearance-none outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        >
                                            <option value="user">Citizen (User)</option>
                                            <option value="organization">Organization</option>
                                            <option value="researcher">Researcher</option>
                                            <option value="admin">System Admin</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <ShieldAlert size={14} className="text-emerald-600" />
                                        </div>
                                    </div>
                                </td>
                                <td className="p-8">
                                    <span className="text-xs font-medium text-slate-400">
                                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' }) : 'Jan 2024'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {filtered.length === 0 && (
                <div className="p-20 text-center">
                    <User className="mx-auto text-slate-200 mb-4" size={48} />
                    <p className="text-slate-400 font-medium">No citizens matching your search.</p>
                </div>
            )}
        </div>
    </DashboardLayout>
  );
};
export default Users;
