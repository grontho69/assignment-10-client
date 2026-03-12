import React from 'react';
import { Link } from 'react-router';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const IssueCard = ({ issue }) => {
  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="group relative bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 dark:border-gray-800 transition-all hover:bg-slate-50 dark:hover:bg-gray-800/80 hover:scale-[1.02]"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={issue.image} 
          alt={issue.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-5 py-2.5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-900/10">
                {issue.category}
            </span>
            <span className="px-3 py-2 bg-black/40 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-wider rounded-xl">
                {issue.status || 'ongoing'}
            </span>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center gap-2 text-slate-400 font-bold mb-3 text-xs">
          <MapPin size={14} className="text-emerald-500" />
          {issue.location}
        </div>
        
        <h3 className="text-xl font-black text-slate-800 dark:text-white mb-4 line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {issue.title}
        </h3>

        <div className="flex items-center justify-between py-6 border-t dark:border-gray-800 mt-2">
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 leading-none">Suggested Budget</p>
                <p className="text-2xl font-black text-slate-800 dark:text-white">${issue.amount}</p>
            </div>
            <Link to={`/issue-details/${issue._id}`} className="w-12 h-12 bg-slate-900 dark:bg-emerald-600 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-600 transition-all hover:rotate-45 active:scale-95 shadow-lg">
                <ArrowUpRight size={20} />
            </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default IssueCard;
