import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { Github, Mail, Lock, ArrowRight, Loader2, Leaf, ShieldCheck, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginUser(email, password);
      toast.success("Welcome back, Citizen!");
      navigate(from, { replace: true });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Google Authentication Successful");
      navigate(from, { replace: true });
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 flex transition-colors">
      {}
      <div className="hidden lg:flex w-1/2 bg-slate-900 items-center justify-center p-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070')] bg-cover bg-center opacity-40 grayscale"></div>
        <div className="relative z-10 max-w-lg">
           <div className="flex items-center gap-3 text-emerald-500 mb-10">
              <Leaf size={48} className="rotate-12" />
              <span className="text-4xl font-black tracking-tighter text-white">EcoReport</span>
           </div>
           <h2 className="text-6xl font-black text-white leading-none mb-8">Empowering <span className="text-emerald-500">Communities</span> to Heal the Planet.</h2>
           <p className="text-xl text-slate-300 font-medium leading-relaxed">Login to access your personalized environmental dashboard and track your impact on the city.</p>
           
           <div className="mt-16 flex gap-10">
              <div>
                <p className="text-4xl font-black text-white">8.2k</p>
                <p className="text-xs font-black uppercase tracking-widest text-emerald-500 mt-2">Active Warriors</p>
              </div>
              <div className="w-px h-16 bg-white/10"></div>
              <div>
                <p className="text-4xl font-black text-white">94%</p>
                <p className="text-xs font-black uppercase tracking-widest text-emerald-500 mt-2">Issue Resolution</p>
              </div>
           </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -mr-32 -mt-32"></div>
      </div>

      {}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-10">
          <div>
            <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Citizen Access</h1>
            <p className="text-slate-500 font-medium mt-2">Sign in to report and track neighborhood incidents.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" name="email" required 
                  className="w-full h-16 bg-white dark:bg-gray-900 border-none rounded-2xl pl-14 pr-6 font-bold shadow-sm focus:ring-2 focus:ring-emerald-500/20 dark:text-white outline-none" 
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type={showPassword ? "text" : "password"} name="password" required 
                  className="w-full h-16 bg-white dark:bg-gray-900 border-none rounded-2xl pl-14 pr-12 font-bold shadow-sm focus:ring-2 focus:ring-emerald-500/20 dark:text-white outline-none" 
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="text-right">
                <a href="#" className="text-xs font-black text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-widest">Forgot Password?</a>
              </div>
            </div>

            <button disabled={loading} className="w-full h-16 bg-slate-900 dark:bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-slate-200 dark:shadow-none flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95">
              {loading ? <Loader2 className="animate-spin" /> : <>Sign In Now <ArrowRight size={20} /></>}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-black tracking-widest">
              <span className="bg-slate-50 dark:bg-gray-950 px-6 text-slate-400">Social Authentication</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={handleGoogleLogin} className="flex items-center justify-center gap-3 h-14 bg-white dark:bg-gray-900 rounded-2xl border border-slate-100 dark:border-gray-800 font-bold hover:bg-slate-50 transition-all">
               <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="" /> Google
            </button>
            <button className="flex items-center justify-center gap-3 h-14 bg-white dark:bg-gray-900 rounded-2xl border border-slate-100 dark:border-gray-800 font-bold hover:bg-slate-50 transition-all opacity-50 cursor-not-allowed">
               <Github className="w-5 h-5" /> GitHub
            </button>
          </div>

          <p className="text-center text-sm font-bold text-slate-500">
            Don’t have an account? <Link to="/register" className="text-emerald-600 font-black hover:underline uppercase tracking-widest ml-1">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
