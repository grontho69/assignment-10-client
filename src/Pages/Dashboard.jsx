import React from 'react';
import { 
  Users, 
  Activity, 
  Leaf, 
  Target 
} from 'lucide-react';
import DashboardLayout from '../features/dashboard/components/DashboardLayout';
import StatsCard from '../features/dashboard/components/StatsCard';
import EmissionChart from '../features/dashboard/components/EmissionChart';
import RecentReportsTable from '../features/dashboard/components/RecentReportsTable';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-extrabold text-slate-800 tracking-tight"
          >
            Project Overview
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 mt-2 text-lg font-medium"
          >
            Monitor real-time environmental impact and community activities.
          </motion.p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <StatsCard 
            title="Total Contributors" 
            value="12,482" 
            trend="up" 
            trendValue="12" 
            icon={Users} 
            color="bg-indigo-500" 
          />
          <StatsCard 
            title="Active Initiatives" 
            value="142" 
            trend="up" 
            trendValue="8" 
            icon={Activity} 
            color="bg-emerald-500" 
          />
          <StatsCard 
            title="CO2 Offset" 
            value="42.5 Tons" 
            trend="up" 
            trendValue="24" 
            icon={Leaf} 
            color="bg-teal-500" 
          />
          <StatsCard 
            title="Goal Progress" 
            value="64%" 
            trend="down" 
            trendValue="2.4" 
            icon={Target} 
            color="bg-amber-500" 
          />
        </div>

        {/* Analytics & Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          <EmissionChart />
          
          {/* Side Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-emerald-200/50 h-full flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="absolute top-0 right-0 -translate-y-8 translate-x-8 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Milestone Achieved!</h3>
              <p className="text-emerald-50 opacity-90 leading-relaxed mb-8">
                Your community has offset more than 1,000 tons of CO2 this year alone. Keep up the amazing work!
              </p>
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <p className="text-xs uppercase font-bold tracking-widest text-emerald-200 mb-1">Next Badge</p>
                  <p className="text-lg font-bold">Climate Guardian Elite</p>
                </div>
              </div>
            </div>
            <button className="relative z-10 mt-12 w-full bg-white text-emerald-700 font-bold py-4 rounded-2xl hover:bg-emerald-50 transition-colors shadow-lg shadow-emerald-900/10">
              Claim Certificate
            </button>
          </motion.div>
        </div>

        {/* Table Section */}
        <div className="mt-10">
          <RecentReportsTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
