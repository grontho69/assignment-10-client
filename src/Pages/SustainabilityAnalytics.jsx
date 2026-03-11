import React from 'react';
import DashboardLayout from '../features/dashboard/components/DashboardLayout';
import EmissionTrendChart from '../features/analytics/components/EmissionTrendChart';
import ReportsChart from '../features/analytics/components/ReportsChart';
import LeaderboardChart from '../features/analytics/components/LeaderboardChart';
import PerformanceComparisonChart from '../features/analytics/components/PerformanceComparisonChart';
import { motion } from 'framer-motion';
import ExportButton from '../components/export/ExportButton';

const SustainabilityAnalytics = () => {
  return (
    <DashboardLayout>
      <div id="analytics-report-content" className="max-w-[1600px] mx-auto p-4 bg-[#F8FAFC] rounded-[3rem]">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-extrabold text-slate-800 tracking-tight"
            >
              Sustainability Analytics
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 mt-2 text-lg font-medium"
            >
              In-depth data insights on global environmental impact.
            </motion.p>
          </div>
          <div className="flex space-x-3 no-print" data-html2canvas-ignore="true">
             <ExportButton targetId="analytics-report-content" projectName="Sustainability" />
          </div>
        </header>

        <div className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <EmissionTrendChart />
            <ReportsChart />
            <LeaderboardChart />
            <PerformanceComparisonChart />
          </div>
        </div>
        
        {/* Decorative Insight Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-10 p-10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-[3rem] text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">Deep Insight: Carbon Peak</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                Based on current trends, your initiatives are on track to reduce local CO2 output by 15% by Q4. 
                The most significant impact is observed in <strong>Urban Forestry</strong>, contributing to 40% of the reduction.
              </p>
              <div className="flex space-x-6">
                <div>
                  <p className="text-emerald-400 text-2xl font-bold">15%</p>
                  <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Reduction Forecast</p>
                </div>
                <div className="h-10 w-px bg-slate-700"></div>
                <div>
                  <p className="text-emerald-400 text-2xl font-bold">4.2k</p>
                  <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Trees Planted</p>
                </div>
              </div>
            </div>
            <div className="hidden xl:block">
               <div className="w-48 h-48 border-8 border-emerald-500/20 rounded-full flex items-center justify-center p-8">
                  <div className="w-full h-full border-4 border-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                     <span className="text-emerald-400 font-black text-xl">LIVE</span>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default SustainabilityAnalytics;
