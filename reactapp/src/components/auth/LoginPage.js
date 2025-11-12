import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        console.log('Login attempt with email:', formData.email);
        
        const result = await login(formData.email, formData.password);
        
        if (result.success) {
            console.log('LoginPage received role:', result.role);
            // Redirect based on role
            switch(result.role) {
                case 'ADMIN':
                    console.log('Redirecting to admin dashboard');
                    navigate('/admin-dashboard');
                    break;
                case 'CUSTOMER':
                    console.log('Redirecting to customer dashboard');
                    navigate('/customer-dashboard');
                    break;
                case 'TECHNICIAN':
                    console.log('Redirecting to worker dashboard');
                    navigate('/worker-dashboard');
                    break;
                default:
                    console.log('Unknown role, redirecting to home');
                    navigate('/');
            }
        } else {
            console.error('Login failed:', result.error);
            setError(result.error);
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl border-t-8 border-[#386641]">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to Plant-on-Desk
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Access your dashboard
                    </p>
                </div>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                id="email" name="email" type="email" autoComplete="email" required
                                value={formData.email} onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-lg focus:outline-none focus:ring-[#A7C957] focus:border-[#A7C957] focus:z-10 sm:text-sm transition-all"
                                placeholder="Email Address"
                            />
                        </div>
                        <div>
                            <input
                                id="password" name="password" type="password" autoComplete="current-password" required
                                value={formData.password} onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-lg focus:outline-none focus:ring-[#A7C957] focus:border-[#A7C957] focus:z-10 sm:text-sm transition-all"
                                placeholder="Password"
                            />
                        </div>
                    </div>



                    <div>
                        <button
                            type="submit" disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#386641] hover:bg-[#2A4C30] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A7C957] transition-all transform hover:scale-[1.01] disabled:opacity-50"
                        >
                            {loading ? 'Signing In...' : 'Log In'}
                        </button>
                    </div>
                </form>
                <div className="text-center text-sm text-gray-600">
                    Need an account?{' '}
                    <button onClick={() => navigate('/signup')} className="font-medium text-[#A7C957] hover:text-[#386641] transition-colors">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;