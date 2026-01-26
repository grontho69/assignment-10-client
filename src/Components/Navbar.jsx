import React, { useContext, useState } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { motion as Motion } from "framer-motion";
import {
  Menu,
  X,
  LogOut,
  Leaf,
  User,
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

  // 🔹 Nav configs
  const authNavLinks = [
    { name: "Home", path: "/" },
    { name: "All Issues", path: "/issues" },
    { name: "Add Issue", path: "/add-issue" },
    { name: "My Issues", path: "/my-issues" },
    { name: "My Contribution", path: "/my-contribution" },
  ];

  const guestNavLinks = [
    { name: "Home", path: "/" },
    { name: "Issues", path: "/issues" },
  ];

  return (
    <Motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass sticky top-0 z-50 border-b border-cyan-500/20"
    >
      <MyContainer>
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600 dark:text-green-500" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              EcoReport
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {(user ? authNavLinks : guestNavLinks).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={`text-sm ${
                  isActive(item.path)
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                }`}
              >
                {item.name}
              </NavLink>
            ))}

            {loading ? (
              <PacmanLoader color="#ab9fe9" size={15} />
            ) : !user ? (
              <>
                <NavLink
                  to="/login"
                  className="text-gray-300 hover:text-cyan-400"
                >
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

                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-gray-300 hover:text-pink-400"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Right */}
          <div className="md:hidden flex items-center gap-3">
            {!user && !loading && (
              <>
                <Link to="/login" className="text-sm text-cyan-400">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm px-3 py-1 cyber-button rounded-md"
                >
                  Register
                </Link>
              </>
            )}

            <button onClick={() => setOpen(!open)}>
              {open ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
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
            {(user ? authNavLinks : guestNavLinks).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="block text-gray-300"
              >
                {item.name}
              </NavLink>
            ))}

            {user ? (
              <button
                onClick={logout}
                className="flex items-center gap-2 text-pink-400"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/login" className="block text-cyan-400">
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="block cyber-button text-center rounded-md py-2"
                >
                  Register
                </NavLink>
              </>
            )}
          </Motion.div>
        )}
      </MyContainer>
    </Motion.nav>
  );
};

export default Navbar;
