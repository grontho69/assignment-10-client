import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Leaf } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => { 
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    const passCheck = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passCheck.test(password)) {
      toast.error("Password must be at least 6 characters and include uppercase & lowercase letters.");
      return;
    }

    registerUser(email, password, name, photo)
      .then(() => {
        toast.success("Registration successful!");
        navigate('/');
      })
      .catch(e => {
        toast.error(e.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="card w-full max-w-md">
        <div className="card-header flex flex-col items-center text-center">
          <Leaf className="h-12 w-12 text-green-600 mb-4" />
          <h2 className="card-title text-2xl">Create an Account</h2>
          <p className="card-description">Join EcoReport and make a difference</p>
        </div>
        <div className="card-content">
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label className="label">Name *</label>
              <input name="name" type="text" placeholder="Enter your name" className="input" required />
            </div>
            <div className="space-y-2">
              <label className="label">Email *</label>
              <input name="email" type="email" placeholder="Enter your email" className="input" required />
            </div>
            <div className="space-y-2">
              <label className="label">Photo URL</label>
              <input name="photo" type="text" placeholder="Enter photo URL" className="input" />
            </div>
            <div className="space-y-2">
              <label className="label">Password *</label>
              <div className="relative">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input pr-12"
                  required
                />
                <button
                   type="button"
                   onClick={() => setShow(!show)}
                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {show ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full">Register</button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
