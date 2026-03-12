import React from 'react';

const StatsCard = ({ title, value, icon: Icon, color, trend, trendValue }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-gray-800 flex flex-col justify-between h-56 group hover:shadow-xl transition-all">
      <div className="flex justify-between items-start">
        <div className={`p-4 rounded-2xl ${color} text-white shadow-lg`}>
          <Icon size={24} />
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}%
        </div>
      </div>
      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{title}</h3>
        <p className="text-4xl font-black text-slate-800 dark:text-white">{value}</p>
      </div>
    </div>
  );
};
export default StatsCard;
