import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Defs,
  LinearGradient,
  Stop
} from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { month: 'Jan', current: 4000, previous: 2400 },
  { month: 'Feb', current: 3000, previous: 1398 },
  { month: 'Mar', current: 2000, previous: 9800 },
  { month: 'Apr', current: 2780, previous: 3908 },
  { month: 'May', current: 1890, previous: 4800 },
  { month: 'Jun', current: 2390, previous: 3800 },
];

const EmissionTrendChart = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-[400px]"
    >
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800">Monthly Emission Trends</h3>
        <p className="text-sm text-slate-500">CO2 emissions tracked in metric tons</p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                padding: '12px'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="current" 
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorCurrent)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default EmissionTrendChart;
