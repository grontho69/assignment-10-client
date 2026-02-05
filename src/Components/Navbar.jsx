import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { Menu, X, LogOut, Leaf, Sun, Moon } from "lucide-react";
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

  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  
  const handleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      html.classList.contains("dark") ? "dark" : "light"
    );
  };


  const logout = () => {
    signOutFunc()
      .then(() => {
        toast.success("Logout successful");
        setUser(null);
        setOpen(false);
        setProfileOpen(false);
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

  const navLinks = user ? authNavLinks : guestNavLinks;

  return (
    <nav className="sticky top-0 z-50 border-b bg-white dark:bg-gray-900">
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
                className={`text-sm ${
                  isActive(item.path)
                    ? "font-semibold text-green-600"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                {item.name}
              </NavLink>
            ))}

            <button onClick={handleTheme}>
              <Sun className="h-5 w-5 block dark:hidden" />
              <Moon className="h-5 w-5 hidden dark:block" />
            </button>

            {loading ? (
              <PacmanLoader size={10} />
            ) : !user ? (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-1 rounded bg-green-600 text-white"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <div className="relative">
                
                <img
                  src={user.photoURL || "https://via.placeholder.com/32"}
                  alt="profile"
                  className="h-8 w-8 rounded-full cursor-pointer"
                  onClick={() => setProfileOpen(!profileOpen)}
                />

                
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border rounded shadow-md z-50">
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 px-4 py-2 w-full text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
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

            <button onClick={() => setOpen(!open)}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

       
        {open && (
          <div className="md:hidden mt-3 pb-4 border-t dark:border-gray-700">
            <div className="flex flex-col gap-3 pt-4">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`px-2 ${
                    isActive(item.path)
                      ? "font-semibold text-green-600"
                      : "opacity-80"
                  }`}
                >
                  {item.name}
                </NavLink>
              ))}

              {!user ? (
                <>
                  <NavLink to="/login" onClick={() => setOpen(false)}>
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="text-green-600"
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="flex gap-2 text-red-500"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </MyContainer>
    </nav>
  );
};

export default Navbar;
