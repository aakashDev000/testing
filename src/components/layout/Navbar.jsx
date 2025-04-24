import React, { useState, useEffect } from 'react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import ThemeToggle from '../ui/ThemeToggle';
import Container from '../ui/Container';
import profileImage from '../../assets/images/profile.jpeg';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollPosition } = useScrollPosition();
  const isScrolled = scrollPosition > 50;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { title: 'Home', href: '#home' },
    { title: 'About', href: '#about' },
    { title: 'Skills', href: '#skills' },
    { title: 'Professional Journey', href: '#experience' },
    { title: 'Projects', href: '#projects' },
    { title: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? 'py-3 bg-white/95 dark:bg-dark/95 shadow-md backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50' : 'py-5 bg-transparent'}
      `}
    >
      <Container className="flex items-center justify-between px-4 sm:px-6">
        {/* Logo with profile image */}
        <a href="#home" className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-primary-400 dark:border-primary-500 shadow-sm">
            <img 
              src={profileImage} 
              alt="Aakash" 
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">Aakash</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.title} 
              href={link.href} 
              className="nav-link"
            >
              {link.title}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button - Improved for perfect responsive display */}
        <div className="flex items-center md:hidden mobile-menu-container">
          <ThemeToggle className="mr-3" />
          <button
            onClick={toggleMenu}
            className="p-2 focus:outline-none w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6 flex flex-col justify-center items-center">
              <span 
                className={`
                  absolute h-[2px] w-6 rounded-full bg-gray-800 dark:bg-gray-200 transform transition-all duration-300 ease-in-out
                  ${isMenuOpen ? 'rotate-45 translate-y-0' : 'translate-y-[-5px]'}
                `}
              />
              <span 
                className={`
                  absolute h-[2px] w-6 rounded-full bg-gray-800 dark:bg-gray-200 transform transition-all duration-300 ease-in-out
                  ${isMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}
                `}
              />
              <span 
                className={`
                  absolute h-[2px] w-6 rounded-full bg-gray-800 dark:bg-gray-200 transform transition-all duration-300 ease-in-out
                  ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-[5px]'}
                `}
              />
            </div>
          </button>
        </div>
      </Container>

      {/* Enhanced Mobile Menu with better animation */}
      <div 
        className={`
          fixed inset-0 z-40 bg-white/95 dark:bg-dark/98
          backdrop-blur-sm
          transition-all duration-300 ease-in-out transform 
          ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}
          md:hidden
          flex flex-col items-center justify-center
        `}
      >
        {/* Close button for mobile menu */}
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <motion.div 
          className="space-y-6 text-center w-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {navLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : 20 }}
              transition={{ duration: 0.3, delay: isMenuOpen ? 0.1 + index * 0.1 : 0 }}
            >
              <a
                href={link.href}
                className="block text-xl font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 py-3 px-4 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;