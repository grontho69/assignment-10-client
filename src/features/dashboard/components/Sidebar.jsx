import React from 'react';
import { NavLink } from 'react-router';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Settings, 
  Users, 
  Leaf,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: FileText, label: 'Reports', path: '/all-issues' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Users, label: 'Contributors', path: '/contributors' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

import { AuthContext } from '../../../context/AuthContext';

const Sidebar = () => {
  const { user, signOutFunc, setUser } = React.useContext(AuthContext);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Reports', path: '/all-issues' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    ...(user?.role === 'admin' ? [{ icon: Users, label: 'Users', path: '/users' }] : []),
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    signOutFunc().then(() => {
      setUser(null);
    });
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white border-r border-slate-800 z-50 transition-all duration-300">
      <div className="p-6 flex items-center space-x-3">
        <div className="bg-emerald-500 p-2 rounded-lg">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
          EcoReport
        </span>
      </div>

      <nav className="mt-6 px-4 space-y-2">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) => `
              flex items-center justify-between p-3 rounded-xl transition-all duration-200 group
              ${isActive 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
            `}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-8 left-0 w-full px-4">
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 p-3 w-full text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
