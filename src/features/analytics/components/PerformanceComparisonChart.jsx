import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { subject: 'Air Quality', A: 120, B: 110, fullMark: 150 },
  { subject: 'Water Purity', A: 98, B: 130, fullMark: 150 },
  { subject: 'Forest Cover', A: 86, B: 130, fullMark: 150 },
  { subject: 'Biodiversity', A: 99, B: 100, fullMark: 150 },
  { subject: 'Waste Mgmt', A: 85, B: 90, fullMark: 150 },
  { subject: 'Carbon Opt', A: 65, B: 85, fullMark: 150 },
];

const PerformanceComparisonChart = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-[400px]"
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-800">Environmental Comparison</h3>
        <p className="text-sm text-slate-500">2024 (A) vs 2025 (B) performance</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} hide />
            <Radar
              name="2024"
              dataKey="A"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.6}
            />
            <Radar
              name="2025"
              dataKey="B"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.6}
            />
            <Legend verticalAlign="bottom" height={36}/>
            <Tooltip 
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
              }} 
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default PerformanceComparisonChart;
