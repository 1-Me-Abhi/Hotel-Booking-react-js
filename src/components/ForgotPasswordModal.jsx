import React, { useState } from 'react';
import { FaUserCircle, FaTimes } from 'react-icons/fa';

const ForgotPasswordModal = ({ onClose, onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email');
      setIsSuccess(false);
      return;
    }
    
    // In a real app, this would send a reset email
    // For now, just simulate success
    setMessage('A password reset link has been sent to your email.');
    setIsSuccess(true);
    
    // In a real app, you might redirect or close after a delay
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md transition-colors duration-300">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-xl font-semibold flex items-center text-gray-800 dark:text-white">
            <FaUserCircle className="mr-2 text-2xl" /> Forgot Password
          </h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          {message && (
            <div className={`mb-4 p-2 rounded ${isSuccess ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200'}`}>
              {message}
            </div>
          )}
          
          <div className="mb-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-300">
            Note: A link will be sent to your email to reset your password!
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          
          <div className="flex justify-end items-center space-x-3">
            <button 
              type="button"
              onClick={onBackToLogin}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              CANCEL
            </button>
            
            <button 
              type="submit" 
              className="bg-gray-800 hover:bg-gray-700 dark:bg-custom-bg dark:hover:bg-custom-bg-dark text-white px-4 py-2 rounded transition-colors"
            >
              SEND LINK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal; 