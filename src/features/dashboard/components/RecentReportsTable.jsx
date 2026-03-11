import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MoreVertical } from 'lucide-react';

const reports = [
  { id: 1, title: 'Deforestation in Amazon', location: 'Brazil', impact: 'High', status: 'In Review', date: '2024-03-10' },
  { id: 2, title: 'Plastic Waste in Ganges', location: 'India', impact: 'Medium', status: 'Resolved', date: '2024-03-08' },
  { id: 3, title: 'Air Quality in Beijing', location: 'China', impact: 'Critical', status: 'Urgent', date: '2024-03-05' },
  { id: 4, title: 'Oil Spill in Gulf', location: 'Mexico', impact: 'High', status: 'Investigating', date: '2024-03-01' },
];

const statusStyles = {
  'In Review': 'bg-blue-100 text-blue-600',
  'Resolved': 'bg-emerald-100 text-emerald-600',
  'Urgent': 'bg-rose-100 text-rose-600',
  'Investigating': 'bg-amber-100 text-amber-600',
};

const RecentReportsTable = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm col-span-3"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-800">Recent Environmental Reports</h3>
        <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-50 text-left">
              <th className="pb-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Report Title</th>
              <th className="pb-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Location</th>
              <th className="pb-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Impact</th>
              <th className="pb-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Status</th>
              <th className="pb-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Date</th>
              <th className="pb-4 text-slate-400"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {reports.map((report) => (
              <tr key={report.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-xs">
                      #{report.id}
                    </div>
                    <span className="font-bold text-slate-800 text-sm">{report.title}</span>
                  </div>
                </td>
                <td className="py-4 text-sm text-slate-600 font-medium">{report.location}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    report.impact === 'Critical' ? 'bg-rose-100 text-rose-600' : 
                    report.impact === 'High' ? 'bg-amber-100 text-amber-600' : 
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {report.impact}
                  </span>
                </td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${statusStyles[report.status]}`}>
                    {report.status}
                  </span>
                </td>
                <td className="py-4 text-sm text-slate-500 font-medium">{report.date}</td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all text-slate-400 hover:text-emerald-500">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all text-slate-400">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecentReportsTable;
