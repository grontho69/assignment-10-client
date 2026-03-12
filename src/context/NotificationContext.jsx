import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_URL || 'https://eco-report-server.vercel.app';
    const newSocket = io(baseUrl, {
      transports: ['websocket', 'polling']
    });
    setSocket(newSocket);

    newSocket.on('notification', (data) => {
      setNotifications(prev => [{
        id: Date.now(),
        text: data.message,
        date: new Date(),
        read: false,
        ...data
      }, ...prev]);
    });

    return () => newSocket.close();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    if (id) {
       setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } else {
       setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }
  };

  const clearNotifications = () => setNotifications([]);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
