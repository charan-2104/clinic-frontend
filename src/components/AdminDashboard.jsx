import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = ({ onLogout, onUpdateCredentials  }) => {
  const [activeTab, setActiveTab] = useState('doctors');
  const [data, setData] = useState({ doctors: [], videos: [], testimonials: [], faqs: [], services: [], beforeafter: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('adminToken');

  // Configure axios with auth header
  const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: { Authorization: `Bearer ${token}` }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [doctors, videos, testimonials, faqs, services, beforeafter] = await Promise.all([
        api.get('/doctors'),
        api.get('/videos'),
        api.get('/testimonials'),
        api.get('/faqs'),
        api.get('/services'),
        api.get('/beforeAfter')
      ]);

      setData({
        doctors: doctors.data,
        videos: videos.data,
        testimonials: testimonials.data,
        faqs: faqs.data,
        services: services.data,
        beforeafter: beforeafter.data
      });
    } catch (error) {
      setError('Failed to fetch data');
      if (error.response?.status === 401) {
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({});
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await api.delete(`/${activeTab}/${id}`);
      fetchData();
    } catch (error) {
      setError('Failed to delete item');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create FormData for file uploads (for doctors and services with image)
      let requestData;
      let config = {};
      
      if ((activeTab === 'doctors' || activeTab === 'services' || activeTab === 'beforeafter') && formData.img instanceof File) {
        // Use FormData for file upload
        requestData = new FormData();
        Object.keys(formData).forEach(key => {
          requestData.append(key, formData[key]);
        });
        config.headers = {
          'Content-Type': 'multipart/form-data',
        };
      } else {
        requestData = formData;
      }

      if (editingItem) {
        await api.put(`/${activeTab}/${editingItem._id}`, requestData, config);
      } else {
        await api.post(`/${activeTab}`, requestData, config);
      }
      
      setShowForm(false);
      fetchData();
    } catch (error) {
      setError('Failed to save item');
    }
  };

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      // Handle file input
      const file = e.target.files[0];
      if (file) {
        setFormData({
          ...formData,
          [e.target.name]: file
        });
      }
    } else {
      // Handle regular text inputs
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const renderForm = () => {
    const fields = {
      doctors: ['name', 'degree', 'expertise', 'experience', 'img'],
      videos: ['title', 'videoType', 'url'],
      testimonials: ['name', 'role', 'rating', 'review'],
      faqs: ['q', 'a'],
      services: ['title', 'description', 'category', 'img'],
      beforeafter: ['title', 'img'],
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">
            {editingItem ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields[activeTab].map(field => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {(field === 'review' || field === 'a' || field === 'description') ? (
                  <textarea
                    name={field}
                    value={formData[field] || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    rows="3"
                  />
                ) : field === 'rating' ? (
                  <input
                    type="number"
                    name={field}
                    value={formData[field] || ''}
                    onChange={handleChange}
                    required
                    min="1"
                    max="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                ) : (field === 'category' || field === 'videoType') ? (
                  <select
                    name={field}
                    value={formData[field] || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">
                      {field === 'category' ? 'Select Category' : 'Select Video Type'}
                    </option>
                    {field === 'category' && activeTab === 'services' ? (
                      <>
                        <option value="skin">Skin</option>
                        <option value="hair">Hair</option>
                      </>
                    ) : field === 'videoType' && activeTab === 'videos' ? (
                      <>
                        <option value="youtube">YouTube</option>
                        <option value="short">Short</option>
                      </>
                    ) : null}
                  </select>
                ) : (field === 'img' && (activeTab === 'doctors' || activeTab === 'services' || activeTab === 'beforeafter')) ? (
                  <input
                    type="file"
                    name={field}
                    onChange={handleChange}
                    accept="image/*"
                    required={!editingItem}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                ) : (
                  <input
                    type="text"
                    name={field}
                    value={formData[field] || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                )}
              </div>
            ))}
            <div className="flex space-x-2">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                {editingItem ? 'Update' : 'Add'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderTable = () => {
    const currentData = data[activeTab] || [];
    
    if (currentData.length === 0) {
      return <p className="text-gray-500 text-center py-8">No {activeTab} found.</p>;
    }

    const columns = {
      doctors: ['Name', 'Degree', 'Expertise', 'Experience'],
      videos: ['Title', 'Type', 'URL'],
      testimonials: ['Name', 'Role', 'Rating', 'Review'],
      faqs: ['Question', 'Answer'],
      services: ['Title', 'Category', 'Description', 'Image'],
      beforeafter: ['Title', 'Image'],
    };

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns[activeTab].map(column => (
                <th key={column} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map(item => (
              <tr key={item._id}>
                {activeTab === 'doctors' && (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.degree}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.expertise}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.experience}</td>
                  </>
                )}
                {activeTab === 'videos' && (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{item.videoType}</td>
                    <td className="px-6 py-4 text-sm text-blue-600 underline">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        Watch
                      </a>
                    </td>
                  </>
                )}
                {activeTab === 'testimonials' && (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.rating}/5</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.review.substring(0, 50)}...</td>
                  </>
                )}
                {activeTab === 'faqs' && (
                  <>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.q}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.a.substring(0, 50)}...</td>
                  </>
                )}
                {activeTab === 'services' && (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        item.category === 'skin' ? 'bg-blue-100 text-blue-800' : 
                        item.category === 'hair' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) : 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.description.substring(0, 50)}...</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.img && (
                        <img 
                          src={item.img} 
                          alt={item.title} 
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                    </td>
                  </>
                )}
                {activeTab === 'beforeafter' && (
                  <>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.img && (
                        <img 
                          src={item.img} 
                          alt={item.title} 
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                    </td>
                  </>
                )}

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={onUpdateCredentials}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Update Credentials
            </button>
            <button
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="mb-6">
          <nav className="flex space-x-8">
            {['doctors', 'videos', 'testimonials', 'faqs', 'services', 'beforeafter'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="mb-4">
          <button
            onClick={handleAdd}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add {activeTab.slice(0, -1)}
          </button>
        </div>

        {renderTable()}
      </div>

      {showForm && renderForm()}
    </div>
  );
};

export default AdminDashboard;