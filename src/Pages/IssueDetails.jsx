import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { contributionService } from '../services/contribution.service';
import { toast } from 'react-toastify';

const IssueDetails = () => {
    const loaderData = useLoaderData();
    const { user } = useAuth();
    const [amount, setAmount] = useState('');
    
    // Robust data handling: handle both direct objects and wrapped responses
    const issue = loaderData?.result || loaderData;
    
    if (!issue || !issue.title) {
        return (
            <div className="h-screen flex items-center justify-center flex-col gap-4">
                <h2 className="text-2xl font-black text-rose-500">Resource Unavailable</h2>
                <p className="text-slate-500 font-medium">This report might have been archived or does not exist.</p>
                <button onClick={() => window.history.back()} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold">Go Back</button>
            </div>
        );
    }

    const handleContribute = async (e) => {
        e.preventDefault();
        try {
            await contributionService.createContribution({
                issueId: issue._id,
                issueTitle: issue.title,
                category: issue.category,
                amount: Number(amount),
                email: user.email,
                name: user.name,
                photoURL: user.photoURL
            });
            toast.success("Contribution successful!");
        } catch (err) { toast.error("Failed"); }
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-20 max-w-6xl text-slate-800 dark:text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
                <div className="space-y-8">
                    <img src={issue.image} className="w-full h-[400px] md:h-[600px] object-cover rounded-[3rem] md:rounded-[4rem] shadow-2xl" alt="" />
                </div>
                
                <div className="flex flex-col justify-center">
                    <div className="flex gap-3 mb-6">
                        <span className="px-5 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">{issue.category}</span>
                        <span className="px-5 py-2 bg-slate-100 dark:bg-gray-800 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">{issue.status}</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tighter">{issue.title}</h1>
                    <p className="text-lg md:text-xl text-slate-500 dark:text-gray-400 font-medium leading-relaxed mb-12">{issue.description}</p>
                    
                    <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[3.5rem] shadow-sm border border-slate-50 dark:border-gray-800">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Required Funds</p>
                                <p className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white">${issue.amount}</p>
                            </div>
                        </div>
                        
                        <form onSubmit={handleContribute} className="space-y-4">
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                <input 
                                    type="number" 
                                    placeholder="Enter Amount"
                                    className="w-full h-16 bg-slate-50 dark:bg-gray-800 rounded-2xl pl-12 pr-6 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20" 
                                    value={amount} 
                                    onChange={(e) => setAmount(e.target.value)} 
                                />
                            </div>
                            <button className="w-full h-16 bg-slate-900 dark:bg-emerald-600 text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all">Support Initiative</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default IssueDetails;
