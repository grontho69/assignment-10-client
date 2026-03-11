import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { Menu, X, LogOut, Leaf, Sun, Moon, LayoutDashboard, Bell, Trash2 } from "lucide-react";
import MyContainer from "./MyContainer";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNotifications } from "../context/NotificationContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const { user, logoutUser } = useContext(AuthContext);
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
        { name: "All Issues", path: "/all-issues" },
        { name: "Dashboard", path: "/dashboard" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Issues", path: "/issues" },
      ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-colors">
      <MyContainer>
        <div className="flex items-center justify-between h-16 text-gray-800 dark:text-gray-100">
          <Link to="/" className="flex items-center gap-2 group">
            <Leaf className="h-8 w-8 text-green-600 group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-xl tracking-tight">EcoReport</span>
          </Link>

          {}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? "text-green-600 bg-green-50 dark:bg-green-900/20"
                      : "opacity-70 hover:opacity-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleTheme} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                title="Toggle Theme"
              >
                <Sun className="h-5 w-5 block dark:hidden" />
                <Moon className="h-5 w-5 hidden dark:block" />
              </button>

              {user && (
                <div className="relative">
                  <button 
                    onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); markAsRead(); }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors relative"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                    )}
                  </button>

                  <AnimatePresence>
                    {notifOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-xl z-50 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b dark:border-gray-700 flex justify-between items-center">
                          <h4 className="font-bold text-sm">Notifications</h4>
                          <button onClick={clearNotifications} className="text-[10px] uppercase font-bold text-gray-400 hover:text-red-500">Clear All</button>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.length > 0 ? (
                            notifications.map((n, i) => (
                              <div key={i} className="px-4 py-3 border-b dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <p className="text-sm text-gray-800 dark:text-gray-200">{n.message}</p>
                                <p className="text-[10px] text-gray-400 mt-1">{new Date(n.timestamp || Date.now()).toLocaleTimeString()}</p>
                              </div>
                            ))
                          ) : (
                            <div className="p-8 text-center text-gray-400">
                              <Bell className="h-8 w-8 mx-auto mb-2 opacity-20" />
                              <p className="text-sm">No new notifications</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {!user ? (
                <div className="flex items-center gap-4 ml-2">
                  <Link to="/login" className="text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors">Login</Link>
                  <Link to="/register" className="px-5 py-2 rounded-xl bg-green-600 text-white text-sm font-bold shadow-lg shadow-green-200 dark:shadow-none hover:bg-green-700 hover:-translate-y-0.5 transition-all">
                    Register
                  </Link>
                </div>
              ) : (
                <div className="relative">
                  <div 
                    className="flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                  >
                    <img
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${user.name}`}
                      alt="profile"
                      className="h-8 w-8 rounded-lg border-2 border-green-500 shadow-sm"
                    />
                    <div className="hidden lg:block text-left">
                      <p className="text-xs font-bold leading-tight truncate max-w-[100px]">{user.name}</p>
                      <p className="text-[10px] text-gray-400 leading-tight uppercase font-black">{user.role}</p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-xl z-50 overflow-hidden"
                      >
                        <div className="px-4 py-4 bg-gray-50 dark:bg-gray-800/50 border-b dark:border-gray-700">
                          <p className="text-sm font-bold truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <div className="p-2">
                          <Link 
                            to="/dashboard" 
                            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setProfileOpen(false)}
                          >
                            <LayoutDashboard size={16} className="text-gray-400" /> My Dashboard
                          </Link>
                          <button
                            onClick={logout}
                            className="flex items-center gap-3 px-3 py-2.5 w-full text-red-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors text-sm font-bold rounded-xl"
                          >
                            <LogOut size={16} /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button onClick={handleTheme} className="p-2">
              <Sun className="h-5 w-5 block dark:hidden" />
              <Moon className="h-5 w-5 hidden dark:block" />
            </button>
            <button onClick={() => setOpen(!open)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {}
        <AnimatePresence>
          {open && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden mt-2 overflow-hidden border-t dark:border-gray-700"
            >
              <div className="flex flex-col gap-2 py-6 px-2">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => `px-4 py-3 rounded-xl text-lg font-bold transition-colors ${
                      isActive ? "bg-green-50 text-green-600 dark:bg-green-900/20" : ""
                    }`}
                  >
                    {item.name}
                  </NavLink>
                ))}

                {!user ? (
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <Link to="/login" onClick={() => setOpen(false)} className="btn btn-outline border-gray-200 dark:border-gray-700">Login</Link>
                    <Link to="/register" onClick={() => setOpen(false)} className="btn btn-primary bg-green-600 border-none shadow-lg shadow-green-200">Register</Link>
                  </div>
                ) : (
                  <div className="mt-8 pt-8 border-t dark:border-gray-700">
                    <div className="flex items-center gap-4 px-2 mb-6">
                      <img src={user.photoURL} alt="" className="w-12 h-12 rounded-xl border-2 border-green-500" />
                      <div>
                          <p className="font-extrabold">{user.name}</p>
                          <p className="text-xs text-gray-500 font-medium">{user.email}</p>
                      </div>
                    </div>
                    <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full text-red-500 font-extrabold bg-rose-50 dark:bg-rose-900/10 rounded-xl transition-colors">
                      <LogOut size={20} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </MyContainer>
    </nav>
  );
};

export default Navbar;
