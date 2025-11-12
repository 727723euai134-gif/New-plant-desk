import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useForm } from 'react-hook-form';
import { Calendar, TrendingUp, Award, Bell, Settings, Star, Leaf, Droplets, Heart, Sun, Thermometer, Eye, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api/v1';

const CustomerDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [animateCards, setAnimateCards] = useState(false);
    const [customerData, setCustomerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPlan, setCurrentPlan] = useState('Plant Lover');
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        setAnimateCards(true);
        fetchCustomerData();
    }, []);

    const fetchCustomerData = async () => {
        try {
            // Mock customer data for now
            setTimeout(() => {
                setCustomerData({
                    firstName: user?.username?.split('@')[0] || 'John',
                    lastName: 'Doe',
                    email: user?.username || 'john@example.com',
                    subscription: { plan: 'Plant Lover', status: 'Active', nextBilling: '2024-12-15' }
                });
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error fetching customer data:', error);
            setLoading(false);
        }
    };

    const getFirstName = () => {
        if (customerData?.firstName) return customerData.firstName;
        if (!user?.username) return 'Guest';
        return user.username.split('@')[0] || user.username;
    };



    // Real dashboard data
    const dashboardData = {
        assets: { healthy: 8, warning: 2, critical: 0, total: 10 },
        services: { pending: 3, inProgress: 1, completed: 12 },
        plantScore: 85,
        subscription: { plan: 'Plant Lover', status: 'Active', nextBilling: '2024-12-15' },
        healthData: [
            { month: 'Jul', health: 75, growth: 80 }, { month: 'Aug', health: 78, growth: 82 }, 
            { month: 'Sep', health: 82, growth: 85 }, { month: 'Oct', health: 85, growth: 88 }, 
            { month: 'Nov', health: 87, growth: 90 }, { month: 'Dec', health: 85, growth: 87 }
        ],
        plants: [
            { 
                id: 1, name: 'Monstera Deliciosa', nickname: 'Monty', 
                image: 'https://images.unsplash.com/photo-1545239705-1564e58b9e4a?w=400&h=300&fit=crop',
                health: 95, lastWatered: '2 days ago', nextService: 'Pruning in 3 days',
                care: { light: 'Bright indirect', water: 'Weekly', humidity: '60%' }, category: 'Tropical'
            },
            { 
                id: 2, name: 'Snake Plant', nickname: 'Sammy', 
                image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=300&fit=crop',
                health: 88, lastWatered: '1 week ago', nextService: 'Fertilizing tomorrow',
                care: { light: 'Low to bright', water: 'Bi-weekly', humidity: '40%' }, category: 'Succulent'
            },
            { 
                id: 3, name: 'Peace Lily', nickname: 'Lily', 
                image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
                health: 92, lastWatered: '3 days ago', nextService: 'Repotting next week',
                care: { light: 'Medium indirect', water: 'When soil dry', humidity: '50%' }, category: 'Flowering'
            },
            { 
                id: 4, name: 'Fiddle Leaf Fig', nickname: 'Fiddy', 
                image: 'https://media.istockphoto.com/id/1181864307/photo/fiddle-fig-is-a-tropical-plant-in-the-banyan-family.jpg?s=612x612&w=0&k=20&c=H9aTaYn_DO85frFtLgzHJI76H8-hI10SIP1d-NT5xWI=',
                health: 78, lastWatered: '4 days ago', nextService: 'Health check needed',
                care: { light: 'Bright indirect', water: 'Weekly', humidity: '55%' }, category: 'Tree'
            },
            { 
                id: 5, name: 'Rubber Plant', nickname: 'Ruby', 
                image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
                health: 90, lastWatered: '1 day ago', nextService: 'Leaf cleaning',
                care: { light: 'Medium to bright', water: 'Weekly', humidity: '50%' }, category: 'Tree'
            },
            { 
                id: 6, name: 'Pothos', nickname: 'Patty', 
                image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=300&fit=crop',
                health: 94, lastWatered: '3 days ago', nextService: 'Pruning vines',
                care: { light: 'Low to medium', water: 'When dry', humidity: '45%' }, category: 'Vine'
            },
            { 
                id: 7, name: 'ZZ Plant', nickname: 'Ziggy', 
                image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
                health: 96, lastWatered: '1 week ago', nextService: 'Monthly check',
                care: { light: 'Low to bright', water: 'Monthly', humidity: '35%' }, category: 'Succulent'
            },
            { 
                id: 8, name: 'Bird of Paradise', nickname: 'Birdie', 
                image: 'https://images.unsplash.com/photo-1649314429297-08fcacea1c15?w=400&h=300&fit=crop',
                health: 82, lastWatered: '2 days ago', nextService: 'Humidity boost',
                care: { light: 'Bright direct', water: 'Twice weekly', humidity: '70%' }, category: 'Tropical'
            }
        ],
        achievements: [
            { id: 1, title: 'Plant Whisperer', description: 'Maintained 90%+ health for 30 days', earned: true, icon: '🌱' },
            { id: 2, title: 'Green Guardian', description: 'Successfully cared for 10+ plants', earned: true, icon: '🛡️' },
            { id: 3, title: 'Growth Master', description: 'Achieved 95% plant health score', earned: false, icon: '👑' },
            { id: 4, title: 'Eco Warrior', description: 'Reduced water usage by 20%', earned: true, icon: '💧' }
        ],
        subscriptionPlans: [
            {
                name: 'Starter Green',
                price: 240,
                image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
                features: ['Up to 5 plants', 'Monthly check-ups', 'Basic care guide', 'Email support']
            },
            {
                name: 'Plant Lover',
                price: 550,
                image: 'https://media.istockphoto.com/id/1181864307/photo/fiddle-fig-is-a-tropical-plant-in-the-banyan-family.jpg?s=612x612&w=0&k=20&c=H9aTaYn_DO85frFtLgzHJI76H8-hI10SIP1d-NT5xWI=',
                features: ['Up to 15 plants', 'Bi-weekly maintenance', 'Premium care tips', 'Priority support', 'Plant health analytics']
            },
            {
                name: 'Botanical Expert',
                price: 1050,
                image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
                features: ['Unlimited plants', 'Weekly maintenance', 'Expert consultations', '24/7 support', 'Custom plant selection', 'Growth optimization']
            }
        ]
    };



    const onServiceSubmit = async (data) => {
        try {
            const serviceData = {
                plant: data.plant,
                serviceType: data.serviceType,
                date: data.date,
                time: data.time,
                notes: data.notes || '',
                priority: data.priority || 'NORMAL'
            };
            
            console.log('Service booking data:', serviceData);
            console.log('Making API call to:', `${API_BASE_URL}/customer/service-requests`);
            
            // API call to backend
            const response = await fetch(`${API_BASE_URL}/customer/service-requests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(serviceData)
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log('Service booking response:', result);
                alert('Service booked successfully!');
                setShowServiceModal(false);
                reset();
            } else {
                console.error('Service booking failed:', response.status, response.statusText);
                const errorText = await response.text();
                console.error('Error details:', errorText);
                alert('Failed to book service: ' + response.status);
            }
        } catch (error) {
            console.error('Network error booking service:', error);
            alert('Network error: ' + error.message);
        }
    };

    const handlePlanChange = async (planName) => {
        try {
            console.log('Changing subscription to:', planName);
            console.log('Making API call to:', `${API_BASE_URL}/customer/subscription`);
            
            // API call to update subscription in MySQL
            const response = await fetch(`${API_BASE_URL}/customer/subscription`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ 
                    planName: planName
                })
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log('Subscription update response:', result);
                // Update all local state to reflect the new plan
                setCurrentPlan(planName);
                setCustomerData(prev => ({
                    ...prev,
                    subscription: { ...prev?.subscription, plan: planName }
                }));
                
                // Update dashboard data subscription
                dashboardData.subscription.plan = planName;
                
                alert(`Successfully changed to ${planName} plan!`);
            } else {
                console.error('Subscription update failed:', response.status, response.statusText);
                const errorText = await response.text();
                console.error('Error details:', errorText);
                alert('Failed to update subscription: ' + response.status);
            }
        } catch (error) {
            console.error('Network error updating subscription:', error);
            alert('Network error: ' + error.message);
        }
    };

    const ContactSection = () => (
        <section className="bg-green-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help?</h2>
                    <p className="text-lg text-gray-600">Our plant care experts are here to assist you</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">24/7 Support</h3>
                        <p className="text-gray-600 mb-4">Get instant help from our experts</p>
                        <button 
                            onClick={() => window.open('mailto:support@plantondesk.com', '_blank')}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
                        >
                            Contact Support
                        </button>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">Schedule Service</h3>
                        <p className="text-gray-600 mb-4">Book maintenance visits</p>
                        <button 
                            onClick={() => setShowServiceModal(true)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
                        >
                            Book Service
                        </button>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Leaf className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">Plant Care Tips</h3>
                        <p className="text-gray-600 mb-4">Expert guidance & resources</p>
                        <button 
                            onClick={() => window.open('https://www.wikihow.com/Take-Care-of-Plants', '_blank')}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
                        >
                            View Guide
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-20">
                {/* Header with Plant Background */}
                <div className="relative bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 shadow-lg overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                        <img 
                            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=300&fit=crop&crop=center" 
                            alt="Plants background"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600/70 to-emerald-600/70"></div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex items-center justify-between">
                            <div className="text-white">
                                <h1 className="text-2xl font-bold animate-fade-in">
                                    Greetings, {getFirstName()}! 🌿
                                </h1>
                                <p className="text-green-100 mt-1 text-base animate-slide-up">
                                    {loading ? 'Loading your garden...' : `Welcome to your plant care dashboard`}
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <Leaf className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex space-x-8">
                            {['overview', 'subscription', 'services', 'rewards'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                                        activeTab === tab
                                            ? 'border-green-500 text-green-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            {/* Enhanced Status Cards with Real Data */}
                            <div className="grid md:grid-cols-4 gap-6">
                                <div className={`bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg p-6 text-white transform transition-all duration-500 hover:scale-105 ${animateCards ? 'animate-slide-up' : 'opacity-0'}`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-green-100 text-sm font-medium">Healthy Plants</p>
                                            <p className="text-3xl font-bold">{dashboardData.assets.healthy}</p>
                                            <p className="text-green-100 text-xs mt-1">out of {dashboardData.assets.total} total</p>
                                        </div>
                                        <div className="bg-white/20 p-3 rounded-full">
                                            <Leaf className="w-8 h-8" />
                                        </div>
                                    </div>
                                </div>
                                <div className={`bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg p-6 text-white transform transition-all duration-500 hover:scale-105 ${animateCards ? 'animate-slide-up delay-100' : 'opacity-0'}`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-blue-100 text-sm font-medium">Active Services</p>
                                            <p className="text-3xl font-bold">{dashboardData.services.inProgress + dashboardData.services.pending}</p>
                                            <p className="text-blue-100 text-xs mt-1">in progress</p>
                                        </div>
                                        <div className="bg-white/20 p-3 rounded-full">
                                            <Settings className="w-8 h-8" />
                                        </div>
                                    </div>
                                </div>
                                <div className={`bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl shadow-lg p-6 text-white transform transition-all duration-500 hover:scale-105 ${animateCards ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-purple-100 text-sm font-medium">Plant Score</p>
                                            <p className="text-3xl font-bold">{dashboardData.plantScore}%</p>
                                            <p className="text-purple-100 text-xs mt-1">good care!</p>
                                        </div>
                                        <div className="bg-white/20 p-3 rounded-full">
                                            <TrendingUp className="w-8 h-8" />
                                        </div>
                                    </div>
                                </div>
                                <div className={`bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl shadow-lg p-6 text-white transform transition-all duration-500 hover:scale-105 ${animateCards ? 'animate-slide-up delay-300' : 'opacity-0'}`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-orange-100 text-sm font-medium">Care Streak</p>
                                            <p className="text-3xl font-bold">15</p>
                                            <p className="text-orange-100 text-xs mt-1">days strong!</p>
                                        </div>
                                        <div className="bg-white/20 p-3 rounded-full">
                                            <Award className="w-8 h-8" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Plant Family Display */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                                    <h3 className="text-xl font-bold text-white flex items-center">
                                        <Heart className="w-6 h-6 text-pink-200 mr-2" />
                                        My Plant Family ({dashboardData.plants.length} plants)
                                    </h3>
                                </div>
                                
                                {/* Plant Categories */}
                                <div className="p-6">
                                    {['Tropical', 'Succulent', 'Flowering', 'Tree', 'Vine'].map((category) => {
                                        const categoryPlants = dashboardData.plants.filter(plant => plant.category === category);
                                        if (categoryPlants.length === 0) return null;
                                        
                                        return (
                                            <div key={category} className="mb-8 last:mb-0">
                                                <div className="flex items-center mb-4">
                                                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                                    <h4 className="text-lg font-semibold text-gray-800">{category} Plants</h4>
                                                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                        {categoryPlants.length}
                                                    </span>
                                                </div>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                    {categoryPlants.map((plant, index) => (
                                                        <div key={plant.id} className={`group bg-white border-2 border-gray-100 rounded-lg overflow-hidden hover:border-green-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 ${animateCards ? `animate-fade-in delay-${index * 50}` : 'opacity-0'}`}>
                                                            <div className="relative">
                                                                <img 
                                                                    src={plant.image} 
                                                                    alt={plant.name}
                                                                    className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                                                                />
                                                                <div className="absolute top-2 right-2 flex space-x-1">
                                                                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                                        plant.health >= 90 ? 'bg-green-500 text-white' :
                                                                        plant.health >= 80 ? 'bg-yellow-500 text-white' :
                                                                        'bg-red-500 text-white'
                                                                    }`}>
                                                                        {plant.health}%
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="p-3">
                                                                <h5 className="font-bold text-sm text-gray-900 truncate">{plant.nickname}</h5>
                                                                <p className="text-xs text-gray-600 mb-2 truncate">{plant.name}</p>
                                                                <div className="space-y-1">
                                                                    <div className="flex items-center text-xs text-gray-500">
                                                                        <Droplets className="w-3 h-3 mr-1 text-blue-400" />
                                                                        <span className="truncate">{plant.lastWatered}</span>
                                                                    </div>
                                                                    <div className="flex items-center text-xs text-gray-500">
                                                                        <Sun className="w-3 h-3 mr-1 text-yellow-400" />
                                                                        <span className="truncate">{plant.care.light}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Enhanced Charts */}
                            <div className="grid lg:grid-cols-2 gap-8">
                                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                    <div className="flex items-center mb-6">
                                        <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
                                        <h3 className="text-xl font-bold text-gray-900">Growth Analytics</h3>
                                    </div>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={dashboardData.healthData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey="month" stroke="#666" />
                                            <YAxis stroke="#666" />
                                            <Tooltip 
                                                contentStyle={{ 
                                                    backgroundColor: '#fff', 
                                                    border: '1px solid #e5e7eb', 
                                                    borderRadius: '8px',
                                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                                }} 
                                            />
                                            <Line type="monotone" dataKey="health" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} />
                                            <Line type="monotone" dataKey="growth" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                    <div className="flex items-center mb-6">
                                        <Settings className="w-6 h-6 text-blue-500 mr-2" />
                                        <h3 className="text-xl font-bold text-gray-900">Service Overview</h3>
                                    </div>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={[
                                            { name: 'Completed', value: dashboardData.services.completed, color: '#10B981' },
                                            { name: 'In Progress', value: dashboardData.services.inProgress, color: '#F59E0B' },
                                            { name: 'Pending', value: dashboardData.services.pending, color: '#3B82F6' }
                                        ]}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey="name" stroke="#666" />
                                            <YAxis stroke="#666" />
                                            <Tooltip 
                                                contentStyle={{ 
                                                    backgroundColor: '#fff', 
                                                    border: '1px solid #e5e7eb', 
                                                    borderRadius: '8px',
                                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                                }} 
                                            />
                                            <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Enhanced Daily Tips */}
                            <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-white/20 p-2 rounded-full mr-3">
                                            <Sun className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold">Today's Care Insights</h3>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                            <div className="flex items-center mb-2">
                                                <Droplets className="w-5 h-5 mr-2" />
                                                <span className="font-semibold">Watering Alert</span>
                                            </div>
                                            <p className="text-sm text-green-100">Monty (Monstera) needs water in 2 days. Soil moisture: 35%</p>
                                        </div>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                            <div className="flex items-center mb-2">
                                                <Thermometer className="w-5 h-5 mr-2" />
                                                <span className="font-semibold">Climate Tip</span>
                                            </div>
                                            <p className="text-sm text-green-100">Perfect humidity today (65%)! Great for your tropical plants.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'subscription' && (
                        <div className="space-y-8">
                            {/* Current Plan with Plant Image */}
                            <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                                <div className="absolute right-0 top-0 w-40 h-40 opacity-20">
                                    <img src="https://media.istockphoto.com/id/1181864307/photo/fiddle-fig-is-a-tropical-plant-in-the-banyan-family.jpg?s=612x612&w=0&k=20&c=H9aTaYn_DO85frFtLgzHJI76H8-hI10SIP1d-NT5xWI=" alt="Fiddle Leaf Fig" className="w-full h-full object-cover rounded-full" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center mb-4">
                                        <Star className="w-6 h-6 mr-2" />
                                        <h3 className="text-xl font-bold">Your Current Plan</h3>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-2xl font-bold mb-2">{currentPlan || customerData?.subscription?.plan || dashboardData.subscription.plan} Plan</h4>
                                            <p className="text-green-100 mb-1">Status: {customerData?.subscription?.status || dashboardData.subscription.status}</p>
                                            <p className="text-green-100 text-sm">Next billing: {customerData?.subscription?.nextBilling || dashboardData.subscription.nextBilling}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-4xl font-bold">₹{dashboardData.subscriptionPlans.find(p => p.name === (currentPlan || customerData?.subscription?.plan || dashboardData.subscription.plan))?.price || 550}</p>
                                            <p className="text-green-100">/month</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Plan Cards with Images */}
                            <div className="grid md:grid-cols-3 gap-8">
                                {dashboardData.subscriptionPlans.map((plan, index) => (
                                    <div key={plan.name} className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                                        plan.name === (currentPlan || customerData?.subscription?.plan || dashboardData.subscription.plan) ? 'ring-2 ring-green-500 ring-opacity-50' : ''
                                    }`}>
                                        <div className="relative h-48 overflow-hidden">
                                            <img 
                                                src={plan.image} 
                                                alt={plan.name}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 text-white">
                                                <h4 className="text-xl font-bold">{plan.name}</h4>
                                                <p className="text-3xl font-bold">₹{plan.price}<span className="text-lg font-normal">/mo</span></p>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <ul className="space-y-3 mb-6">
                                                {plan.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-center text-sm text-gray-600">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                            <button 
                                                onClick={() => plan.name !== (currentPlan || customerData?.subscription?.plan || dashboardData.subscription.plan) && handlePlanChange(plan.name)}
                                                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                                                    plan.name === (currentPlan || customerData?.subscription?.plan || dashboardData.subscription.plan)
                                                        ? 'bg-green-500 text-white shadow-lg cursor-default'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700 cursor-pointer'
                                                }`}
                                            >
                                                {plan.name === (currentPlan || customerData?.subscription?.plan || dashboardData.subscription.plan) ? '✓ Current Plan' : (plan.price > (dashboardData.subscriptionPlans.find(p => p.name === (currentPlan || customerData?.subscription?.plan || dashboardData.subscription.plan))?.price || 550) ? 'Upgrade Plan' : 'Change Plan')}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'services' && (
                        <div className="space-y-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Plant Care Services</h3>
                                    <p className="text-gray-600 mt-1">Professional care for your green companions</p>
                                </div>
                                <button 
                                    onClick={() => setShowServiceModal(true)}
                                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center"
                                >
                                    <Calendar className="w-5 h-5 mr-2" />
                                    Book Service
                                </button>
                            </div>

                            {/* Service Cards with Images */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { 
                                        service: 'Deep Watering & Nutrition', 
                                        plant: 'Monty (Monstera)', 
                                        status: 'Completed', 
                                        date: '2024-11-10',
                                        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
                                        technician: 'Sarah Green',
                                        duration: '45 min'
                                    },
                                    { 
                                        service: 'Precision Pruning', 
                                        plant: 'Sammy (Snake Plant)', 
                                        status: 'In Progress', 
                                        date: '2024-11-12',
                                        image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=300&h=200&fit=crop',
                                        technician: 'Mike Forest',
                                        duration: '30 min'
                                    },
                                    { 
                                        service: 'Organic Fertilizing', 
                                        plant: 'Lily (Peace Lily)', 
                                        status: 'Scheduled', 
                                        date: '2024-11-15',
                                        image: 'https://images.unsplash.com/photo-1545239705-1564e58b9e4a?w=300&h=200&fit=crop',
                                        technician: 'Emma Bloom',
                                        duration: '25 min'
                                    },
                                    { 
                                        service: 'Health Assessment', 
                                        plant: 'All Plants', 
                                        status: 'Upcoming', 
                                        date: '2024-11-18',
                                        image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=300&h=200&fit=crop',
                                        technician: 'Dr. Plant',
                                        duration: '60 min'
                                    }
                                ].map((item, index) => (
                                    <div key={index} className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in delay-${index * 100}`}>
                                        <div className="relative h-40 overflow-hidden">
                                            <img 
                                                src={item.image} 
                                                alt={item.plant}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                                    item.status === 'Completed' ? 'bg-green-500 text-white' :
                                                    item.status === 'In Progress' ? 'bg-yellow-500 text-white' :
                                                    item.status === 'Scheduled' ? 'bg-blue-500 text-white' :
                                                    'bg-purple-500 text-white'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h4 className="font-bold text-lg text-gray-900 mb-2">{item.service}</h4>
                                            <p className="text-green-600 font-semibold mb-3">{item.plant}</p>
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <div className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    <span>{item.date}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    <span>{item.technician}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="w-4 h-4 mr-2" />
                                                    <span>{item.duration}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'rewards' && (
                        <div className="space-y-8">
                            {/* Achievement Hero */}
                            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl shadow-lg p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                                    <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop" alt="Achievement" className="w-full h-full object-cover rounded-full" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-white/20 p-3 rounded-full mr-4">
                                            <Award className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold">Plant Care Champion</h3>
                                            <p className="text-purple-100">Level 7 • 2,450 XP</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold">Progress to Level 8</span>
                                            <span className="text-sm">2,450 / 3,000 XP</span>
                                        </div>
                                        <div className="w-full bg-white/20 rounded-full h-3">
                                            <div className="bg-white h-3 rounded-full" style={{ width: '82%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Achievement Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {dashboardData.achievements.map((achievement, index) => (
                                    <div key={achievement.id} className={`relative bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in delay-${index * 100} ${
                                        achievement.earned 
                                            ? 'ring-2 ring-green-500 ring-opacity-50 bg-gradient-to-br from-green-50 to-emerald-50' 
                                            : 'bg-gray-50 opacity-75'
                                    }`}>
                                        {achievement.earned && (
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">✓</span>
                                            </div>
                                        )}
                                        <div className="text-center">
                                            <div className={`text-4xl mb-3 ${achievement.earned ? 'animate-bounce' : 'grayscale'}`}>
                                                {achievement.icon}
                                            </div>
                                            <h4 className={`font-bold text-lg mb-2 ${
                                                achievement.earned ? 'text-gray-900' : 'text-gray-500'
                                            }`}>
                                                {achievement.title}
                                            </h4>
                                            <p className={`text-sm ${
                                                achievement.earned ? 'text-gray-600' : 'text-gray-400'
                                            }`}>
                                                {achievement.description}
                                            </p>
                                            {achievement.earned && (
                                                <div className="mt-3 text-xs text-green-600 font-semibold">
                                                    +100 XP Earned!
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Upcoming Challenges */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <Star className="w-6 h-6 text-yellow-500 mr-2" />
                                    Upcoming Challenges
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                                        <h4 className="font-semibold text-blue-900 mb-2">🌊 Water Warrior</h4>
                                        <p className="text-sm text-blue-700 mb-3">Water your plants for 7 consecutive days</p>
                                        <div className="bg-blue-200 rounded-full h-2">
                                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '57%' }}></div>
                                        </div>
                                        <p className="text-xs text-blue-600 mt-1">4/7 days completed</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                                        <h4 className="font-semibold text-green-900 mb-2">🌱 Growth Guru</h4>
                                        <p className="text-sm text-green-700 mb-3">Help 3 plants reach 95% health</p>
                                        <div className="bg-green-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '33%' }}></div>
                                        </div>
                                        <p className="text-xs text-green-600 mt-1">1/3 plants at target</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Service Booking Modal */}
                {showServiceModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h3 className="text-lg font-semibold mb-4">Book a Service</h3>
                            <form onSubmit={handleSubmit(onServiceSubmit)} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Select Your Plant</label>
                                    <select {...register('plant', { required: true })} className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none">
                                        <option value="">Choose your green friend...</option>
                                        {dashboardData.plants.map(plant => (
                                            <option key={plant.id} value={plant.id}>
                                                {plant.nickname} ({plant.name})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Service Type</label>
                                    <select {...register('serviceType', { required: true })} className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none">
                                        <option value="">What does your plant need?</option>
                                        <option value="watering">💧 Deep Watering & Nutrition ($25)</option>
                                        <option value="pruning">✂️ Precision Pruning & Shaping ($35)</option>
                                        <option value="fertilizing">🌱 Organic Fertilizing ($30)</option>
                                        <option value="repotting">🏺 Repotting & Soil Refresh ($45)</option>
                                        <option value="health">🔍 Complete Health Assessment ($40)</option>
                                        <option value="pest">🐛 Pest Control Treatment ($50)</option>
                                        <option value="disease">🛡️ Disease Prevention Care ($55)</option>
                                        <option value="propagation">🌿 Plant Propagation Service ($60)</option>
                                        <option value="relocation">📦 Plant Relocation & Setup ($70)</option>
                                        <option value="consultation">👨🌾 Expert Plant Consultation ($80)</option>
                                        <option value="emergency">⚡ Emergency Plant Rescue ($100)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Preferred Date & Time</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <input 
                                            type="date" 
                                            {...register('date', { required: true })} 
                                            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none" 
                                        />
                                        <select {...register('time', { required: true })} className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none">
                                            <option value="">Time</option>
                                            <option value="morning">🌅 Morning (9-12 PM)</option>
                                            <option value="afternoon">☀️ Afternoon (12-5 PM)</option>
                                            <option value="evening">🌆 Evening (5-8 PM)</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Special Instructions</label>
                                    <textarea 
                                        {...register('notes')} 
                                        placeholder="Any special care instructions or concerns?"
                                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none h-20 resize-none"
                                    ></textarea>
                                </div>
                                <div className="flex space-x-3 pt-4">
                                    <button 
                                        type="submit" 
                                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-green-700 font-semibold transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                                    >
                                        <Calendar className="w-5 h-5 mr-2" />
                                        Book Service
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => setShowServiceModal(false)}
                                        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 font-semibold transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <ContactSection />

                {/* Custom Animations */}
                <style jsx>{`
                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes slide-up {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes bounce-slow {
                        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                        40% { transform: translateY(-10px); }
                        60% { transform: translateY(-5px); }
                    }
                    .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
                    .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
                    .animate-bounce-slow { animation: bounce-slow 3s infinite; }
                    .delay-100 { animation-delay: 0.1s; }
                    .delay-200 { animation-delay: 0.2s; }
                    .delay-300 { animation-delay: 0.3s; }
                    .delay-400 { animation-delay: 0.4s; }
                `}</style>
            </div>
        </div>
    );
};

export default CustomerDashboard;