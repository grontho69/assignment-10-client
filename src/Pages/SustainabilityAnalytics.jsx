import React from 'react';
import DashboardLayout from '../features/dashboard/components/DashboardLayout';
import EmissionTrendChart from '../features/analytics/components/EmissionTrendChart';
import ReportsChart from '../features/analytics/components/ReportsChart';
import PerformanceComparisonChart from '../features/analytics/components/PerformanceComparisonChart';
import LeaderboardChart from '../features/analytics/components/LeaderboardChart';
import { motion } from 'framer-motion';
import { Download, Share2, Info } from 'lucide-react';

const SustainabilityAnalytics = () => {
  return (
    <DashboardLayout>
       <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-16">
            <div className="max-w-xl">
                <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl xl:text-5xl font-black text-slate-800 dark:text-white tracking-tighter">Impact <span className="text-emerald-500">Analytics</span> Hub</motion.h1>
                <p className="text-slate-500 dark:text-gray-400 mt-4 font-medium text-lg leading-relaxed">Deep dive into city-wide environmental cleanup performance metrics and community contribution growth.</p>
            </div>
            <div className="flex gap-4">
                <button className="h-14 px-8 bg-white dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3 hover:bg-slate-50 transition-all"><Download size={16} /> Export Dataset</button>
                <button className="h-14 px-8 bg-emerald-600 rounded-2xl shadow-xl shadow-emerald-200 dark:shadow-none font-black text-[10px] uppercase tracking-[0.2em] text-white flex items-center gap-3 hover:bg-emerald-700 transition-all"><Share2 size={16} /> Share Insights</button>
            </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
             <section className="bg-white dark:bg-gray-900 rounded-[3.5rem] p-12 lg:p-16 shadow-sm border border-slate-50 dark:border-gray-800 h-fit">
                <div className="flex items-center justify-between mb-16">
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white">Emission Reduction Trend</h3>
                    <Info size={18} className="text-slate-300" />
                </div>
                <div className="h-[400px]">
                    <EmissionTrendChart />
                </div>
             </section>

             <section className="bg-white dark:bg-gray-900 rounded-[3.5rem] p-12 lg:p-16 shadow-sm border border-slate-50 dark:border-gray-800 h-fit">
                <div className="flex items-center justify-between mb-16">
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white">Community Report Density</h3>
                    <Info size={18} className="text-slate-300" />
                </div>
                <div className="h-[400px]">
                    <ReportsChart />
                </div>
             </section>

             <section className="bg-white dark:bg-gray-900 rounded-[3.5rem] p-12 lg:p-16 shadow-sm border border-slate-50 dark:border-gray-800 h-fit xl:col-span-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                     <div>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-10">Sector Performance Matrix</h3>
                        <PerformanceComparisonChart />
                     </div>
                     <div>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-10">Global Impact Leaderboard</h3>
                        <LeaderboardChart />
                     </div>
                </div>
             </section>
        </div>
    </DashboardLayout>
  );
};

export default SustainabilityAnalytics;
