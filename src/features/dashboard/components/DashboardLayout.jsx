import React, { useState } from 'react';
import { NavLink, Link } from 'react-router';
import { LayoutDashboard, Users, Activity, FileText, Settings, LogOut, ChevronRight, Menu } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ children }) => {
  const { user, logoutUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Citizens', path: '/users', icon: Users, role: 'admin' },
    { name: 'Sustainability', path: '/analytics', icon: Activity },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b dark:border-gray-800 z-40 flex items-center justify-between px-6 shadow-sm">
        <Link to="/" className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="font-black text-lg tracking-tighter dark:text-white uppercase">ECO.HUB</span>
        </Link>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-slate-50 dark:bg-gray-800 rounded-xl hover:bg-slate-100 transition-colors">
            <Menu size={20} className="text-slate-600 dark:text-slate-300" />
        </button>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsSidebarOpen(false)}
               className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[50] lg:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[60] w-[280px] bg-white dark:bg-gray-900 border-r dark:border-gray-800 shadow-2xl lg:hidden"
            >
              <div className="p-8 h-full flex flex-col">
                  <Link to="/" className="flex items-center gap-2 mb-12 px-2" onClick={() => setIsSidebarOpen(false)}>
                      <span className="w-4 h-4 rounded-full bg-emerald-500"></span>
                      <span className="font-black text-xl tracking-tighter dark:text-white uppercase">ECO.HUB</span>
                  </Link>
                  <nav className="flex-grow space-y-2">
                      {menuItems.filter(item => !item.role || (user && user.role === item.role)).map(item => (
                          <NavLink key={item.path} to={item.path} onClick={() => setIsSidebarOpen(false)} className={({ isActive }) => `flex items-center justify-between p-4 rounded-2xl group transition-all ${isActive ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200 dark:shadow-none' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-gray-800'}`}>
                              <div className="flex items-center gap-4">
                                  <item.icon size={20} />
                                  <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
                              </div>
                              <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity`} />
                          </NavLink>
                      ))}
                  </nav>
                  <button onClick={() => logoutUser()} className="p-4 mt-8 flex items-center gap-4 text-rose-500 font-black text-xs uppercase tracking-widest hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-2xl transition-all">
                      <LogOut size={20} /> Sign Out
                  </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Static sidebar for large screens */}
      <aside className="hidden lg:flex w-80 bg-white dark:bg-gray-900 border-r dark:border-gray-800 flex-col sticky top-0 h-screen">
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
                  <LogOut size={20} /> Sign Out
              </button>
          </div>
      </aside>

      <main className="flex-1 p-6 lg:p-12 overflow-y-auto mt-16 lg:mt-0">{children}</main>
    </div>
  );
};
export default DashboardLayout;
