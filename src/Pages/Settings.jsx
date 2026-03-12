import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../features/dashboard/components/DashboardLayout';
import { User, Bell, Shield, Palette, Globe, ChevronRight, Save } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Settings = () => {
    const { user, setUser } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [updating, setUpdating] = useState(false);
    
    const settingsSections = [
        { icon: Bell, title: 'Notifications', desc: 'Manage your alert preferences' },
        { icon: Shield, title: 'Security', desc: 'Update password and login methods' },
        { icon: Palette, title: 'Appearance', desc: 'Switch between dark and light modes' },
        { icon: Globe, title: 'Language', desc: 'Change your preferred language' },
    ];

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const res = await api.patch('/users/profile', { name });
            if (res.data.success) {
                toast.success("Profile updated successfully!");
                // Optionally update local user state if needed, or rely on reload
                // For better UX, we can update the user context
                setUser(prev => ({ ...prev, name }));
            }
        } catch (err) {
            toast.error("Failed to update profile");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-black text-slate-800 dark:text-white mb-10 tracking-tight">System <span className="text-emerald-500">Settings</span></h1>
                
                <div className="bg-white dark:bg-gray-900 rounded-[3.5rem] shadow-sm border border-slate-50 dark:border-gray-800 overflow-hidden">
                    <div className="p-10 border-b dark:border-gray-800 flex items-center gap-8 bg-slate-50/50 dark:bg-gray-800/20">
                        <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.name}`} className="w-24 h-24 rounded-[2rem] object-cover ring-4 ring-white dark:ring-gray-800 shadow-xl" alt="" />
                        <div className="flex-1">
                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Display Name</label>
                                    <div className="flex gap-4 mt-2">
                                        <input 
                                            value={name} 
                                            onChange={(e) => setName(e.target.value)}
                                            className="h-14 flex-1 bg-white dark:bg-gray-800 rounded-2xl px-6 font-bold outline-none ring-2 ring-transparent focus:ring-emerald-500/20 transition-all border dark:border-gray-700" 
                                            placeholder="Your Name"
                                        />
                                        <button 
                                            type="submit"
                                            disabled={updating || name === user?.name}
                                            className="h-14 px-8 bg-emerald-600 disabled:bg-slate-200 dark:disabled:bg-gray-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all hover:scale-105"
                                        >
                                            <Save size={18} /> {updating ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="mt-4 flex items-center gap-4">
                                <p className="text-slate-500 font-medium text-lg">{user?.email}</p>
                                <span className="inline-block px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">{user?.role} Access</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {settingsSections.map((s, i) => (
                            <button key={i} className="flex items-center justify-between p-8 hover:bg-slate-50 dark:hover:bg-gray-800/50 rounded-[2.5rem] transition-all group border border-transparent hover:border-slate-100 dark:hover:border-gray-800">
                                <div className="flex items-center gap-6 text-left">
                                    <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <s.icon className="text-slate-400 group-hover:text-emerald-500" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-800 dark:text-white uppercase text-xs tracking-wider">{s.title}</h3>
                                        <p className="text-slate-400 font-medium text-[11px] mt-1">{s.desc}</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-slate-200 group-hover:text-emerald-500" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
export default Settings;
