import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, userName, userPic, login, logout } = useAuth();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = (userData) => {
    // In a real app, this would validate with an API
    login(userData);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    logout();
  };

  // Animation variants
  const navbarVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const linkVariants = {
    hover: { scale: 1.05, x: 5, transition: { duration: 0.2 } }
  };

  return (
    <motion.nav 
      initial="initial"
      animate="animate"
      variants={navbarVariants}
      className={`${scrolled ? 'backdrop-blur-md bg-white/80 dark:bg-gray-900/80' : 'bg-white dark:bg-gray-900'} 
        px-6 py-3 sticky top-0 z-50 transition-all duration-300
        ${scrolled ? 'shadow-lg dark:shadow-gray-800/30' : 'shadow-md dark:shadow-gray-800/10'}`}
    >
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="text-2xl font-bold font-merienda text-gray-800 dark:text-gray-100 hover:text-custom-bg dark:hover:text-custom-bg transition-all duration-300">
          Hotel Booking
        </Link>
        
        <div className="flex items-center lg:hidden">
          <ThemeToggle />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-4 p-1 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>

        <AnimatePresence>
          <div 
            className={`${mobileMenuOpen ? 'flex' : 'hidden'} w-full lg:flex lg:items-center lg:w-auto mt-4 lg:mt-0 flex-col lg:flex-row`}
          >
            <ul className="lg:flex space-y-2 lg:space-y-0 lg:space-x-6 w-full lg:w-auto">
              {['Home', 'Rooms', 'Facilities', 'Contact', 'About'].map((item, index) => (
                <motion.li key={index} whileHover="hover" variants={linkVariants}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className={`block py-2 text-gray-700 dark:text-gray-200 hover:text-custom-bg dark:hover:text-custom-bg transition-all duration-300
                      ${location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) ? 'font-medium text-custom-bg' : ''}`}
                  >
                    {item === 'Contact' ? 'Contact us' : item}
                    {location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) && (
                      <motion.div 
                        className="h-0.5 bg-custom-bg mt-0.5" 
                        layoutId="navbar-underline"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
            
            <div className="mt-4 lg:mt-0 lg:ml-6 flex items-center w-full lg:w-auto justify-end">
              <div className="hidden lg:block mr-4">
                <ThemeToggle />
              </div>
              
              {isLoggedIn ? (
                <div className="relative group w-full lg:w-auto">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 rounded-full px-3 py-1.5 text-gray-800 dark:text-gray-100 hover:border-custom-bg dark:hover:border-custom-bg transition-all duration-300 w-full lg:w-auto justify-center lg:justify-start"
                  >
                    {userPic ? (
                      <img src={userPic} alt={userName} className="w-7 h-7 rounded-full" />
                    ) : (
                      <FaUserCircle className="w-7 h-7" />
                    )}
                    <span>{userName}</span>
                  </motion.button>
                  <div className="absolute right-0 hidden group-hover:block mt-2 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg dark:shadow-gray-900/30 rounded-xl py-2 border border-gray-100 dark:border-gray-700">
                    <Link to="/profile" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:pl-6">Profile</Link>
                    <Link to="/bookings" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:pl-6">Bookings</Link>
                    <button 
                      onClick={handleLogout} 
                      className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:pl-6"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-3 w-full lg:w-auto justify-center">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowLoginModal(true)} 
                    className="border border-gray-300 dark:border-gray-600 rounded-full px-5 py-1.5 text-gray-800 dark:text-gray-200 hover:border-custom-bg dark:hover:border-custom-bg hover:shadow-md transition-all duration-300"
                  >
                    Login
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowRegisterModal(true)}
                    className="bg-custom-bg text-white rounded-full px-5 py-1.5 hover:bg-custom-bg-dark shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Register
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </AnimatePresence>
      </div>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onLogin={handleLogin}
          onForgotPassword={() => {
            setShowLoginModal(false);
            setShowForgotModal(true);
          }}
        />
      )}
      
      {showRegisterModal && (
        <RegisterModal 
          onClose={() => setShowRegisterModal(false)} 
          onRegister={(userData) => {
            handleLogin(userData);
            setShowRegisterModal(false);
          }}
        />
      )}
      
      {showForgotModal && (
        <ForgotPasswordModal 
          onClose={() => setShowForgotModal(false)}
          onBackToLogin={() => {
            setShowForgotModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </motion.nav>
  );
};

export default Navbar; 