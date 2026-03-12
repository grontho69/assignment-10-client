import React from 'react';

const LeaderboardChart = () => {
    return (
        <div className="space-y-6">
            {[
                { name: 'EcoWarriors Org', impact: '14.2k' },
                { name: 'Green Sector V', impact: '11.8k' },
                { name: 'Urban Cleanup Team', impact: '9.4k' }
            ].map((u, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-gray-800/50 rounded-2xl hover:scale-[1.02] transition-all">
                    <div className="flex items-center gap-5">
                        <span className="text-xl font-black text-emerald-500 opacity-40">#{i+1}</span>
                        <span className="font-bold text-slate-700 dark:text-white uppercase text-xs tracking-widest">{u.name}</span>
                    </div>
                    <span className="font-black text-slate-800 dark:text-white">{u.impact}</span>
                </div>
            ))}
        </div>
    );
};
export default LeaderboardChart;
