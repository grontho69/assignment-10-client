import React, { useEffect, useState } from 'react';
import { userService } from '../services/userService';
import { toast } from 'react-toastify';
import { User, Shield, Mail, Calendar, Edit3, Save, X } from 'lucide-react';
import { RotateLoader } from 'react-spinners';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingEmail, setEditingEmail] = useState(null);
    const [newRole, setNewRole] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await userService.getAllUsers();
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                toast.error("Unauthorized: Admin access only");
            }
        } catch (error) {
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const handleRoleUpdate = async (email) => {
        try {
            const result = await userService.updateUserRole(email, newRole);
            if (result.success) {
                toast.success("User role updated");
                setEditingEmail(null);
                fetchUsers();
            }
        } catch (error) {
            toast.error("Update failed");
        }
    };

    if (loading) {
        return (
            <div className='h-[80vh] flex items-center justify-center'>
                <RotateLoader color="#54b355" size={20} />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <User className="w-8 h-8 text-green-600" />
                    User Management
                </h2>
                <p className="text-gray-500 mt-2">Manage user roles and system access.</p>
            </header>

            <div className="card overflow-hidden">
                <div className="table-container">
                    <table className="table w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="p-4">User</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-left">Role</th>
                                <th className="p-4 text-left">Last Login</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u._id} className="border-b dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 border border-slate-200">
                                                <img 
                                                    src={u.photoURL || "https://ui-avatars.com/api/?name=" + u.name} 
                                                    alt={u.name} 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="font-semibold text-slate-800 dark:text-slate-200">{u.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                            <Mail className="w-4 h-4" />
                                            {u.email}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        {editingEmail === u.email ? (
                                            <select 
                                                className="select select-sm select-bordered w-32"
                                                value={newRole}
                                                onChange={(e) => setNewRole(e.target.value)}
                                            >
                                                <option value="Public">Public</option>
                                                <option value="Researcher">Researcher</option>
                                                <option value="Organization">Organization</option>
                                                <option value="Admin">Admin</option>
                                            </select>
                                        ) : (
                                            <span className={`badge ${
                                                u.role === 'Admin' ? 'badge-error' : 
                                                u.role === 'Organization' ? 'badge-primary' : 
                                                u.role === 'Researcher' ? 'badge-info' : 'badge-ghost'
                                            } text-xs font-bold`}>
                                                {u.role}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-slate-500 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'Never'}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        {editingEmail === u.email ? (
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => handleRoleUpdate(u.email)}
                                                    className="btn btn-sm btn-success p-2"
                                                >
                                                    <Save className="w-4 h-4 text-white" />
                                                </button>
                                                <button 
                                                    onClick={() => setEditingEmail(null)}
                                                    className="btn btn-sm btn-ghost p-2"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button 
                                                onClick={() => {
                                                    setEditingEmail(u.email);
                                                    setNewRole(u.role);
                                                }}
                                                className="btn btn-sm btn-ghost p-2 hover:bg-green-50 hover:text-green-600 text-slate-400"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;
