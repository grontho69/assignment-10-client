import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'GreenEarth', impact: 85, color: '#10b981' },
  { name: 'EcoWatch', impact: 72, color: '#3b82f6' },
  { name: 'NatureTrust', impact: 64, color: '#f59e0b' },
  { name: 'CleanOcean', impact: 58, color: '#6366f1' },
  { name: 'UrbanForest', impact: 45, color: '#ec4899' },
];

const LeaderboardChart = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-[400px]"
    >
      <div className="mb-6 text-center">
        <h3 className="text-lg font-bold text-slate-800">Impact Leaderboard</h3>
        <p className="text-sm text-slate-500">Top organizations by environmental reach</p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            layout="vertical" 
            data={data}
            margin={{ left: 20 }}
          >
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
              width={100}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
              }} 
            />
            <Bar 
              dataKey="impact" 
              radius={[0, 10, 10, 0]} 
              barSize={20}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default LeaderboardChart;
