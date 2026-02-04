import React, { useContext, useState } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { motion as Motion } from "framer-motion";
import { Menu, X, LogOut, Leaf, User } from "lucide-react";
import MyContainer from "./MyContainer";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { PacmanLoader } from "react-spinners";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const { user, setUser, signOutFunc, loading } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const logout = () => {
    signOutFunc()
      .then(() => {
        toast.success("Logout successful");
        setUser(null);
        setProfileOpen(false);
        setOpen(false);
      })
      .catch((e) => toast.error(e.message));
  };

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
      className="bg-white sticky top-0 z-50 border-b border-gray-200"
    >
      <MyContainer>
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="font-bold text-xl text-gray-900">
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
                    ? "text-black font-semibold"
                    : "text-gray-900 hover:text-gray-700"
                }`}
              >
                {item.name}
              </NavLink>
            ))}

            {loading ? (
              <PacmanLoader color="#4f46e5" size={12} />
            ) : !user ? (
              <>
                <NavLink
                  to="/login"
                  className="text-gray-900 hover:text-gray-700"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                >
                  Register
                </NavLink>
              </>
            ) : (
              /* Profile Dropdown */
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="focus:outline-none"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      className="w-8 h-8 rounded-full object-cover border border-gray-300"
                      alt="profile"
                    />
                  ) : (
                    <User className="w-7 h-7 text-gray-900" />
                  )}
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden"
                    
                     
                      onClick={() => setProfileOpen(false)}
                      
                    >
                      
                    

                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Right */}
          <div className="md:hidden flex items-center gap-3">
            {!user && !loading && (
              <>
                <Link to="/login" className="text-sm text-gray-900">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm px-3 py-1 bg-black text-white rounded-md"
                >
                  Register
                </Link>
              </>
            )}

            <button onClick={() => setOpen(!open)}>
              {open ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 bg-white rounded-xl p-4 space-y-4 border"
          >
            {(user ? authNavLinks : guestNavLinks).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="block text-gray-900"
              >
                {item.name}
              </NavLink>
            ))}

            {user ? (
              <button
                onClick={logout}
                className="flex items-center gap-2 text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/login" className="block text-gray-900">
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="block bg-black text-white text-center rounded-md py-2"
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
