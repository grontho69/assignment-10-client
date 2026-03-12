import React, { useMemo, useState } from 'react';
import { useLoaderData } from 'react-router';
import IssueCard from '../components/IssueCard';
import { Search } from 'lucide-react';
import MyContainer from '../components/MyContainer';

const AllIssues = () => {
    const loaderData = useLoaderData();
    const issues = Array.isArray(loaderData?.result) ? loaderData.result : (Array.isArray(loaderData) ? loaderData : []);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filtered = useMemo(() => {
        return issues.filter(i => {
           const status = (i.status || 'Pending').toLowerCase();
           const matchStatus = status === 'pending';
           const matchSearch = (i.title?.toLowerCase().includes(search.toLowerCase()) || 
                              i.location?.toLowerCase().includes(search.toLowerCase()));
           const matchCategory = category === "All" || i.category === category;
           return matchStatus && matchSearch && matchCategory;
        });
    }, [issues, search, category]);

    // Reset page to 1 if search or category changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [search, category]);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginatedIssues = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="bg-slate-50 dark:bg-gray-950 min-h-screen py-12">
            <MyContainer>
                <div className="mb-12">
                    <h1 className="text-4xl lg:text-5xl font-black text-slate-800 dark:text-white mb-4 tracking-tight">Community Issues</h1>
                    <p className="text-slate-500 font-medium">Browse and support environmental initiatives in your area.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 mb-12">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                        <input 
                            placeholder="Search by title or location..." 
                            className="w-full pl-12 pr-6 h-14 rounded-2xl bg-white dark:bg-gray-900 border-none shadow-sm focus:ring-2 focus:ring-emerald-500/20 outline-none font-medium dark:text-white transition-all" 
                            value={search} onChange={(e) => setSearch(e.target.value)} 
                        />
                    </div>
                </div>

                {paginatedIssues.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {paginatedIssues.map(i => <IssueCard key={i._id} issue={i} />)}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-white dark:bg-gray-900 rounded-[3rem] border border-slate-100 dark:border-gray-800 shadow-sm">
                        <h2 className="text-2xl font-black text-slate-800 dark:text-white">No results found</h2>
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-6 py-3 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 text-slate-600 dark:text-gray-300 rounded-xl text-xs font-black uppercase tracking-widest disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
                        >
                            Prev
                        </button>
                        <span className="text-sm font-bold text-slate-500 dark:text-gray-400 mx-4">
                            {currentPage} / {totalPages}
                        </span>
                        <button 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-6 py-3 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 text-slate-600 dark:text-gray-300 rounded-xl text-xs font-black uppercase tracking-widest disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
                        >
                            Next
                        </button>
                    </div>
                )}
            </MyContainer>
        </div>
    );
};
export default AllIssues;
