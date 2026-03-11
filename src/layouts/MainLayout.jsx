import React from 'react'
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MyContainer from '../components/MyContainer';

const MainLayout =()=> {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Navbar/>
      <main className="flex-grow">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
};

export default MainLayout;