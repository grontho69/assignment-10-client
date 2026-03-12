import React from 'react';
import { motion } from 'framer-motion';

const EmissionChart = () => {
  const data = [
    { month: 'Jan', value: 65, label: '65%', secondary: 40 },
    { month: 'Feb', value: 45, label: '45%', secondary: 35 },
    { month: 'Mar', value: 85, label: '85%', secondary: 60 },
    { month: 'Apr', value: 30, label: '30%', secondary: 25 },
    { month: 'May', value: 95, label: '95%', secondary: 70 },
    { month: 'Jun', value: 55, label: '55%', secondary: 45 },
    { month: 'Jul', value: 75, label: '75%', secondary: 50 },
  ];

  return (
    <div className="w-full h-[500px] flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-8 bg-emerald-500 rounded-full"></div>
                    <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter">Impact <span className="text-emerald-500">Flux</span></h3>
                </div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] italic ml-4">Monthly Community Resolution Index</p>
            </div>
            
            <div className="flex gap-8 bg-slate-50 dark:bg-gray-800/50 p-4 rounded-2xl border dark:border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"></div>
                    <span className="text-[10px] font-black uppercase text-slate-500 dark:text-gray-400 tracking-widest">Efficiency</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-gray-700"></div>
                    <span className="text-[10px] font-black uppercase text-slate-500 dark:text-gray-400 tracking-widest">Baseline</span>
                </div>
            </div>
        </div>

        <div className="flex-1 flex items-end justify-between gap-x-2 md:gap-x-6 px-2 relative">
            {/* Grid Lines */}
            <div className="absolute inset-x-0 top-0 bottom-12 flex flex-col justify-between pointer-events-none opacity-20">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full border-t border-dashed border-slate-300 dark:border-gray-700"></div>
                ))}
            </div>

            {data.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-6 h-full justify-end relative group z-10">
                    {/* Tooltip */}
                    <div className="absolute top-0 opacity-0 group-hover:opacity-100 transition-all -translate-y-12 bg-slate-900 dark:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-black z-20 pointer-events-none whitespace-nowrap shadow-2xl scale-75 group-hover:scale-100 origin-bottom">
                        {item.label} Resolution Rate
                    </div>

                    <div className="w-full h-full flex items-end relative overflow-hidden rounded-2xl md:rounded-[2rem] bg-slate-100/50 dark:bg-gray-800/30 backdrop-blur-sm">
                        {/* Secondary (Ghost) Bar */}
                        <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${item.secondary}%` }}
                            transition={{ delay: i * 0.05, duration: 1.2, ease: "circOut" }}
                            className="absolute bottom-0 left-0 right-0 bg-slate-200 dark:bg-gray-700/50 opacity-40"
                        />
                        
                        {/* Primary Bar */}
                        <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${item.value}%` }}
                            transition={{ delay: i * 0.1, duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
                            className="w-full relative group-hover:brightness-110 transition-all cursor-pointer"
                            style={{ 
                                background: `linear-gradient(to top, #059669, #10b981, #34d399)`,
                                boxShadow: `inset 0 2px 10px rgba(255,255,255,0.3)`
                             }}
                        >
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/40 blur-[1px]"></div>
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px] opacity-10"></div>
                        </motion.div>
                    </div>
                    
                    <span className="text-[10px] md:text-xs font-black text-slate-500 dark:text-gray-500 uppercase tracking-[0.3em] group-hover:text-emerald-500 transition-colors">
                        {item.month}
                    </span>
                </div>
            ))}
        </div>
    </div>
  );
};

export default EmissionChart;
