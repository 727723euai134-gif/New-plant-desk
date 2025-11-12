// API configuration - will be connected to backend later
const API_BASE_URL = 'http://localhost:8081/api/v1';

// Authentication API
const authAPI = {
  login: async (credentials) => {
    console.log('Login attempt with:', credentials);
    try {
      // Convert username to email for backend compatibility
      const loginData = {
        email: credentials.username || credentials.email,
        password: credentials.password
      };
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Backend login response:', data);
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (!response) {
        throw new Error('No response from server');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Register error - using mock response:', error);
      // Store user data in localStorage for mock login
      const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '{}');
      mockUsers[userData.email] = {
        email: userData.email,
        password: userData.password,
        role: userData.role || 'CUSTOMER',
        firstName: userData.firstName,
        lastName: userData.lastName
      };
      localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
      
      return {
        message: 'User registered successfully (mock)',
        user: {
          id: 1,
          username: userData.email,
          role: userData.role || 'CUSTOMER'
        }
      };
    }
  }
};

// Mock API functions for now
export const customerAPI = {
  // Get customer profile with plants and services
  getProfile: () => Promise.resolve({ data: { firstName: 'John', lastName: 'Doe' } }),
  
  // Get customer assets (plants)
  getAssets: () => Promise.resolve({ data: [] }),
  
  // Get service requests
  getServiceRequests: () => Promise.resolve({ data: [] }),
  
  // Book a new service
  bookService: (serviceData) => {
    console.log('Booking service:', serviceData);
    return Promise.resolve({ data: { success: true } });
  },
  
  // Get subscription details
  getSubscription: () => Promise.resolve({ data: { plan: 'Premium' } }),
  
  // Update subscription
  updateSubscription: (planData) => {
    console.log('Updating subscription:', planData);
    return fetch(`${API_BASE_URL}/customer/subscription`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(planData)
    }).then(response => response.json());
  },
  
  // Get billing history
  getBillingHistory: () => Promise.resolve({ data: [] }),
  
  // Get achievements and rewards
  getAchievements: () => Promise.resolve({ data: [] }),
};

// Plant care services with details
export const plantServices = [
  {
    id: 'watering',
    name: 'Deep Watering & Nutrition',
    price: 25,
    duration: '45 min',
    description: 'Comprehensive watering with nutrient-rich solution',
    icon: '💧'
  },
  {
    id: 'pruning',
    name: 'Precision Pruning & Shaping',
    price: 35,
    duration: '30 min',
    description: 'Expert pruning for optimal growth and aesthetics',
    icon: '✂️'
  },
  {
    id: 'fertilizing',
    name: 'Organic Fertilizing',
    price: 30,
    duration: '25 min',
    description: 'Organic nutrient boost for healthy growth',
    icon: '🌱'
  },
  {
    id: 'repotting',
    name: 'Repotting & Soil Refresh',
    price: 45,
    duration: '60 min',
    description: 'Fresh soil and larger pot for growing plants',
    icon: '🏺'
  },
  {
    id: 'health',
    name: 'Complete Health Assessment',
    price: 40,
    duration: '45 min',
    description: 'Thorough health check and care recommendations',
    icon: '🔍'
  },
  {
    id: 'pest',
    name: 'Pest Control Treatment',
    price: 50,
    duration: '40 min',
    description: 'Safe and effective pest elimination',
    icon: '🐛'
  },
  {
    id: 'disease',
    name: 'Disease Prevention Care',
    price: 55,
    duration: '50 min',
    description: 'Preventive treatment against plant diseases',
    icon: '🛡️'
  },
  {
    id: 'propagation',
    name: 'Plant Propagation Service',
    price: 60,
    duration: '90 min',
    description: 'Create new plants from your existing ones',
    icon: '🌿'
  },
  {
    id: 'relocation',
    name: 'Plant Relocation & Setup',
    price: 70,
    duration: '75 min',
    description: 'Safe relocation and optimal placement',
    icon: '📦'
  },
  {
    id: 'consultation',
    name: 'Expert Plant Consultation',
    price: 80,
    duration: '60 min',
    description: 'Personalized advice from plant specialists',
    icon: '👨🌾'
  },
  {
    id: 'emergency',
    name: 'Emergency Plant Rescue',
    price: 100,
    duration: '120 min',
    description: 'Urgent care for critically ill plants',
    icon: '⚡'
  }
];

// Admin API functions
export const adminAPI = {
  getCustomersWithUsers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/customers-with-users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },

  getServiceRequests: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/service-requests`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      console.error('Error fetching service requests:', error);
      throw error;
    }
  },

  getServiceBookings: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/service-bookings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      console.error('Error fetching service bookings:', error);
      throw error;
    }
  },

  getSubscriptions: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/subscriptions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      throw error;
    }
  },

  getKPIs: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/reports/kpis`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      console.error('Error fetching KPIs:', error);
      throw error;
    }
  },

  getCustomerDetails: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/customer/${userId}/details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      console.error('Error fetching customer details:', error);
      throw error;
    }
  }
};

// Default export for authentication
const api = {
  ...authAPI,
  customer: customerAPI,
  admin: adminAPI
};

export default api;
export { authAPI };