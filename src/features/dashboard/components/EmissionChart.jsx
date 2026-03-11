import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Jan', emissions: 4000 },
  { name: 'Feb', emissions: 3000 },
  { name: 'Mar', emissions: 2000 },
  { name: 'Apr', emissions: 2780 },
  { name: 'May', emissions: 1890 },
  { name: 'Jun', emissions: 2390 },
  { name: 'Jul', emissions: 3490 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-xl border border-slate-800">
        <p className="text-xs font-bold text-slate-400 mb-1">{label}</p>
        <p className="text-sm font-bold">
          <span className="text-emerald-400">{payload[0].value}</span> tons CO2
        </p>
      </div>
    );
  }
  return null;
};

const EmissionChart = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm col-span-2 h-[400px]"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Emission Analytics</h3>
          <p className="text-sm text-slate-500">Global CO2 reduction progress</p>
        </div>
        <select className="bg-slate-100 border-none rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 outline-none">
          <option>Last 7 months</option>
          <option>Last year</option>
        </select>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="emissions" 
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorEmissions)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default EmissionChart;
