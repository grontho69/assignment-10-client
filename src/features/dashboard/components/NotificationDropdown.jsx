import React, { useState } from 'react';
import { Bell, CheckCircle, XCircle, FileText, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../../context/NotificationContext';

const NotificationDropdown = () => {
    const { notifications, unreadCount, markAsRead, clearNotifications } = useNotifications();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!isOpen) markAsRead();
    };

    const getIcon = (type) => {
        switch (type) {
            case 'REPORT_SUBMITTED': return <FileText className="w-4 h-4 text-blue-500" />;
            case 'REPORT_APPROVED': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
            case 'REPORT_REJECTED': return <XCircle className="w-4 h-4 text-rose-500" />;
            default: return <Bell className="w-4 h-4 text-slate-500" />;
        }
    };

    return (
        <div className="relative">
            <button 
                onClick={toggleDropdown}
                className="relative p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all duration-200"
            >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Notifications</h3>
                            <button 
                                onClick={clearNotifications}
                                className="text-xs text-slate-500 hover:text-rose-500 font-semibold"
                            >
                                Clear All
                            </button>
                        </div>

                        <div className="max-h-[400px] overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-slate-400">
                                    <Bell className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p className="text-sm">No new notifications</p>
                                </div>
                            ) : (
                                notifications.map((n, idx) => (
                                    <div 
                                        key={idx} 
                                        className="p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors flex items-start space-x-3"
                                    >
                                        <div className="mt-1">{getIcon(n.type)}</div>
                                        <div className="flex-1">
                                            <p className="text-sm text-slate-700 font-medium leading-tight">
                                                {n.message}
                                            </p>
                                            <div className="flex items-center mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {notifications.length > 0 && (
                            <div className="p-3 bg-slate-50 text-center">
                                <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700">
                                    View All Activity
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationDropdown;
