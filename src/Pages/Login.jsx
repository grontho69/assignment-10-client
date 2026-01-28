import React, { useContext, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, Loader2, Leaf } from "lucide-react";
import { motion as Motion } from "motion/react";

;
import { toast } from "react-toastify";

import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";



const Login = () => { 
  
  const emailRef = useRef(null)
  const [email, setEmail] = useState("")
  const {signInWithEmailAndPasswordFunc,signInWithPopupFunc,user,setUser}= useContext(AuthContext)

const navigate = useNavigate()

  const handelSignin = (e) => {
    
    e.preventDefault();
      const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPasswordFunc(email, password).then(res => {
     
      console.log(res);
      setUser(res.user)
      toast.success("login successfull")
      navigate('/')
    }).catch(e => {
      toast.error(e.message)
    })
  }
  console.log(user)

  const handleGoogleSignIn = () => {
    signInWithPopupFunc().then((res) => {
       if (!res.user?.emailVerified) {
        toast.error('Your email is not verified')
        return;
      }
      console.log(res);
      setUser(res.user)
      toast.success("login successfull")
      navigate('/')
      
    }).catch((e) => {
      toast.error(e.message);
    })
  }

  
  const [show, setShow] = useState(false);

  
  
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50 dark:bg-gray-900">
      
      <div className="card w-full max-w-md">
        <div className="card-header items-center flex flex-col text-center">
          <div className="flex justify-center mb-4">
            <Leaf className="h-12 w-12 text-green-600 dark:text-green-500" />
          </div>
          <h2 className="card-title text-2xl">Welcome Back</h2>
          <p className="card-description">Login to your EcoReport account</p>
        </div>
        <div className="card-content">
          <form onSubmit={handelSignin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="label">Email</label>
              <div className="relative">
                
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                   ref={emailRef}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  required 
                />
              </div>
            </div>

            <div className="relative space-y-2">
              <label htmlFor="password" className="label">Password</label>
              <div className="relative">
                
                <input
                  id="password"
                 type= {show ? "text" :"password"}
                  placeholder="Enter your password"
                  
                  required
                  className="input pl-10"
                  
                />
                 <button
                         type="button"
                         onClick={()=> setShow(!show)}
                         className="absolute right-4 top-1/2 z-50 text-gray-500 hover:text-cyan-400 transition-colors"
                       >
                         {show ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                       </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" >Login </button>
            

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
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-600 dark:text-green-500 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
        </div>
      
    
  );
};

export default Login;
