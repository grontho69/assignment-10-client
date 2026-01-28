import React, { useContext, useState } from "react";
import { motion as Motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import {Eye,Mail,Lock,User,Image,Leaf, EyeOff} from "lucide-react";

import {  } from "../firebase/Firebase.Config";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { createUserWithEmailAndPasswordFunc, updateProfileFunc, 
    signOutFunc,
    setUser
  } = useContext(AuthContext)

  const [show, setShow] = useState(false);
  const navigate = useNavigate()


  const handelSignup = (e) => { 
    e.preventDefault();

    const displayName = e.target.name.value;
    const photoURL = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;


    console.log({ email, displayName, password, photoURL })
    const passCheck = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passCheck.test(password)) {
          toast.error(
            "Password must be at least 6 characters and include uppercase & lowercase letters."
          );
          return;
        }
    
    
//creat user
    createUserWithEmailAndPasswordFunc(email, password)
      .then(res => {
// update profile
      updateProfileFunc( 
        displayName, photoURL
  
      ).then(() => {

    
   console.log(res);
        
           signOutFunc().then(() => {
                   toast.success("registration successfull.")
             setUser(null)
             navigate('/login')
                })

        .catch((e) => {
        toast.error(e.message)
      })
})

       .catch((e) => {
   toast.error(e.message)
 })

      console.log(res);
      
    }).catch(e => {
        toast.error(e.message)
      })
   }
  return (
     <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="card w-full max-w-md">
        <div className="card-header flex flex-col items-center text-center">
          <div className="flex justify-center mb-4">
            <Leaf className="h-12 w-12 text-green-600 dark:text-green-500" />
          </div>
          <h2 className="card-title text-2xl">Create an Account</h2>
          <p className="card-description">Join EcoReport and make a difference</p>
        </div>
        <div className="card-content">
          <form onSubmit={handelSignup} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="label">Name *</label>
              <div className="relative">
               
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  
                  
                  className="input pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="label">Email *</label>
              <div className="relative">
               
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  
                  className="input pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="photoURL" className="label">Photo URL (Optional)</label>
              <div className="relative">
                
                <input
                  id="photoURL"
                  name="photo"
                  type="text"
                  placeholder="Enter photo URL"
                 
                  className="input pl-10"
                  required
                 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="label">Password *</label>
              <div className="relative">
                
                <input
                  id="password"
                  name="password"
                  type= {show ? "text" :"password"}
                  placeholder="Enter your password"
                 
                  className="input pl-10"
                  required
                />
                <button
                  type="button"
                  onClick={()=> setShow(!show)}
                  className="absolute right-4 top-1/2 z-50 text-gray-500 hover:text-cyan-400 transition-colors"
                >
                  {show ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Password must contain uppercase, lowercase, and be at least 6 characters
              </p>
            </div>

            <button type="submit" className="btn btn-primary w-full" >
              Register
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
               
              </div>
            </div>

           
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 dark:text-green-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
