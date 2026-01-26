import React, { useContext, useState } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { motion as Motion } from "motion/react";
import {
 Menu, X, Moon, Sun, LogOut, Leaf
} from "lucide-react";
import MyContainer from "./MyContainer";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { PacmanLoader } from "react-spinners";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const { user, setUser, signOutFunc, loading } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const logout = () => {
    signOutFunc()
      .then(() => {
        toast.success("Logout successful");
        setUser(null);
        setOpen(false);
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <Motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass sticky top-0 z-50 border-b border-cyan-500/20"
    >
      <MyContainer>
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600 dark:text-green-500" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">EcoReport</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={`text-sm ${isActive("/") ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"}`}
            >
              Home
            </NavLink>

            <NavLink
              to="/all-games"
              className={`text-sm ${isActive("/all-games") ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"}`}
            >
             Issues
            </NavLink>

            {loading ? (
              <PacmanLoader color="#ab9fe9" size={15} />
            ) : !user ? (
              <>
                <NavLink to="/login" className="text-gray-300 hover:text-cyan-400">
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 cyber-button rounded-lg text-sm"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/profile">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      className="w-8 h-8 rounded-full object-cover"
                      alt="profile"
                    />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </NavLink>

                <button onClick={logout} className="flex items-center gap-2 text-gray-300 hover:text-pink-400">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Right Side */}
          <div className="md:hidden flex items-center gap-3">

            {!user && !loading && (
              <>
                <Link to="/login" className="text-sm text-cyan-400">
                  Login
                </Link>
                <Link to="/register" className="text-sm px-3 py-1 cyber-button rounded-md">
                  Register
                </Link>
              </>
            )}

            <button onClick={() => setOpen(!open)}>
              {open ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 glass-card rounded-xl p-4 space-y-4"
          >
            <NavLink onClick={() => setOpen(false)} to="/" className="block text-gray-300">
              Home
            </NavLink>

            <NavLink onClick={() => setOpen(false)} to="/all-games" className="block text-gray-300">
              All Games
            </NavLink>

            {user && (
              <>
                <NavLink onClick={() => setOpen(false)} to="/profile" className="block text-gray-300">
                  Profile
                </NavLink>
                <button onClick={logout} className="flex items-center gap-2 text-pink-400">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </Motion.div>
        )}
      </MyContainer>
    </Motion.nav>
  );
};

export default Navbar;
