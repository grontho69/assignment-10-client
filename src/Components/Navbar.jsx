import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { Menu, X, LogOut, Leaf, Sun, Moon, LayoutDashboard, Bell, History, HelpCircle, PlusCircle, Settings, FileText } from "lucide-react";
import MyContainer from "./MyContainer";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNotifications } from "../context/NotificationContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const { user, logoutUser } = useAuth();
  const { notifications, unreadCount, markAsRead, clearNotifications } = useNotifications();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
  };

  const logout = () => {
    logoutUser()
      .then(() => {
        toast.success("Logout successful");
        setOpen(false);
        setProfileOpen(false);
      })
      .catch((e) => toast.error(e.message));
  };

  const navLinks = user 
    ? [
        { name: "Home", path: "/" },
        { name: "Issues", path: "/all-issues" },
        { name: "Add Issue", path: "/add-issue" },
        { name: "My Issues", path: "/my-issues" },
        { name: "My Contributions", path: "/my-contribution" },
        ...(user.role === 'admin' ? [{ name: "Admin Panel", path: "/dashboard" }] : []),
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Issues", path: "/all-issues" },
      ];

  useEffect(() => {
    const routeTitles = {
        "/": "Home | EcoReport",
        "/all-issues": "All Issues | EcoReport",
        "/add-issue": "Report Issue | EcoReport",
        "/my-issues": "My Issues | EcoReport",
        "/my-contribution": "My Contributions | EcoReport",
        "/dashboard": "Dashboard | EcoReport",
        "/login": "Login | EcoReport",
        "/register": "Register | EcoReport"
    };
    let title = routeTitles[location.pathname] || "EcoReport";
    if (location.pathname.startsWith('/issue-details')) title = "Issue Details | EcoReport";
    document.title = title;
  }, [location]);

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-colors">
      <MyContainer>
        <div className="flex items-center justify-between h-16 text-gray-800 dark:text-gray-100">
          <Link to="/" className="flex items-center gap-2 group">
            <Leaf className="h-8 w-8 text-emerald-600 group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-xl tracking-tight">EcoReport</span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                    isActive
                      ? "text-emerald-00 bg-emerald-50 dark:bg-emerald-900/20"
                      : "opacity-60 hover:opacity-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleTheme} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                <Sun className="h-5 w-5 block dark:hidden" />
                <Moon className="h-5 w-5 hidden dark:block" />
              </button>

              {user && (
                <div className="relative">
                  <button 
                    onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors relative"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></span>
                    )}
                  </button>

                  <AnimatePresence>
                    {notifOpen && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl border dark:border-gray-800 overflow-hidden z-[60]"
                      >
                        <div className="p-6 border-b dark:border-gray-800 flex justify-between items-center bg-slate-50/50 dark:bg-gray-800/30">
                          <h3 className="font-black text-xs uppercase tracking-widest text-slate-400">Notifications</h3>
                          <button onClick={() => clearNotifications()} className="text-[10px] font-bold text-emerald-500 hover:text-emerald-600">Clear All</button>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto">
                          {notifications.length === 0 ? (
                            <div className="p-10 text-center">
                              <Bell className="mx-auto text-slate-200 mb-3" size={32} />
                              <p className="text-xs text-slate-400 font-medium">All caught up!</p>
                            </div>
                          ) : (
                            notifications.map((n) => (
                              <div key={n.id} className={`p-6 border-b dark:border-gray-800 last:border-0 hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer ${!n.read ? 'bg-emerald-50/20' : ''}`} onClick={() => markAsRead(n.id)}>
                                <div className="flex gap-4">
                                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? 'bg-emerald-500' : 'bg-transparent'}`}></div>
                                  <div>
                                    <p className="text-xs font-bold text-slate-800 dark:text-white leading-relaxed">{n.text}</p>
                                    <p className="text-[10px] text-slate-400 mt-2 font-medium">{new Date(n.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {user ? (
                <div className="relative ml-2">
                   <div 
                    className="flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                  >
                    <img
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${user.name}`}
                      alt="profile"
                      className="h-9 w-9 rounded-xl border-2 border-emerald-500 shadow-sm"
                    />
                    <div className="hidden lg:block text-left">
                      <p className="text-xs font-black leading-tight truncate max-w-[100px]">{user.name}</p>
                      <p className="text-[9px] text-emerald-600 leading-tight uppercase font-black">{user.role}</p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl border dark:border-gray-800 overflow-hidden z-[60]"
                      >
                         <div className="p-6 bg-slate-50/50 dark:bg-gray-800/30 border-b dark:border-gray-800">
                           <p className="font-black text-slate-800 dark:text-white truncate">{user.name}</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{user.role}</p>
                         </div>
                         <div className="p-2">
                            <Link to="/reports" className="flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-xl transition-all group" onClick={() => setProfileOpen(false)}>
                              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                                <FileText size={16} />
                              </div>
                              <span className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-widest">Dashboard</span>
                            </Link>
                            <Link to="/settings" className="flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-xl transition-all group" onClick={() => setProfileOpen(false)}>
                              <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-gray-800 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                                <Settings size={16} />
                              </div>
                              <span className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-widest">Settings</span>
                            </Link>
                            <button 
                              onClick={() => { logout(); setProfileOpen(false); }}
                              className="w-full flex items-center gap-3 p-4 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-all group text-left"
                            >
                              <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/20 flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
                                <LogOut size={16} />
                              </div>
                              <span className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-widest">Sign Out</span>
                            </button>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-3 ml-2">
                   <Link to="/login" className="text-xs font-black uppercase text-slate-500 hover:text-emerald-600 px-2 transition-colors">Login</Link>
                   <Link to="/register" className="px-5 py-2.5 rounded-2xl bg-slate-900 dark:bg-emerald-600 text-white text-xs font-black shadow-lg shadow-slate-200 dark:shadow-none hover:bg-black transition-all">
                     Register
                   </Link>
                </div>
              )}
            </div>
          </div>

            {/* Mobile Header Icons & Toggle */}
            <div className="flex md:hidden items-center gap-1">
              <button 
                onClick={handleTheme} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                <Sun className="h-5 w-5 block dark:hidden" />
                <Moon className="h-5 w-5 hidden dark:block" />
              </button>

              {user && (
                <div className="relative">
                  <button 
                    onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); setOpen(false); }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors relative"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                    )}
                  </button>
                </div>
              )}

              <button
                onClick={() => { setOpen(!open); setNotifOpen(false); setProfileOpen(false); }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors ml-1"
              >
                {open ? <X className="h-6 w-6 text-emerald-600" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu drawer */}
          <AnimatePresence>
            {open && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed top-0 right-0 h-screen w-80 bg-white dark:bg-gray-950 z-50 p-8 shadow-2xl md:hidden flex flex-col"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-6 w-6 text-emerald-600" />
                      <span className="font-bold text-lg dark:text-white">EcoReport</span>
                    </div>
                    <button onClick={() => setOpen(false)} className="p-2 bg-slate-50 dark:bg-gray-800 rounded-xl">
                      <X size={20} />
                    </button>
                  </div>

                  {user && (
                    <div className="mb-10 p-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-[2rem] border border-emerald-100 dark:border-emerald-800/30">
                      <div className="flex items-center gap-4">
                        <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.name}`} className="w-12 h-12 rounded-2xl border-2 border-white dark:border-gray-900 shadow-sm" alt="" />
                        <div>
                          <p className="font-black text-slate-800 dark:text-white text-sm">{user.name}</p>
                          <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">{user.role}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-2 flex-grow">
                    {navLinks.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) => `px-6 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all ${
                          isActive
                            ? "text-emerald-00 bg-emerald-100 dark:bg-emerald-900/40"
                            : "text-slate-500 hover:bg-slate-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>

                  {user ? (
                    <button
                      onClick={() => { logout(); setOpen(false); }}
                      className="mt-auto flex items-center justify-center gap-3 w-full h-16 bg-rose-50 dark:bg-rose-950/20 text-rose-500 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-rose-100 transition-all"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  ) : (
                    <div className="mt-auto flex flex-col gap-3">
                      <Link to="/login" onClick={() => setOpen(false)} className="h-14 w-full flex items-center justify-center font-black text-xs uppercase tracking-widest text-slate-500">Login</Link>
                      <Link to="/register" onClick={() => setOpen(false)} className="h-16 w-full bg-slate-900 dark:bg-emerald-600 text-white flex items-center justify-center font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl">Join Now</Link>
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>

        </MyContainer>
      </nav>
    );
  };

export default Navbar;
