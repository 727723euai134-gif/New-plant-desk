import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SignupPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({ 
        firstName: '', 
        lastName: '', 
        email: '', 
        password: '', 
        confirmPassword: '', 
        rolePassword: '', 
        role: 'CUSTOMER', 
        phone: '', 
        address: '' 
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState([]);
    
    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) errors.push('At least 8 characters');
        if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
        if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
        if (!/\d/.test(password)) errors.push('One number');
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('One special character');
        return errors;
    };
    
    const validateRolePassword = (role, rolePassword) => {
        if (role === 'ADMIN' && rolePassword !== 'ADMIN1234') {
            return 'Invalid admin password';
        }
        if (role === 'TECHNICIAN' && rolePassword !== 'WORKER1234') {
            return 'Invalid maintenance worker password';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        // Validate password criteria
        const pwdErrors = validatePassword(formData.password);
        if (pwdErrors.length > 0) {
            setError(`Password must have: ${pwdErrors.join(', ')}`);
            setLoading(false);
            return;
        }
        
        // Validate password confirmation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }
        
        // Validate role-specific password
        if (formData.role !== 'CUSTOMER') {
            const roleError = validateRolePassword(formData.role, formData.rolePassword);
            if (roleError) {
                setError(roleError);
                setLoading(false);
                return;
            }
        }
        
        const result = await register(formData);
        
        if (result.success) {
            // Redirect to login page after successful registration
            navigate('/login');
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Real-time password validation
        if (name === 'password') {
            setPasswordErrors(validatePassword(value));
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl border-t-8 border-[#A7C957]">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Join Plant-on-Desk
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Create your account and select your role
                    </p>
                </div>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}
                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Role</label>
                        <select
                            name="role" value={formData.role} onChange={handleChange} required
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#A7C957] focus:border-[#A7C957] text-gray-900"
                        >
                            <option value="CUSTOMER">🏢 Customer - Manage plants and request services</option>
                            <option value="TECHNICIAN">🔧 Maintenance Specialist - Handle plant care tasks</option>
                            <option value="ADMIN">👨‍💼 Administrator - System management and oversight</option>
                        </select>
                    </div>

                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                id="first-name" name="firstName" type="text" required
                                value={formData.firstName} onChange={handleChange}
                                className="w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#A7C957] focus:border-[#A7C957] transition-all"
                                placeholder="First Name"
                            />
                        </div>
                        <div>
                            <input
                                id="last-name" name="lastName" type="text" required
                                value={formData.lastName} onChange={handleChange}
                                className="w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#A7C957] focus:border-[#A7C957] transition-all"
                                placeholder="Last Name"
                            />
                        </div>
                    </div>

                    <div>
                        <input
                            id="signup-email" name="email" type="email" autoComplete="email" required
                            value={formData.email} onChange={handleChange}
                            className="w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#A7C957] focus:border-[#A7C957] transition-all"
                            placeholder="Email Address"
                        />
                    </div>

                    <div>
                        <input
                            id="signup-password" name="password" type="password" autoComplete="new-password" required
                            value={formData.password} onChange={handleChange}
                            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-[#A7C957] focus:border-[#A7C957] transition-all ${
                                passwordErrors.length > 0 ? 'border-red-300' : 'border-gray-300'
                            } placeholder-gray-500 text-gray-900`}
                            placeholder="Password"
                        />
                        {passwordErrors.length > 0 && (
                            <div className="mt-1 text-xs text-red-600">
                                <p>Password must have:</p>
                                <ul className="list-disc list-inside">
                                    {passwordErrors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    
                    <div>
                        <input
                            id="confirm-password" name="confirmPassword" type="password" required
                            value={formData.confirmPassword} onChange={handleChange}
                            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-[#A7C957] focus:border-[#A7C957] transition-all ${
                                formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-300' : 'border-gray-300'
                            } placeholder-gray-500 text-gray-900`}
                            placeholder="Confirm Password"
                        />
                        {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                            <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
                        )}
                    </div>
                    
                    {/* Role-specific password field */}
                    {formData.role !== 'CUSTOMER' && (
                        <div>
                            <input
                                id="role-password" name="rolePassword" type="password" required
                                value={formData.rolePassword} onChange={handleChange}
                                className="w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#A7C957] focus:border-[#A7C957] transition-all"
                                placeholder={`${formData.role === 'ADMIN' ? 'Admin' : 'Maintenance Worker'} Password`}
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Contact system administrator for the {formData.role === 'ADMIN' ? 'admin' : 'maintenance worker'} password
                            </p>
                        </div>
                    )}

                    {/* Optional Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                id="phone" name="phone" type="tel"
                                value={formData.phone} onChange={handleChange}
                                className="w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#A7C957] focus:border-[#A7C957] transition-all"
                                placeholder="Phone Number (Optional)"
                            />
                        </div>
                        <div>
                            <input
                                id="address" name="address" type="text"
                                value={formData.address} onChange={handleChange}
                                className="w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#A7C957] focus:border-[#A7C957] transition-all"
                                placeholder="Address (Optional)"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <button
                            type="submit" disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#A7C957] hover:bg-[#BCDE82] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#386641] transition-all transform hover:scale-[1.01] disabled:opacity-50"
                        >
                            {loading ? 'Creating Account...' : `Create ${formData.role === 'TECHNICIAN' ? 'Maintenance Worker' : formData.role} Account`}
                        </button>
                    </div>
                </form>
                <div className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <button onClick={() => navigate('/login')} className="font-medium text-[#386641] hover:text-[#A7C957] transition-colors">
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;