import { useState } from 'react';

const UpdateCredentials = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [currentCredentials, setCurrentCredentials] = useState({
    username: '',
    password: ''
  });
  const [newCredentials, setNewCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCurrentCredentialsChange = (e) => {
    setCurrentCredentials({
      ...currentCredentials,
      [e.target.name]: e.target.value
    });
    setError('');
  };
  const API_URL = import.meta.env.VITE_API_URL;
  const handleNewCredentialsChange = (e) => {
    setNewCredentials({
      ...newCredentials,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const verifyCurrentCredentials = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: currentCredentials.username,
          password: currentCredentials.password
        })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setNewCredentials({
          username: currentCredentials.username,
          password: ''
        });
        setStep(2);
      } else {
        setError('Current credentials are invalid');
      }
    } catch (error) {
      setError('Failed to verify credentials');
    } finally {
      setLoading(false);
    }
  };

  const updateCredentials = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!newCredentials.username || !newCredentials.password) {
      setError('Both username and password are required');
      setLoading(false);
      return;
    }

    if (newCredentials.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/admin/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: newCredentials.username,
          password: newCredentials.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Credentials updated successfully!');
        setTimeout(() => {
          onClose();
          localStorage.removeItem('adminToken');
          window.location.reload();
        }, 2000);
      } else {
        setError(data.message || 'Failed to update credentials');
      }
    } catch (error) {
      setError('Failed to update credentials');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setCurrentCredentials({ username: '', password: '' });
    setNewCredentials({ username: '', password: '' });
    setError('');
    setSuccess('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Update Credentials
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {step === 1 ? (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Current Username
              </label>
              <input
                type="text"
                name="username"
                value={currentCredentials.username}
                onChange={handleCurrentCredentialsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Current Password
              </label>
              <input
                type="password"
                name="password"
                value={currentCredentials.password}
                onChange={handleCurrentCredentialsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={verifyCurrentCredentials}
                disabled={loading}
                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-blue-800 text-sm">
                Enter your new credentials below. You can change username, password, or both.
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                New Username
              </label>
              <input
                type="text"
                name="username"
                value={newCredentials.username}
                onChange={handleNewCredentialsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={newCredentials.password}
                onChange={handleNewCredentialsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter new password"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                Back
              </button>
              <button
                type="button"
                onClick={updateCredentials}
                disabled={loading}
                className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateCredentials;