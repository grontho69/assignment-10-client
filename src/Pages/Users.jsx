import React, { useEffect, useState } from 'react';
import { userService } from '../services/userService';
import { toast } from 'react-toastify';
import { User, Shield, Mail, Calendar, Edit3, Save, X, Trash2, Search } from 'lucide-react';
import { RotateLoader } from 'react-spinners';
import Swal from 'sweetalert2';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [newRole, setNewRole] = useState('');

    useEffect(() => {
        fetchUsers();
    }, [search]);

    const fetchUsers = async () => {
        try {
            const data = await userService.getAllUsers(search);
            setUsers(data);
        } catch (error) {
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const handleRoleUpdate = async (id) => {
        try {
            const result = await userService.updateUserRole(id, newRole);
            if (result.success) {
                toast.success("User role updated");
                setEditingId(null);
                fetchUsers();
            }
        } catch (error) {
            toast.error("Update failed");
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Delete user?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await userService.deleteUser(id);
                    toast.success("User deleted");
                    fetchUsers();
                } catch (error) {
                    toast.error("Delete failed");
                }
            }
        });
    };

    if (loading && !search) {
        return (
            <div className='h-[80vh] flex items-center justify-center'>
                <RotateLoader color="#54b355" size={20} />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <User className="w-8 h-8 text-green-600" />
                        Admin: User Management
                    </h2>
                    <p className="text-gray-500 mt-2">Manage roles and global system access.</p>
                </div>
                
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Search users..." 
                        className="input pl-10 w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </header>

            <div className="card overflow-hidden">
                <div className="table-container">
                    <table className="table w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="p-4">User</th>
                                <th className="p-4 text-left">Role</th>
                                <th className="p-4 text-left">Last login</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u._id} className="border-b dark:border-gray-700 hover:bg-slate-50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200">
                                                <img 
                                                    src={u.photoURL || `https://ui-avatars.com/api/?name=${u.name}`} 
                                                    alt="" 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-bold">{u.name}</p>
                                                <p className="text-xs text-gray-500">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        {editingId === u._id ? (
                                            <select 
                                                className="select select-sm select-bordered"
                                                value={newRole}
                                                onChange={(e) => setNewRole(e.target.value)}
                                            >
                                                <option value="user">user</option>
                                                <option value="researcher">researcher</option>
                                                <option value="organization">organization</option>
                                                <option value="admin">admin</option>
                                            </select>
                                        ) : (
                                            <span className={`badge ${
                                                u.role === 'admin' ? 'badge-error' : 
                                                u.role === 'organization' ? 'badge-primary' : 
                                                u.role === 'researcher' ? 'badge-info' : 'badge-ghost'
                                            } text-[10px] font-bold uppercase`}>
                                                {u.role}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">
                                        {u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {editingId === u._id ? (
                                                <>
                                                    <button onClick={() => handleRoleUpdate(u._id)} className="btn btn-sm btn-success p-2">
                                                        <Save className="w-4 h-4 text-white" />
                                                    </button>
                                                    <button onClick={() => setEditingId(null)} className="btn btn-sm btn-ghost p-2">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button 
                                                        onClick={() => { setEditingId(u._id); setNewRole(u.role); }}
                                                        className="btn btn-sm btn-ghost p-2 text-slate-400 hover:text-green-600"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(u._id)}
                                                        className="btn btn-sm btn-ghost p-2 text-slate-400 hover:text-rose-600"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
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
