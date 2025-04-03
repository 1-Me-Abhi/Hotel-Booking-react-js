import React, { useState } from 'react';
import { FaUserCircle, FaTimes } from 'react-icons/fa';

const LoginModal = ({ onClose, onLogin, onForgotPassword }) => {
  const [formData, setFormData] = useState({
    email_mob: '',
    pass: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email_mob || !formData.pass) {
      setError('Please fill all fields');
      return;
    }
    
    // In a real app, you would validate this against an API
    // For now, just simulate a login
    onLogin({ 
      name: 'Test User',
      pic: ''
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md transition-colors duration-300">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-xl font-semibold flex items-center text-gray-800 dark:text-white">
            <FaUserCircle className="mr-2 text-2xl" /> User Login
          </h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          {error && (
            <div className="mb-4 p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Email / Mobile</label>
            <input
              type="text"
              name="email_mob"
              value={formData.email_mob}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <button 
              type="submit" 
              className="bg-gray-800 hover:bg-gray-700 dark:bg-custom-bg dark:hover:bg-custom-bg-dark text-white px-4 py-2 rounded transition-colors"
            >
              LOGIN
            </button>
            
            <button 
              type="button"
              onClick={onForgotPassword}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal; 