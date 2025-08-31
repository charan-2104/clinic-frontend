
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import UpdateCredentials from './UpdateCredentials'; 

const API_URL = import.meta.env.VITE_API_URL;
const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showUpdateCredentials, setShowUpdateCredentials] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      await axios.get(`${API_URL}/api/admin/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem('adminToken');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (token) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  const handleOpenUpdateCredentials = () => {
    setShowUpdateCredentials(true);
  };

  const handleCloseUpdateCredentials = () => {
    setShowUpdateCredentials(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <AdminDashboard 
          onLogout={handleLogout} 
          onUpdateCredentials={handleOpenUpdateCredentials}
        />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
      
      {showUpdateCredentials && (
        <UpdateCredentials onClose={handleCloseUpdateCredentials} />
      )}
    </>
  );
};

export default Admin;