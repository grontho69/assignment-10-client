import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="pl-64">
        <Topbar />
        <main className="pt-28 pb-12 px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
