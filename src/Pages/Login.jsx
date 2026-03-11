import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Leaf } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => { 
  const { loginUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then(() => {
        toast.success("Login successful");
        navigate('/');
      })
      .catch(e => {
        toast.error(e.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleLogin()
      .then(() => {
        toast.success("Login successful");
        navigate('/');
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="card w-full max-w-md">
        <div className="card-header items-center flex flex-col text-center">
          <Leaf className="h-12 w-12 text-green-600 mb-4" />
          <h2 className="card-title text-2xl">Welcome Back</h2>
          <p className="card-description">Login to your EcoReport account</p>
        </div>
        <div className="card-content">
          <form onSubmit={handleSignin} className="space-y-4">
            <div className="space-y-2">
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="label">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="input pr-12"
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
            <button type="submit" className="btn btn-primary w-full">Login</button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-outline w-full"
              onClick={handleGoogleSignIn}
            >
              Google
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-600 hover:underline">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
