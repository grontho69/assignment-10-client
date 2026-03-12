import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { Github, Mail, Lock, User, Image, ArrowRight, Loader2, Leaf, ShieldCheck } from "lucide-react";

const Register = () => {
  const { registerUser, updateUserNameAndPhoto, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setLoading(false);
      return toast.error("Password must be 6+ chars, 1 uppercase, 1 lowercase");
    }

    try {
      await registerUser(email, password);
      await updateUserNameAndPhoto(name, photo);
      toast.success("Citizen Registered Successfully!");
      navigate("/", { replace: true });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Joined with Google");
      navigate("/");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 flex transition-colors">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg space-y-10">
          <div>
            <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Join the Mission</h1>
            <p className="text-slate-500 font-medium mt-2">Become a verified Eco-Warrior in your sector today.</p>
          </div>

          <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Legal Name</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input name="name" required className="w-full h-16 bg-white dark:bg-gray-900 border-none rounded-2xl pl-14 pr-6 font-bold shadow-sm outline-none" placeholder="John Doe" />
              </div>
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Profile Photo URL</label>
              <div className="relative">
                <Image className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input name="photo" required className="w-full h-16 bg-white dark:bg-gray-900 border-none rounded-2xl pl-14 pr-6 font-bold shadow-sm outline-none" placeholder="https://image.com/johndoe.jpg" />
              </div>
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Hub</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="email" name="email" required className="w-full h-16 bg-white dark:bg-gray-900 border-none rounded-2xl pl-14 pr-6 font-bold shadow-sm outline-none" placeholder="warrior@eco-report.com" />
              </div>
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure Access Key</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="password" name="password" required className="w-full h-16 bg-white dark:bg-gray-900 border-none rounded-2xl pl-14 pr-6 font-bold shadow-sm outline-none" placeholder="••••••••" />
              </div>
            </div>

            <button disabled={loading} className="col-span-1 md:col-span-2 h-16 bg-slate-900 dark:bg-emerald-600 text-white font-black rounded-2xl shadow-xl flex items-center justify-center gap-3 hover:bg-black transition-all">
              {loading ? <Loader2 className="animate-spin" /> : <>Complete Enrollment <ArrowRight size={20} /></>}
            </button>
          </form>

          <button onClick={handleGoogleLogin} className="w-full h-14 bg-white dark:bg-gray-900 rounded-2xl border border-slate-100 dark:border-gray-800 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
             <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="" /> Fast-Track with Google
          </button>

          <p className="text-center text-sm font-bold text-slate-500">
            Already enlisted? <Link to="/login" className="text-emerald-600 font-black hover:underline uppercase tracking-widest ml-1">Warrior Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
