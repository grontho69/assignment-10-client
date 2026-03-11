import React, { useState } from 'react';
import { Search, User, ChevronDown, Menu, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationDropdown from './NotificationDropdown';
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const Topbar = () => {
  const { user, logoutUser } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        toast.success("Logout successful");
        navigate('/login');
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <header className="fixed top-0 right-0 left-64 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40 transition-all duration-300">
      <div className="h-full px-8 flex items-center justify-between">
        {}
        <div className="relative w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search reports or contributors..." 
            className="w-full pl-12 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none text-slate-700 placeholder:text-slate-400"
          />
        </div>

        {}
        <div className="flex items-center space-x-6">
          <NotificationDropdown />

          <div className="h-8 w-px bg-slate-200"></div>

          <div className="relative">
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 p-1.5 hover:bg-slate-100 rounded-2xl transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-200 overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <div className="hidden lg:block text-left pr-2">
                <p className="text-sm font-extrabold text-slate-800">{user?.name || 'User'}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{user?.role}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${showProfile ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden"
                >
                  <div className="py-2">
                    <button className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-3">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className="font-medium">View Profile</span>
                    </button>
                    <button className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-3">
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span className="font-medium">Account Settings</span>
                    </button>
                    <div className="h-px bg-slate-100 my-2 mx-4"></div>
                    <button 
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left text-sm text-rose-600 hover:bg-rose-50 flex items-center space-x-3 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-bold">Log Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
