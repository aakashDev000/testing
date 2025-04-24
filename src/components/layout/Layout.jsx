import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ThemeProvider } from '../../contexts/ThemeContext';

const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;