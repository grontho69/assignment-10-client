import React, { useContext, useState } from "react";
import { motion as Motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import {Eye,Mail,Lock,User,Image,Sparkles, EyeOff} from "lucide-react";

import {  } from "../firebase/Firebase.Config";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { createUserWithEmailAndPasswordFunc, updateProfileFunc, sendEmailVerificationFunc,
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

     // email verification   
        sendEmailVerificationFunc().then(res => {
   console.log(res);
        
           signOutFunc().then(() => {
                   toast.success("registration successfull. Check your spam-mail to active the account")
             setUser(null)
             navigate('/login')
                })

        }).catch((e) => {
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
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 grid-background flex items-center justify-center px-4 py-12">
      <Motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative"
      >
        <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 to-pink-500 rounded-2xl blur-xl opacity-20" />

        <div className="relative glass-card rounded-2xl p-8 border border-cyan-500/30">
          
          
          <Motion.div
            className="flex items-center justify-center gap-2 mb-6"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-pink-400" />
          </Motion.div>

          <h2 className="text-3xl gradient-text font-bold mb-6 text-center">
            Join GameHub
          </h2>

        
          <form onSubmit={handelSignup} className="space-y-4">
                          <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">Name</label>
          <input type="text" name="name" className="w-full pl-12 pr-4 py-3 glass-card text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="John Doe"
              required />
                          <label htmlFor="photoURL" className="block text-gray-300 mb-2 font-medium">Photo URL</label>
          <input type="text" name="photo" className="w-full pl-12 pr-4 py-3 glass-card text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              placeholder="https://example.com/photo.jpg" required />
            <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">Email</label>
          <input type="email" name="email"  className="w-full pl-12 pr-4 py-3 glass-card text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="your@email.com" required />
            <div className="relative group">
               <label htmlFor="password" className="block text-gray-300 mb-2 font-medium">Password</label>
            <input
              type= {show ? "text" :"password"}
              name="password"
              className="w-full pl-12 pr-12 py-3 glass-card text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="••••••••"
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
          <button  type="submit"
              className="w-full cyber-button py-3 text-white rounded-xl font-medium">Register</button>
     
       

         
        

          
          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-400 hover:text-pink-400 font-medium"
            >
              Login here
            </Link>
            </p>
             </form>
        </div>
      </Motion.div>
    </div>
  );
};

export default Register;
