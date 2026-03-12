import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../features/dashboard/components/DashboardLayout';
import { User, Bell, Shield, Palette, Globe, ChevronRight, Save } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Settings = () => {
    const { user, updateUserNameAndPhoto, refreshUser } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [photo, setPhoto] = useState(user?.photoURL || '');
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
            // Update Firebase
            await updateUserNameAndPhoto(name, photo);
            
            // Update MongoDB
            const res = await api.patch('/users/profile', { name, photoURL: photo });
            
            if (res.data.success) {
                toast.success("Profile updated successfully!");
                await refreshUser();
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-5xl">
                <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-10 tracking-tight">System <span className="text-emerald-500">Settings</span></h1>
                
                <div className="bg-white dark:bg-gray-900 rounded-[3rem] md:rounded-[4rem] shadow-sm border border-slate-50 dark:border-gray-800 overflow-hidden">
                    <div className="p-8 md:p-14 border-b dark:border-gray-800 flex flex-col xl:flex-row items-start gap-12 bg-slate-50/50 dark:bg-gray-800/20">
                        <div className="relative group">
                            <img 
                                src={photo || `https://ui-avatars.com/api/?name=${name}`} 
                                className="w-32 h-32 md:w-44 md:h-44 rounded-[3rem] md:rounded-[4rem] object-cover ring-8 ring-white dark:ring-gray-800 shadow-2xl transition-transform group-hover:scale-105" 
                                alt="" 
                            />
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg border-4 border-white dark:border-gray-900">
                                <User size={18} />
                            </div>
                        </div>

                        <div className="flex-1 w-full">
                            <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Full Identity</label>
                                        <input 
                                            value={name} 
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full h-16 bg-white dark:bg-gray-800 rounded-2xl px-6 font-bold outline-none ring-2 ring-transparent focus:ring-emerald-500/20 transition-all border dark:border-gray-700 mt-2" 
                                            placeholder="Display Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Profile Matrix (URL)</label>
                                        <input 
                                            value={photo} 
                                            onChange={(e) => setPhoto(e.target.value)}
                                            className="w-full h-16 bg-white dark:bg-gray-800 rounded-2xl px-6 font-bold outline-none ring-2 ring-transparent focus:ring-emerald-500/20 transition-all border dark:border-gray-700 mt-2" 
                                            placeholder="Avatar Photo URL"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-8 flex flex-col justify-end">
                                    <div className="p-6 bg-slate-100/50 dark:bg-gray-800 rounded-[2rem] border border-dashed border-slate-200 dark:border-gray-700">
                                        <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">E-mail Access Points</p>
                                        <p className="text-lg font-black text-slate-800 dark:text-white truncate">{user?.email}</p>
                                        <span className="inline-block mt-3 px-3 py-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">{user?.role} Authority</span>
                                    </div>
                                    <button 
                                        type="submit"
                                        disabled={updating || (name === user?.name && photo === user?.photoURL)}
                                        className="h-16 px-10 bg-emerald-600 disabled:bg-slate-200 dark:disabled:bg-gray-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-xl shadow-emerald-500/10 active:scale-95"
                                    >
                                        {updating ? <span className="animate-spin border-2 border-white/20 border-t-white w-4 h-4 rounded-full"></span> : <Save size={18} />} 
                                        {updating ? 'Updating Nexus...' : 'Commit Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {settingsSections.map((s, i) => (
                            <button key={i} className="flex items-center justify-between p-8 hover:bg-slate-50 dark:hover:bg-gray-800/80 rounded-[2.5rem] transition-all group border border-slate-50 dark:border-gray-800 shadow-sm md:shadow-none">
                                <div className="flex items-center gap-6 text-left">
                                    <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-emerald-500/20">
                                        <s.icon size={26} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-800 dark:text-white uppercase text-xs tracking-wider">{s.title}</h3>
                                        <p className="text-slate-400 font-bold text-[11px] mt-1 line-clamp-1">{s.desc}</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-slate-200 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
export default Settings;
