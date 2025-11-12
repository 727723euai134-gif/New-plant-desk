import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, UserCheck, Wrench, Calendar, DollarSign, TrendingUp, Bell, Settings, Eye, CheckCircle, Clock, AlertCircle, Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { adminAPI } from '../services/api';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [customers, setCustomers] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [serviceBookings, setServiceBookings] = useState([]);
    const [kpis, setKpis] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    
    // Pagination and search states
    const [customerPage, setCustomerPage] = useState(1);
    const [workerPage, setWorkerPage] = useState(1);
    const [customerSearch, setCustomerSearch] = useState('');
    const [workerSearch, setWorkerSearch] = useState('');
    const [customerSort, setCustomerSort] = useState({ field: 'name', direction: 'asc' });
    const [workerSort, setWorkerSort] = useState({ field: 'name', direction: 'asc' });
    const itemsPerPage = 5;

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            
            // Fetch real data from backend
            const [customersData, serviceBookingsData, kpisData] = await Promise.all([
                adminAPI.getCustomersWithUsers(),
                adminAPI.getServiceBookings(),
                adminAPI.getKPIs()
            ]);

            // Transform customers data
            const transformedCustomers = customersData.map(customer => ({
                id: customer.id,
                name: customer.contactName,
                firstName: customer.firstName,
                email: customer.userEmail,
                companyName: customer.companyName,
                contactPhone: customer.contactPhone,
                status: customer.enabled ? 'Active' : 'Inactive',
                role: customer.userRole,
                createdAt: customer.createdAt,
                subscription: customer.subscription,
                subscriptionStatus: customer.subscriptionStatus
            }));

            // Transform service bookings data
            const transformedBookings = serviceBookingsData.map(booking => ({
                id: booking.id,
                customer: booking.customerName,
                customerEmail: booking.customerEmail,
                userId: booking.userId,
                service: booking.serviceType,
                plant: booking.species || booking.assetType,
                date: booking.scheduledDate,
                time: booking.scheduledTime,
                status: booking.status.replace('_', ' '),
                priority: booking.priority,
                notes: booking.notes,
                createdAt: new Date(booking.createdAt).toLocaleDateString()
            }));

            setCustomers(transformedCustomers);
            setServiceBookings(transformedBookings);
            setKpis(kpisData);

            // Mock workers data (since we don't have technician management yet)
            setWorkers([
                { id: 1, name: 'Sarah Green', email: 'sarah@plantondesk.com', role: 'Plant Specialist', status: 'Available', completedJobs: 45 },
                { id: 2, name: 'Mike Forest', email: 'mike@plantondesk.com', role: 'Maintenance Expert', status: 'Busy', completedJobs: 38 },
                { id: 3, name: 'Emma Bloom', email: 'emma@plantondesk.com', role: 'Care Specialist', status: 'Available', completedJobs: 52 }
            ]);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewCustomer = async (userId) => {
        try {
            console.log('Fetching details for user ID:', userId);
            const customerDetails = await adminAPI.getCustomerDetails(userId);
            console.log('Received customer details:', customerDetails);
            setSelectedCustomer(customerDetails);
            setShowCustomerModal(true);
        } catch (error) {
            console.error('Error fetching customer details:', error);
            alert('Failed to load customer details. Please try again.');
        }
    };

    // Helper functions for sorting and filtering
    const sortData = (data, sortConfig) => {
        return [...data].sort((a, b) => {
            const aValue = a[sortConfig.field];
            const bValue = b[sortConfig.field];
            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const filterData = (data, searchTerm) => {
        if (!searchTerm) return data;
        return data.filter(item => 
            Object.values(item).some(value => 
                value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    const paginateData = (data, page, itemsPerPage) => {
        const startIndex = (page - 1) * itemsPerPage;
        return data.slice(startIndex, startIndex + itemsPerPage);
    };

    // Customer Management Component
    const CustomerManagement = ({ customers, search, setSearch, sort, setSort, page, setPage, itemsPerPage, getStatusColor, handleViewCustomer }) => {
        const filteredCustomers = filterData(customers, search);
        const sortedCustomers = sortData(filteredCustomers, sort);
        const paginatedCustomers = paginateData(sortedCustomers, page, itemsPerPage);
        const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

        const handleSort = (field) => {
            setSort(prev => ({
                field,
                direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
            }));
        };

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-900">Customer Management</h3>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search customers..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onClick={() => handleSort('name')}>
                                        <div className="flex items-center">
                                            Customer
                                            {sort.field === 'name' && (sort.direction === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />)}
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onClick={() => handleSort('companyName')}>
                                        <div className="flex items-center">
                                            Company
                                            {sort.field === 'companyName' && (sort.direction === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />)}
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscription</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onClick={() => handleSort('status')}>
                                        <div className="flex items-center">
                                            Status
                                            {sort.field === 'status' && (sort.direction === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />)}
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {paginatedCustomers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">
                                                {customer.firstName && customer.firstName !== 'N/A' 
                                                    ? customer.firstName 
                                                    : (customer.name && customer.name !== 'N/A' 
                                                        ? customer.name 
                                                        : customer.email.split('@')[0]
                                                    )
                                                }
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{customer.companyName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{customer.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{customer.subscription}</div>
                                            <div className="text-xs text-gray-500">{customer.subscriptionStatus}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                                                {customer.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button 
                                                onClick={() => handleViewCustomer(customer.id)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="text-green-600 hover:text-green-900 mr-3">Edit</button>
                                            <button className="text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => setPage(Math.max(1, page - 1))}
                                disabled={page === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPage(Math.min(totalPages, page + 1))}
                                disabled={page === totalPages}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{((page - 1) * itemsPerPage) + 1}</span> to{' '}
                                    <span className="font-medium">{Math.min(page * itemsPerPage, filteredCustomers.length)}</span> of{' '}
                                    <span className="font-medium">{filteredCustomers.length}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <button
                                        onClick={() => setPage(Math.max(1, page - 1))}
                                        disabled={page === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => setPage(i + 1)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                page === i + 1
                                                    ? 'z-10 bg-green-50 border-green-500 text-green-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                                        disabled={page === totalPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Worker Management Component
    const WorkerManagement = ({ workers, search, setSearch, sort, setSort, page, setPage, itemsPerPage, getStatusColor }) => {
        const filteredWorkers = filterData(workers, search);
        const sortedWorkers = sortData(filteredWorkers, sort);
        const paginatedWorkers = paginateData(sortedWorkers, page, itemsPerPage);
        const totalPages = Math.ceil(filteredWorkers.length / itemsPerPage);

        const handleSort = (field) => {
            setSort(prev => ({
                field,
                direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
            }));
        };

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-900">Worker Management</h3>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search workers..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onClick={() => handleSort('name')}>
                                        <div className="flex items-center">
                                            Worker
                                            {sort.field === 'name' && (sort.direction === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />)}
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onClick={() => handleSort('role')}>
                                        <div className="flex items-center">
                                            Role
                                            {sort.field === 'role' && (sort.direction === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />)}
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onClick={() => handleSort('status')}>
                                        <div className="flex items-center">
                                            Status
                                            {sort.field === 'status' && (sort.direction === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />)}
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onClick={() => handleSort('completedJobs')}>
                                        <div className="flex items-center">
                                            Completed Jobs
                                            {sort.field === 'completedJobs' && (sort.direction === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />)}
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {paginatedWorkers.map((worker) => (
                                    <tr key={worker.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{worker.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{worker.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{worker.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(worker.status)}`}>
                                                {worker.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{worker.completedJobs}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="text-green-600 hover:text-green-900 mr-3">Edit</button>
                                            <button className="text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => setPage(Math.max(1, page - 1))}
                                disabled={page === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPage(Math.min(totalPages, page + 1))}
                                disabled={page === totalPages}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{((page - 1) * itemsPerPage) + 1}</span> to{' '}
                                    <span className="font-medium">{Math.min(page * itemsPerPage, filteredWorkers.length)}</span> of{' '}
                                    <span className="font-medium">{filteredWorkers.length}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <button
                                        onClick={() => setPage(Math.max(1, page - 1))}
                                        disabled={page === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => setPage(i + 1)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                page === i + 1
                                                    ? 'z-10 bg-green-50 border-green-500 text-green-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                                        disabled={page === totalPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Analytics data
    const analyticsData = {
        chartData: [
            { month: 'Jul', requests: 25, revenue: 2500 },
            { month: 'Aug', requests: 32, revenue: 3200 },
            { month: 'Sep', requests: 28, revenue: 2800 },
            { month: 'Oct', requests: 45, revenue: 4500 },
            { month: 'Nov', requests: 38, revenue: 3800 },
            { month: 'Dec', requests: 42, revenue: 4200 }
        ],
        serviceTypes: [
            { name: 'Watering', value: 35, color: '#3B82F6' },
            { name: 'Pruning', value: 25, color: '#10B981' },
            { name: 'Health Check', value: 20, color: '#F59E0B' },
            { name: 'Repotting', value: 15, color: '#EF4444' },
            { name: 'Others', value: 5, color: '#8B5CF6' }
        ]
    };

    const getStatusColor = (status) => {
        switch (status?.toUpperCase()) {
            case 'ACTIVE': case 'AVAILABLE': case 'COMPLETED': return 'bg-green-100 text-green-800';
            case 'PENDING': case 'BUSY': case 'OPEN': return 'bg-yellow-100 text-yellow-800';
            case 'INACTIVE': case 'EXPIRED': case 'CANCELLED': return 'bg-red-100 text-red-800';
            case 'IN PROGRESS': case 'IN_PROGRESS': case 'ASSIGNED': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority?.toUpperCase()) {
            case 'HIGH': case 'URGENT': return 'bg-red-100 text-red-800';
            case 'MEDIUM': case 'NORMAL': return 'bg-blue-100 text-blue-800';
            case 'LOW': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-20">
                {/* Header - Increased size */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-700 shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="flex items-center justify-between">
                            <div className="text-white">
                                <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                                <p className="text-green-100 text-lg">Manage your Plant-on-Desk platform</p>
                                <div className="mt-4 flex space-x-6 text-sm">
                                    <div className="flex items-center">
                                        <Users className="w-4 h-4 mr-1" />
                                        <span>{kpis.totalCustomers || 0} Customers</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        <span>{kpis.totalServiceBookings || 0} Service Bookings</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        <span>{kpis.pendingBookings || 0} Pending</span>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <Settings className="w-10 h-10 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex space-x-8">
                            {[
                                { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp },
                                { id: 'customers', label: 'Manage Customers', icon: Users },
                                { id: 'workers', label: 'Manage Workers', icon: UserCheck }
                            ].map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                                            activeTab === tab.id
                                                ? 'border-green-500 text-green-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            {loading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                                </div>
                            ) : (
                                <>
                                    {/* Stats Cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-blue-100 text-sm font-medium">Total Customers</p>
                                                    <p className="text-3xl font-bold">{kpis.totalCustomers || 0}</p>
                                                </div>
                                                <Users className="w-8 h-8 text-blue-200" />
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-green-100 text-sm font-medium">Total Users</p>
                                                    <p className="text-3xl font-bold">{kpis.totalUsers || 0}</p>
                                                </div>
                                                <UserCheck className="w-8 h-8 text-green-200" />
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-yellow-100 text-sm font-medium">Pending Bookings</p>
                                                    <p className="text-3xl font-bold">{kpis.pendingBookings || 0}</p>
                                                </div>
                                                <Clock className="w-8 h-8 text-yellow-200" />
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-purple-100 text-sm font-medium">Total Assets</p>
                                                    <p className="text-3xl font-bold">{kpis.totalAssets || 0}</p>
                                                </div>
                                                <DollarSign className="w-8 h-8 text-purple-200" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* System Status & Notifications */}
                                    <div className="grid lg:grid-cols-2 gap-8">
                                        <div className="bg-white rounded-xl shadow-lg p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                                <Bell className="w-6 h-6 text-orange-500 mr-2" />
                                                System Notifications
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="flex items-start p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                                                    <div className="flex-shrink-0">
                                                        <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-blue-800">System Update Complete</p>
                                                        <p className="text-xs text-blue-600 mt-1">Platform updated to v2.1.0 with enhanced security features</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                                                    <div className="flex-shrink-0">
                                                        <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-yellow-800">Scheduled Maintenance</p>
                                                        <p className="text-xs text-yellow-600 mt-1">Database maintenance scheduled for Sunday 2:00 AM</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                                                    <div className="flex-shrink-0">
                                                        <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-green-800">Performance Improvement</p>
                                                        <p className="text-xs text-green-600 mt-1">Response time improved by 25% this month</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-xl shadow-lg p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                                <Settings className="w-6 h-6 text-gray-500 mr-2" />
                                                Platform Status
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center">
                                                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                                        <span className="font-medium text-gray-700">Database</span>
                                                    </div>
                                                    <span className="text-sm text-green-600 font-semibold">Operational</span>
                                                </div>
                                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center">
                                                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                                        <span className="font-medium text-gray-700">API Services</span>
                                                    </div>
                                                    <span className="text-sm text-green-600 font-semibold">Operational</span>
                                                </div>
                                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center">
                                                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                                        <span className="font-medium text-gray-700">Payment Gateway</span>
                                                    </div>
                                                    <span className="text-sm text-green-600 font-semibold">Operational</span>
                                                </div>
                                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center">
                                                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                                                        <span className="font-medium text-gray-700">Email Service</span>
                                                    </div>
                                                    <span className="text-sm text-yellow-600 font-semibold">Degraded</span>
                                                </div>
                                                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                                    <div className="text-sm text-blue-800">
                                                        <strong>Uptime:</strong> 99.8% (Last 30 days)
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Analytics Charts */}
                                    <div className="grid lg:grid-cols-2 gap-8">
                                        <div className="bg-white rounded-xl shadow-lg p-6">
                                            <h4 className="text-xl font-bold text-gray-900 mb-6">Service Bookings Trend</h4>
                                            <ResponsiveContainer width="100%" height={300}>
                                                <LineChart data={analyticsData.chartData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="month" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Line type="monotone" dataKey="requests" stroke="#10B981" strokeWidth={3} />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>

                                        <div className="bg-white rounded-xl shadow-lg p-6">
                                            <h4 className="text-xl font-bold text-gray-900 mb-6">Revenue Trend</h4>
                                            <ResponsiveContainer width="100%" height={300}>
                                                <BarChart data={analyticsData.chartData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="month" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>

                                        <div className="bg-white rounded-xl shadow-lg p-6">
                                            <h4 className="text-xl font-bold text-gray-900 mb-6">Service Types Distribution</h4>
                                            <ResponsiveContainer width="100%" height={300}>
                                                <PieChart>
                                                    <Pie
                                                        data={analyticsData.serviceTypes}
                                                        cx="50%"
                                                        cy="50%"
                                                        outerRadius={100}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                    >
                                                        {analyticsData.serviceTypes.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>

                                        <div className="bg-white rounded-xl shadow-lg p-6">
                                            <h4 className="text-xl font-bold text-gray-900 mb-6">Key Metrics</h4>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                                    <span className="font-medium text-gray-700">Customer Retention Rate</span>
                                                    <span className="text-2xl font-bold text-green-600">94%</span>
                                                </div>
                                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                                    <span className="font-medium text-gray-700">Average Service Rating</span>
                                                    <span className="text-2xl font-bold text-yellow-600">4.8/5</span>
                                                </div>
                                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                                    <span className="font-medium text-gray-700">Worker Efficiency</span>
                                                    <span className="text-2xl font-bold text-blue-600">87%</span>
                                                </div>
                                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                                    <span className="font-medium text-gray-700">Monthly Growth</span>
                                                    <span className="text-2xl font-bold text-purple-600">+12%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="bg-white rounded-xl shadow-lg p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Statistics</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                                <div className="text-2xl font-bold text-blue-600">{serviceBookings.filter(b => b.status === 'PENDING').length}</div>
                                                <div className="text-sm text-blue-600">Pending Bookings</div>
                                            </div>
                                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                                <div className="text-2xl font-bold text-green-600">{serviceBookings.filter(b => b.status === 'CONFIRMED').length}</div>
                                                <div className="text-sm text-green-600">Confirmed Bookings</div>
                                            </div>
                                            <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                                <div className="text-2xl font-bold text-yellow-600">{serviceBookings.filter(b => b.status === 'IN_PROGRESS').length}</div>
                                                <div className="text-sm text-yellow-600">In Progress</div>
                                            </div>
                                            <div className="text-center p-4 bg-purple-50 rounded-lg">
                                                <div className="text-2xl font-bold text-purple-600">{customers.filter(c => c.status === 'Active').length}</div>
                                                <div className="text-sm text-purple-600">Active Customers</div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {activeTab === 'customers' && (
                        <CustomerManagement 
                            customers={customers}
                            search={customerSearch}
                            setSearch={setCustomerSearch}
                            sort={customerSort}
                            setSort={setCustomerSort}
                            page={customerPage}
                            setPage={setCustomerPage}
                            itemsPerPage={itemsPerPage}
                            getStatusColor={getStatusColor}
                            handleViewCustomer={handleViewCustomer}
                        />
                    )}

                    {activeTab === 'workers' && (
                        <WorkerManagement 
                            workers={workers}
                            search={workerSearch}
                            setSearch={setWorkerSearch}
                            sort={workerSort}
                            setSort={setWorkerSort}
                            page={workerPage}
                            setPage={setWorkerPage}
                            itemsPerPage={itemsPerPage}
                            getStatusColor={getStatusColor}
                        />
                    )}


                </div>

                {/* Customer Details Modal */}
                {showCustomerModal && selectedCustomer && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">Customer Details</h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            User ID: {selectedCustomer.userId} • 
                                            {selectedCustomer.totalBookings} Service{selectedCustomer.totalBookings !== 1 ? 's' : ''} Booked
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => setShowCustomerModal(false)}
                                        className="text-gray-400 hover:text-gray-600 p-2 hover:bg-white rounded-full transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Name:</span>
                                            <p className="text-gray-900">
                                                {selectedCustomer.firstName && selectedCustomer.firstName !== 'N/A' 
                                                    ? selectedCustomer.firstName 
                                                    : selectedCustomer.email.split('@')[0]
                                                }
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Email:</span>
                                            <p className="text-gray-900">{selectedCustomer.email}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Company:</span>
                                            <p className="text-gray-900">
                                                {selectedCustomer.companyName && selectedCustomer.companyName !== 'N/A' 
                                                    ? selectedCustomer.companyName 
                                                    : 'Not specified'
                                                }
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Phone:</span>
                                            <p className="text-gray-900">
                                                {selectedCustomer.contactPhone && selectedCustomer.contactPhone !== 'N/A' 
                                                    ? selectedCustomer.contactPhone 
                                                    : 'Not provided'
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                        Service Bookings ({selectedCustomer.totalBookings})
                                    </h4>
                                    {selectedCustomer.serviceBookings && selectedCustomer.serviceBookings.length > 0 ? (
                                        <div className="space-y-3">
                                            {selectedCustomer.serviceBookings.map((booking) => (
                                                <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <h5 className="font-semibold text-gray-900 capitalize">
                                                                {booking.serviceType.replace('_', ' ')}
                                                            </h5>
                                                            <p className="text-sm text-gray-600">
                                                                {booking.plantName && booking.plantName !== 'N/A' 
                                                                    ? `${booking.plantName} - ${booking.assetType}` 
                                                                    : 'Plant details not specified'
                                                                }
                                                            </p>
                                                        </div>
                                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                                                            {booking.status.replace('_', ' ')}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                                        <div className="flex items-center">
                                                            <span className="text-gray-500 font-medium">📅 Date:</span>
                                                            <span className="ml-2 text-gray-900">
                                                                {booking.scheduledDate || 'Not scheduled'}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="text-gray-500 font-medium">⏰ Time:</span>
                                                            <span className="ml-2 text-gray-900 capitalize">
                                                                {booking.scheduledTime || 'Not specified'}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="text-gray-500 font-medium">🔥 Priority:</span>
                                                            <span className={`ml-2 px-2 py-1 text-xs rounded-full font-semibold ${getPriorityColor(booking.priority)}`}>
                                                                {booking.priority}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="text-gray-500 font-medium">📝 Created:</span>
                                                            <span className="ml-2 text-gray-900">
                                                                {new Date(booking.createdAt).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {booking.notes && booking.notes.trim() !== '' && booking.notes !== 'N/A' && (
                                                        <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                                                            <span className="text-blue-700 text-sm font-medium">📋 Notes:</span>
                                                            <p className="text-blue-800 text-sm mt-1">{booking.notes}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 text-gray-500">
                                            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                            <h5 className="text-lg font-medium text-gray-600 mb-2">No Service Bookings</h5>
                                            <p className="text-sm">This customer hasn't booked any services yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;