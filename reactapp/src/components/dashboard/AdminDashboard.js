import React, { useState, useEffect } from 'react';
import UnifiedNavbar from '../common/UnifiedNavbar';

const AdminDashboard = ({ currentPage, setCurrentPage }) => {
    const [stats, setStats] = useState({ totalCustomers: 0, totalAssets: 0, activeWorkOrders: 0 });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch KPIs and users - placeholder for now
        setStats({ totalCustomers: 5, totalAssets: 25, activeWorkOrders: 8 });
        setUsers([
            { id: 1, username: 'admin', role: 'ADMIN', email: 'admin@plantondesk.com' },
            { id: 2, username: 'customer1', role: 'CUSTOMER', email: 'customer1@company.com' },
            { id: 3, username: 'maintenance1', role: 'TECHNICIAN', email: 'maintenance1@plantondesk.com' }
        ]);
    }, []);

    const handleSearch = (query) => {
        console.log('Admin search:', query);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <UnifiedNavbar 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onSearch={handleSearch}
            />
            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl font-bold text-[#386641] mb-8">Admin Dashboard</h1>
                
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-700">Total Customers</h3>
                        <p className="text-3xl font-bold text-[#386641]">{stats.totalCustomers}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-700">Total Plants</h3>
                        <p className="text-3xl font-bold text-[#386641]">{stats.totalAssets}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-700">Active Work Orders</h3>
                        <p className="text-3xl font-bold text-[#386641]">{stats.activeWorkOrders}</p>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold text-gray-800">System Users</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                                                user.role === 'TECHNICIAN' ? 'bg-blue-100 text-blue-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                                {user.role === 'TECHNICIAN' ? 'MAINTENANCE SPECIALIST' : user.role}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;