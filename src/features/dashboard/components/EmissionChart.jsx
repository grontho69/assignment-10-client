import React from 'react';

const EmissionChart = () => {
  return (
    <div className="w-full h-[400px] flex flex-col">
        <div className="flex items-center justify-between mb-12">
            <div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Issue Resolve Efficiency</h3>
                <p className="text-sm font-medium text-slate-400">Monthly breakdown of community actions</p>
            </div>
        </div>
        <div className="flex-1 flex items-end gap-x-6">
            {[65, 45, 85, 30, 95, 55, 75].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4">
                    <div className="relative w-full group">
                        <div style={{ height: `${h}%` }} className="w-full bg-slate-100 dark:bg-gray-800 rounded-2xl relative transition-all group-hover:bg-emerald-500 overflow-hidden">
                             <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                        </div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}</span>
                </div>
            ))}
        </div>
    </div>
  );
};
export default EmissionChart;
