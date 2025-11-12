import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './Dashboard.css';

const WorkerDashboard = () => {
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

    return (
        <div className="dashboard-page">
            <Navbar />
            <div className="dashboard-content pt-20">
                <div className="dashboard-container">
                    <h1 className="dashboard-title">Worker Dashboard</h1>
                    
                    {/* Work Orders */}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">My Work Orders</h2>
                        </div>
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Status</th>
                                        <th>Scheduled</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {workOrders.map(order => (
                                        <tr key={order.id}>
                                            <td className="font-medium">{order.title}</td>
                                            <td>
                                                <span className={`status-badge ${
                                                    order.status === 'COMPLETED' ? 'completed' :
                                                    order.status === 'IN_PROGRESS' ? 'in-progress' :
                                                    'scheduled'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>{order.scheduledDate}</td>
                                            <td>
                                                {order.status === 'SCHEDULED' && (
                                                    <button 
                                                        onClick={() => updateWorkOrderStatus(order.id, 'IN_PROGRESS')}
                                                        className="action-btn small"
                                                    >
                                                        Start
                                                    </button>
                                                )}
                                                {order.status === 'IN_PROGRESS' && (
                                                    <button 
                                                        onClick={() => updateWorkOrderStatus(order.id, 'COMPLETED')}
                                                        className="action-btn small success"
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
        </div>
    );
};

export default WorkerDashboard;