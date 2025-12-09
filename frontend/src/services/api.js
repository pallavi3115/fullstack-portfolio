import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========== PUBLIC APIs ==========
export const getProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const getClients = async () => {
  try {
    const response = await api.get('/clients');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
};

export const submitContact = async (contactData) => {
  try {
    const response = await api.post('/contact', contactData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact:', error);
    throw error;
  }
};

export const subscribeNewsletter = async (email) => {
  try {
    const response = await api.post('/subscribe', { email });
    return response.data;
  } catch (error) {
    console.error('Error subscribing:', error);
    throw error;
  }
};

// ========== ADMIN APIs ==========

// Auth
export const adminLogin = async (credentials) => {
  try {
    const response = await api.post('/admin/login', credentials);
    
    if (response.data.success) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminEmail', response.data.admin.email);
    }
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const adminLogout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminEmail');
  window.location.href = '/login';
};

// Projects Management
export const createProject = async (formData) => {
  try {
    const response = await api.post('/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// Clients Management
export const createClient = async (formData) => {
  try {
    const response = await api.post('/clients', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

export const deleteClient = async (id) => {
  try {
    const response = await api.delete(`/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
};

// Contacts Management
export const getAllContacts = async () => {
  try {
    const response = await api.get('/contact');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

// Subscribers Management
export const getAllSubscribers = async () => {
  try {
    const response = await api.get('/subscribe');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    throw error;
  }
};

export default api;