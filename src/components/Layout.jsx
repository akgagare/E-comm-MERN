import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='min-h-screen bg-purple-400'>
      <Navbar />
      <div className="pt-20 px-4"> {/* pt-20 for navbar space */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
