import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { Menu, X, LogOut, Leaf, Sun, Moon, LayoutDashboard } from "lucide-react";
import MyContainer from "./MyContainer";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const { user, logoutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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

  const authNavLinks = [
    { name: "Home", path: "/" },
    { name: "All Issues", path: "/all-issues" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const guestNavLinks = [
    { name: "Home", path: "/" },
    { name: "Issues", path: "/issues" },
  ];

  const navLinks = user ? authNavLinks : guestNavLinks;

  return (
    <nav className="sticky top-0 z-50 border-b bg-white dark:bg-gray-900 transition-colors">
      <MyContainer>
        <div className="flex items-center justify-between h-16 text-gray-800 dark:text-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="font-bold text-xl">EcoReport</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={`text-sm tracking-wide ${
                  isActive(item.path)
                    ? "font-bold text-green-600"
                    : "opacity-70 hover:opacity-100 transition-opacity"
                }`}
              >
                {item.name}
              </NavLink>
            ))}

            <button onClick={handleTheme} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <Sun className="h-5 w-5 block dark:hidden" />
              <Moon className="h-5 w-5 hidden dark:block" />
            </button>

            {!user ? (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-medium">Login</Link>
                <Link to="/register" className="px-5 py-2 rounded-full bg-green-600 text-white text-sm font-semibold shadow-sm hover:bg-green-700 transition-all">
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative">
                <div 
                  className="flex items-center gap-2 cursor-pointer p-1 pr-3 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.name}`}
                    alt="profile"
                    className="h-8 w-8 rounded-full border-2 border-green-500 shadow-sm"
                  />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b dark:border-gray-700">
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{user.role}</p>
                      <p className="text-sm font-medium truncate">{user.email}</p>
                    </div>
                    <Link 
                      to="/dashboard" 
                      className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setProfileOpen(false)}
                    >
                      <LayoutDashboard size={16} /> My Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors text-sm font-medium"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button onClick={handleTheme}>
              <Sun className="h-5 w-5 block dark:hidden" />
              <Moon className="h-5 w-5 hidden dark:block" />
            </button>
            <button onClick={() => setOpen(!open)} className="p-2">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-3 pb-6 border-t dark:border-gray-700 animate-in slide-in-from-top-1">
            <div className="flex flex-col gap-4 pt-4 px-2">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`text-lg font-medium ${isActive(item.path) ? "text-green-600" : ""}`}
                >
                  {item.name}
                </NavLink>
              ))}

              {!user ? (
                <div className="flex flex-col gap-3 mt-4">
                  <Link to="/login" onClick={() => setOpen(false)} className="btn btn-outline border-green-600 text-green-600">Login</Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="btn btn-primary bg-green-600 border-none">Register</Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4 mt-4 pt-4 border-t dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="font-bold">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button onClick={logout} className="flex items-center gap-2 text-red-500 font-bold">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </MyContainer>
    </nav>
  );
};

export default Navbar;
