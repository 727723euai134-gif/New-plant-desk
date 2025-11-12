import React, { useState, useEffect } from 'react';
import UnifiedNavbar from '../common/UnifiedNavbar';
import ContactSection from '../common/ContactSection';

const TechnicianDashboard = ({ currentPage, setCurrentPage }) => {
    const [workOrders, setWorkOrders] = useState([]);

    useEffect(() => {
        // Fetch technician data - placeholder for now
        setWorkOrders([
            { id: 1, title: 'Plant Maintenance - PLANT-001', status: 'SCHEDULED', scheduledDate: '2024-11-09' },
            { id: 2, title: 'Watering Service - PLANT-002', status: 'IN_PROGRESS', scheduledDate: '2024-11-08' },
            { id: 3, title: 'Health Check - PLANT-003', status: 'COMPLETED', scheduledDate: '2024-11-07' }
        ]);
    }, []);

    const updateWorkOrderStatus = (id, newStatus) => {
        setWorkOrders(prev => prev.map(wo => 
            wo.id === id ? { ...wo, status: newStatus } : wo
        ));
    };

    const handleSearch = (query) => {
        console.log('Technician search:', query);
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
                    <h1 className="text-3xl font-bold text-[#386641] mb-8">Maintenance Specialist Dashboard</h1>
                
                {/* Work Orders */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold text-gray-800">My Work Orders</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scheduled</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {workOrders.map(order => (
                                    <tr key={order.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                order.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.scheduledDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {order.status === 'SCHEDULED' && (
                                                <button 
                                                    onClick={() => updateWorkOrderStatus(order.id, 'IN_PROGRESS')}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                                                >
                                                    Start
                                                </button>
                                            )}
                                            {order.status === 'IN_PROGRESS' && (
                                                <button 
                                                    onClick={() => updateWorkOrderStatus(order.id, 'COMPLETED')}
                                                    className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                                                >
                                                    Complete
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
            </div>
            <ContactSection />
        </div>
    );
};

export default TechnicianDashboard;