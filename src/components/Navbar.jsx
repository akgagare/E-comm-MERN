import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-md shadow-lg z-50 border-b border-white/20">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold flex justify-center items-center gap-4"><img src="/logo192.png" className='h-10 w-10'></img>ARUN SALES</h1>
        <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/newproduct">New Product</Link>
          <Link to="/viewproduct">View Product</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
