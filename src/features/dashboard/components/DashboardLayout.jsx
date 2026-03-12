import React, { useState } from 'react';
import { NavLink, Link } from 'react-router';
import { LayoutDashboard, Users, Activity, FileText, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const DashboardLayout = ({ children }) => {
  const { user, logoutUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Citizens', path: '/users', icon: Users, role: 'admin' },
    { name: 'Sustainability', path: '/analytics', icon: Activity },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors">
      <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-900 border-r dark:border-gray-800 transition-transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:block`}>
        <div className="p-10 h-full flex flex-col">
            <Link to="/" className="flex items-center gap-2 mb-16 px-4">
                <span className="w-4 h-4 rounded-full bg-emerald-500"></span>
                <span className="font-black text-xl tracking-tighter dark:text-white uppercase">ECO.HUB</span>
            </Link>
            <nav className="flex-grow space-y-2">
                {menuItems.filter(item => !item.role || (user && user.role === item.role)).map(item => (
                    <NavLink key={item.path} to={item.path} className={({ isActive }) => `flex items-center justify-between p-4 rounded-2xl group transition-all ${isActive ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200 dark:shadow-none' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-gray-800'}`}>
                        <div className="flex items-center gap-4">
                            <item.icon size={20} />
                            <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
                        </div>
                        <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity`} />
                    </NavLink>
                ))}
            </nav>
            <button onClick={() => logoutUser()} className="p-4 mt-12 flex items-center gap-4 text-rose-500 font-black text-xs uppercase tracking-widest hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-2xl transition-all">
                <LogOut size={20} /> Sign Out Hub
            </button>
        </div>
      </aside>
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">{children}</main>
    </div>
  );
};
export default DashboardLayout;
