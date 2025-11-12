import React, { useState, useEffect } from 'react';
import UnifiedNavbar from '../common/UnifiedNavbar';
import ContactSection from '../common/ContactSection';

const CustomerDashboard = ({ currentPage, setCurrentPage }) => {
    const [plants, setPlants] = useState([]);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Fetch customer data - placeholder for now
        setPlants([
            { id: 1, plantTag: 'PLANT-001', plantType: 'Indoor Plant', species: 'Ficus Benjamina', status: 'HEALTHY' },
            { id: 2, plantTag: 'PLANT-002', plantType: 'Succulent', species: 'Jade Plant', status: 'HEALTHY' }
        ]);
        setRequests([
            { id: 1, title: 'Plant Maintenance', status: 'IN_PROGRESS', createdAt: '2024-11-08' },
            { id: 2, title: 'Watering Service', status: 'COMPLETED', createdAt: '2024-11-07' }
        ]);
    }, []);

    const handleSearch = (query) => {
        console.log('Customer search:', query);
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
                    <h1 className="text-3xl font-bold text-[#386641] mb-8">Customer Dashboard</h1>
                
                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                    <button className="bg-[#A7C957] text-[#386641] px-6 py-2 rounded-lg font-semibold hover:bg-[#BCDE82] transition-colors">
                        Request Plant Service
                    </button>
                </div>

                {/* Plants */}
                <div className="bg-white rounded-lg shadow mb-8">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold text-gray-800">My Plants</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plant Tag</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Species</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {plants.map(plant => (
                                    <tr key={plant.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{plant.plantTag}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plant.plantType}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plant.species}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                                {plant.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Service Requests */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold text-gray-800">My Service Requests</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {requests.map(request => (
                                    <tr key={request.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                request.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                request.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.createdAt}</td>
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

export default CustomerDashboard;