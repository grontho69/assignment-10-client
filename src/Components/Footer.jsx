import React from 'react';
import { Leaf, Github, Twitter, Facebook, Instagram, Send } from 'lucide-react';
import MyContainer from './MyContainer';

const Footer = () => {
  return (
    <footer className="footer-bg-gradient pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-gray-800 to-transparent"></div>
      
      <MyContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2 group cursor-pointer w-fit">
              <Leaf className="h-8 w-8 text-emerald-500 group-hover:rotate-12 transition-transform" />
              <span className="font-bold text-2xl tracking-tighter dark:text-white">EcoReport</span>
            </div>
            <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
              Revolutionizing city management through community action. Join our mission for a cleaner, greener sustainable future.
            </p>
            <div className="flex gap-4">
              {[Github, Twitter, Facebook, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm border dark:border-gray-700 hover:bg-emerald-50 hover:text-emerald-500 transition-all active:scale-95">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
             <h4 className="text-slate-800 dark:text-white font-black uppercase text-xs tracking-widest mb-8">Platform</h4>
             <ul className="space-y-4">
               {['About Us', 'Environmental Policy', 'Live Initiatives', 'Success Stories', 'Community Forum'].map(link => (
                 <li key={link}><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors text-sm font-semibold">{link}</a></li>
               ))}
             </ul>
          </div>

          <div>
             <h4 className="text-slate-800 dark:text-white font-black uppercase text-xs tracking-widest mb-8">Categories</h4>
             <ul className="space-y-4">
               {['Waste Management', 'Illegal Dumping', 'Water Conservation', 'Broken Infrastructure', 'Illegal Construction'].map(link => (
                 <li key={link}><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors text-sm font-semibold">{link}</a></li>
               ))}
             </ul>
          </div>

          <div className="bg-slate-900 dark:bg-gray-900 p-8 rounded-[2.5rem] text-white">
             <h4 className="font-black uppercase text-xs tracking-widest mb-4 opacity-100">Newsletter</h4>
             <p className="opacity-60 text-xs mb-8 leading-relaxed font-bold uppercase tracking-wider">Get the latest eco-updates delivered to your inbox.</p>
             <div className="relative">
                <input type="email" placeholder="Email address" className="w-full bg-white/5 border-none rounded-2xl py-4 pl-6 pr-14 text-sm font-medium outline-none" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-lg">
                   <Send size={16} />
                </button>
             </div>
          </div>
        </div>

        <div className="pt-12 border-t dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 dark:text-gray-500 font-bold text-xs uppercase tracking-widest">
           <p>© 2026 ECO-REPORT (ASSIGNMENT-10). ALL RIGHTS RESERVED.</p>
           <div className="flex gap-8">
             <a href="#" className="hover:text-emerald-500 transition-colors">Privacy</a>
             <a href="#" className="hover:text-emerald-500 transition-colors">Terms</a>
             <a href="#" className="hover:text-emerald-500 transition-colors">Cookies</a>
           </div>
        </div>
      </MyContainer>
    </footer>
  );
};

export default Footer;
