import React, { useMemo, useState } from 'react';
import { useLoaderData, Link } from 'react-router';
import IssueCard from '../components/IssueCard';
import { Search, ArrowRight, Leaf, Shield, Heart } from 'lucide-react';
import MyContainer from '../components/MyContainer';
import { motion } from 'framer-motion';

const Home = () => {
    const recentIssues = useLoaderData() || [];

    return (
        <div className="bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors">
            {}
            <section className="relative pt-32 pb-44 overflow-hidden">
                <MyContainer>
                    <div className="max-w-4xl">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="flex items-center gap-3 text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px] mb-8">
                                <span className="w-12 h-px bg-emerald-600"></span>
                                Citizen Action Network
                            </div>
                            <h1 className="text-7xl lg:text-8xl font-black text-slate-800 dark:text-white leading-[0.9] tracking-tighter mb-10">
                                Heal Your <br /> 
                                <span className="text-emerald-500">City.</span> Together.
                            </h1>
                            <p className="text-xl lg:text-2xl text-slate-500 dark:text-gray-400 font-medium leading-relaxed max-w-2xl mb-12">
                                Report structural and environmental concerns in seconds. Join 8,000+ verified citizens making our urban spaces cleaner and safer.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <Link to="/all-issues" className="h-16 px-10 bg-slate-900 dark:bg-emerald-600 text-white flex items-center justify-center gap-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-black transition-all hover:scale-105 active:scale-95">
                                    Explore Active Issues <ArrowRight size={18} />
                                </Link>
                                <Link to="/add-issue" className="h-16 px-10 bg-white dark:bg-gray-800 text-slate-800 dark:text-white border dark:border-gray-700 flex items-center justify-center gap-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
                                    Report New Concern
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </MyContainer>
                {}
                <div className="absolute top-0 right-0 w-[40%] h-full bg-slate-100 dark:bg-gray-900/50 -z-10 skew-x-[-12deg] translate-x-20"></div>
                <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] -z-10"></div>
            </section>

            {}
            <section className="py-24 bg-white dark:bg-gray-900">
                <MyContainer>
                    <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-20">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-black text-slate-800 dark:text-white tracking-tight mb-4 text-center sm:text-left">Recent Incidents</h2>
                            <p className="text-slate-500 font-medium text-lg text-center sm:text-left">Latest environmental reports from your community.</p>
                        </div>
                        <Link to="/all-issues" className="text-emerald-600 font-black uppercase text-xs tracking-widest hover:mr-2 transition-all flex items-center gap-2 group">
                            View all issues <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {recentIssues.slice(0, 6).map(issue => (
                            <IssueCard key={issue._id} issue={issue} />
                        ))}
                    </div>
                </MyContainer>
            </section>
        </div>
    );
};
export default Home;
