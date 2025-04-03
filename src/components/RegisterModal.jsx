import React, { useState } from 'react';
import { FaUserPlus, FaTimes } from 'react-icons/fa';

const RegisterModal = ({ onClose, onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenum: '',
    address: '',
    pincode: '',
    dob: '',
    pass: '',
    cpass: '',
    profile: null
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'profile' && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (formData.pass !== formData.cpass) {
      setError('Passwords do not match');
      return;
    }
    
    // Check if all fields are filled
    for (const key in formData) {
      if (!formData[key] && key !== 'profile') {
        setError('Please fill all required fields');
        return;
      }
    }
    
    // In a real app, you would send this to an API
    // For now, just simulate a registration
    onRegister({ 
      name: formData.name,
      pic: formData.profile ? URL.createObjectURL(formData.profile) : ''
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-colors duration-300">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
          <h3 className="text-xl font-semibold flex items-center text-gray-800 dark:text-white">
            <FaUserPlus className="mr-2 text-2xl" /> User Registration
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
              <input
                type="number"
                name="phonenum"
                value={formData.phonenum}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Picture</label>
              <input
                type="file"
                name="profile"
                accept=".jpg, .jpeg, .png, .webp"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-gray-100 dark:file:bg-gray-600 file:text-gray-700 dark:file:text-white"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white"
                rows="1"
                required
              ></textarea>
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Pincode</label>
              <input
                type="number"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Date of birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
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
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
              <input
                type="password"
                name="cpass"
                value={formData.cpass}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>
          
          <div className="text-center mt-4">
            <button 
              type="submit" 
              className="bg-gray-800 hover:bg-gray-700 dark:bg-custom-bg dark:hover:bg-custom-bg-dark text-white px-4 py-2 rounded transition-colors"
            >
              REGISTER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal; 