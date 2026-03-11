import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, trend, trendValue, icon: Icon, color }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-4 rounded-2xl ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold ${
          trend === 'up' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
        }`}>
          {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{trendValue}%</span>
        </div>
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800 mt-1">{value}</h3>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-50">
        <p className="text-xs text-slate-400">vs last period</p>
      </div>
    </motion.div>
  );
};

export default StatsCard;
