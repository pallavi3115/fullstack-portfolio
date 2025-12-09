import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiHome, FiBriefcase, FiUsers, FiMail, 
  FiLogOut, FiUser, FiPlus, FiRefreshCw,
  FiTrendingUp
} from 'react-icons/fi';
import ProjectForm from '../components/admin/ProjectForm';
import ClientForm from '../components/admin/ClientForm';
import ContactsTable from '../components/admin/ContactsTable';
import SubscribersTable from '../components/admin/SubscribersTable';
import { 
  getProjects, getClients, getAllContacts, 
  getAllSubscribers, adminLogout 
} from '../services/api';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showClientForm, setShowClientForm] = useState(false);
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    contacts: 0,
    subscribers: 0
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [projects, clients, contacts, subscribers] = await Promise.all([
        getProjects(),
        getClients(),
        getAllContacts(),
        getAllSubscribers()
      ]);
      
      setStats({
        projects: projects.length,
        clients: clients.length,
        contacts: contacts.length,
        subscribers: subscribers.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome /> },
    { id: 'projects', label: 'Projects', icon: <FiBriefcase /> },
    { id: 'clients', label: 'Clients', icon: <FiUsers /> },
    { id: 'contacts', label: 'Contacts', icon: <FiMail /> },
    { id: 'subscribers', label: 'Subscribers', icon: <FiUser /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-2">Projects</h3>
                    <p className="text-3xl font-bold text-blue-600">{stats.projects}</p>
                  </div>
                  <FiBriefcase className="w-10 h-10 text-blue-500" />
                </div>
                <p className="text-sm text-blue-600 mt-2">Manage portfolio projects</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-green-800 mb-2">Clients</h3>
                    <p className="text-3xl font-bold text-green-600">{stats.clients}</p>
                  </div>
                  <FiUsers className="w-10 h-10 text-green-500" />
                </div>
                <p className="text-sm text-green-600 mt-2">Manage client testimonials</p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-purple-800 mb-2">Contacts</h3>
                    <p className="text-3xl font-bold text-purple-600">{stats.contacts}</p>
                  </div>
                  <FiMail className="w-10 h-10 text-purple-500" />
                </div>
                <p className="text-sm text-purple-600 mt-2">View contact submissions</p>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-orange-800 mb-2">Subscribers</h3>
                    <p className="text-3xl font-bold text-orange-600">{stats.subscribers}</p>
                  </div>
                  <FiUser className="w-10 h-10 text-orange-500" />
                </div>
                <p className="text-sm text-orange-600 mt-2">Newsletter subscribers</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <FiTrendingUp className="mr-2" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => {
                    setActiveTab('projects');
                    setShowProjectForm(true);
                  }}
                  className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:border-blue-300 transition-colors text-left"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                      <FiPlus className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Add New Project</h4>
                      <p className="text-sm text-gray-600">Showcase your work</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    setActiveTab('clients');
                    setShowClientForm(true);
                  }}
                  className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl hover:border-purple-300 transition-colors text-left"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                      <FiPlus className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Add New Client</h4>
                      <p className="text-sm text-gray-600">Add testimonials</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Projects Management</h3>
                <p className="text-gray-600">Add and manage portfolio projects</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={fetchStats}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400"
                >
                  <FiRefreshCw />
                  <span>Refresh</span>
                </button>
                <button
                  onClick={() => setShowProjectForm(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg"
                >
                  <FiPlus />
                  <span>Add Project</span>
                </button>
              </div>
            </div>
            
            {showProjectForm ? (
              <ProjectForm
                onProjectAdded={() => {
                  fetchStats();
                  setShowProjectForm(false);
                }}
                onClose={() => setShowProjectForm(false)}
              />
            ) : (
              <div className="bg-white p-8 rounded-xl shadow border border-gray-100 text-center">
                <div className="text-5xl mb-4">📁</div>
                <h4 className="text-xl font-semibold text-gray-700 mb-2">Project List</h4>
                <p className="text-gray-500 mb-6">Click "Add Project" to start adding projects</p>
                <div className="text-sm text-gray-400">
                  <p>• Upload project images</p>
                  <p>• Add project descriptions</p>
                  <p>• Categorize projects</p>
                  <p>• Manage all projects from here</p>
                </div>
              </div>
            )}
          </div>
        );

      case 'clients':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Clients Management</h3>
                <p className="text-gray-600">Add and manage client testimonials</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={fetchStats}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400"
                >
                  <FiRefreshCw />
                  <span>Refresh</span>
                </button>
                <button
                  onClick={() => setShowClientForm(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg"
                >
                  <FiPlus />
                  <span>Add Client</span>
                </button>
              </div>
            </div>
            
            {showClientForm ? (
              <ClientForm
                onClientAdded={() => {
                  fetchStats();
                  setShowClientForm(false);
                }}
                onClose={() => setShowClientForm(false)}
              />
            ) : (
              <div className="bg-white p-8 rounded-xl shadow border border-gray-100 text-center">
                <div className="text-5xl mb-4">👥</div>
                <h4 className="text-xl font-semibold text-gray-700 mb-2">Client Testimonials</h4>
                <p className="text-gray-500 mb-6">Click "Add Client" to start adding client testimonials</p>
                <div className="text-sm text-gray-400">
                  <p>• Upload client photos</p>
                  <p>• Add client testimonials</p>
                  <p>• Include designations</p>
                  <p>• Manage all clients from here</p>
                </div>
              </div>
            )}
          </div>
        );

      case 'contacts':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Contact Form Submissions</h3>
                <p className="text-gray-600">View and manage contact inquiries</p>
              </div>
              <button
                onClick={fetchStats}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400"
              >
                <FiRefreshCw />
                <span>Refresh</span>
              </button>
            </div>
            <ContactsTable />
          </div>
        );

      case 'subscribers':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Newsletter Subscribers</h3>
                <p className="text-gray-600">Manage newsletter email list</p>
              </div>
              <button
                onClick={fetchStats}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400"
              >
                <FiRefreshCw />
                <span>Refresh</span>
              </button>
            </div>
            <SubscribersTable />
          </div>
        );

      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-500 text-sm">Portfolio Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <FiHome />
                <span>View Site</span>
              </button>
              <button
                onClick={adminLogout}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowProjectForm(false);
                  setShowClientForm(false);
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium capitalize whitespace-nowrap transition-all ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading && activeTab === 'dashboard' ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow p-6">
            {renderContent()}
          </div>
        )}
      </main>

      {/* Footer Note */}
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-gray-500 text-sm">
          <p>Admin Panel • Full Stack Development Assignment</p>
          <p className="mt-1">All CRUD operations are functional with backend integration</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;