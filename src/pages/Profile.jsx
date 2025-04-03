import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaAddressCard, FaBirthdayCake, FaMapMarkerAlt, FaKey, FaLock, FaEdit, FaSignOutAlt, FaCalendarCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userName, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: userName || 'User',
    email: 'user@example.com',
    phone: '+1 234 567 8900',
    address: '123 User Street, Sample City',
    pincode: '12345',
    dob: '1990-01-01',
    profilePic: 'https://randomuser.me/api/portraits/men/73.jpg'
  });
  
  const [formData, setFormData] = useState({
    name: profileData.name,
    email: profileData.email,
    phone: profileData.phone,
    address: profileData.address,
    pincode: profileData.pincode,
    dob: profileData.dob
  });
  
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // Update form data when profile data changes
  useEffect(() => {
    setFormData({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      address: profileData.address,
      pincode: profileData.pincode,
      dob: profileData.dob
    });
  }, [profileData]);
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };
  
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would send a request to update the user profile
      setProfileData(formData);
      setSuccessMessage('Profile updated successfully');
      setLoading(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };
  
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simple validation
    if (passwordData.new !== passwordData.confirm) {
      setErrorMessage('New password and confirm password do not match');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would send a request to update the password
      setSuccessMessage('Password updated successfully');
      setPasswordData({
        current: '',
        new: '',
        confirm: ''
      });
      setLoading(false);
      
      // Clear messages after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 3000);
    }, 1000);
  };

  const handleLogout = () => {
    // Call the logout function from AuthContext
    logout();
    // Navigate to home page
    navigate('/');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  if (!isLoggedIn) {
    return null; // Return null during the redirect handled by useEffect
  }
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-12"
    >
      <motion.h2 
        variants={itemVariants} 
        className="text-3xl font-bold text-center mb-12 h-font dark:text-white"
      >
        MY PROFILE
      </motion.h2>
      
      <motion.div 
        variants={itemVariants}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl dark:shadow-gray-900/30 overflow-hidden border border-gray-100 dark:border-gray-700"
      >
        <div className="lg:flex">
          {/* Sidebar */}
          <div className="lg:w-1/3 bg-gray-50/80 dark:bg-gray-700/50 p-6 lg:border-r border-gray-200 dark:border-gray-600">
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <img 
                  src={profileData.profilePic} 
                  alt={profileData.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-lg"
                />
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md cursor-pointer"
                >
                  <FaEdit className="text-custom-bg" />
                </motion.div>
              </div>
              <h3 className="text-xl font-semibold mt-4 dark:text-white">{profileData.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{profileData.email}</p>
            </div>
            
            <div className="space-y-3">
              <motion.button 
                whileHover={{ x: 5 }}
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left py-3 px-4 rounded-xl flex items-center transition-all duration-300 ${
                  activeTab === 'profile' 
                    ? 'bg-custom-bg text-white shadow-md' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200'
                }`}
              >
                <FaUser className={`mr-3 ${activeTab === 'profile' ? 'text-white' : 'text-custom-bg'}`} />
                Profile Settings
              </motion.button>
              
              <motion.button 
                whileHover={{ x: 5 }}
                onClick={() => setActiveTab('password')}
                className={`w-full text-left py-3 px-4 rounded-xl flex items-center transition-all duration-300 ${
                  activeTab === 'password' 
                    ? 'bg-custom-bg text-white shadow-md' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200'
                }`}
              >
                <FaLock className={`mr-3 ${activeTab === 'password' ? 'text-white' : 'text-custom-bg'}`} />
                Change Password
              </motion.button>
              
              <motion.button 
                whileHover={{ x: 5 }}
                onClick={() => navigate('/bookings')}
                className="w-full text-left py-3 px-4 rounded-xl flex items-center hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 transition-all duration-300"
              >
                <FaCalendarCheck className="mr-3 text-custom-bg" />
                My Bookings
              </motion.button>
              
              <motion.button 
                whileHover={{ x: 5 }}
                onClick={handleLogout}
                className="w-full text-left py-3 px-4 rounded-xl flex items-center hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 transition-all duration-300 mt-8"
              >
                <FaSignOutAlt className="mr-3 text-red-500" />
                <span className="text-red-500">Logout</span>
              </motion.button>
            </div>
          </div>
          
          {/* Content */}
          <div className="lg:w-2/3 p-8">
            {successMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 dark:bg-green-900/60 text-green-700 dark:text-green-300 p-4 rounded-xl mb-6 flex items-center"
              >
                <div className="bg-green-200 dark:bg-green-800 rounded-full p-1 mr-2">
                  <svg className="w-5 h-5 text-green-700 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                {successMessage}
              </motion.div>
            )}
            
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 p-4 rounded-xl mb-6 flex items-center"
              >
                <div className="bg-red-200 dark:bg-red-800 rounded-full p-1 mr-2">
                  <svg className="w-5 h-5 text-red-700 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
                {errorMessage}
              </motion.div>
            )}
            
            {activeTab === 'profile' ? (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <h3 className="text-xl font-bold mb-6 dark:text-white">Profile Information</h3>
                <form onSubmit={handleProfileUpdate} className="space-y-5">
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <FaUser className="mr-2 text-custom-bg" /> Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleProfileChange}
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <FaEnvelope className="mr-2 text-custom-bg" /> Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleProfileChange}
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <FaPhone className="mr-2 text-custom-bg" /> Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleProfileChange}
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <FaAddressCard className="mr-2 text-custom-bg" /> Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleProfileChange}
                      rows="3"
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                      required
                    ></textarea>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-custom-bg" /> Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleProfileChange}
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <FaBirthdayCake className="mr-2 text-custom-bg" /> Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleProfileChange}
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="bg-custom-bg hover:bg-custom-bg-dark text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                    >
                      {loading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <FaEdit className="mr-2" />
                      )}
                      <span>{loading ? 'Updating...' : 'Update Profile'}</span>
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <h3 className="text-xl font-bold mb-6 dark:text-white">Change Password</h3>
                <form onSubmit={handlePasswordUpdate} className="space-y-5">
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <FaKey className="mr-2 text-custom-bg" /> Current Password
                    </label>
                    <input
                      type="password"
                      name="current"
                      value={passwordData.current}
                      onChange={handlePasswordChange}
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <FaKey className="mr-2 text-custom-bg" /> New Password
                    </label>
                    <input
                      type="password"
                      name="new"
                      value={passwordData.new}
                      onChange={handlePasswordChange}
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <FaKey className="mr-2 text-custom-bg" /> Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirm"
                      value={passwordData.confirm}
                      onChange={handlePasswordChange}
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="bg-custom-bg hover:bg-custom-bg-dark text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                    >
                      {loading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <FaLock className="mr-2" />
                      )}
                      <span>{loading ? 'Updating...' : 'Update Password'}</span>
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile; 