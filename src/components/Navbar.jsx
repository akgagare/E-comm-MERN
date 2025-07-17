import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
const Navbar = () => {
  const [username, setUser] = useState(null);
  const [userRole,setUserRole] = useState(null);
  const [userId,setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const tokenData = localStorage.getItem('token');

    if (tokenData) {
      console.log("tokenData",tokenData);

      try {
        const parsed = JSON.parse(tokenData);
        console.log("parsed data:",parsed);
        setUser(parsed.name); 
        setUserRole(parsed.role);
        setUserId(parsed.id);
      } catch (err) {
        console.error("Failed to parse token:", err);
      }
    }
  }, []); // ✅ Empty dependency array = run only once on mount

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-md shadow-lg z-50 border-b border-white/20">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold flex justify-center items-center gap-4">
          <img src="/logo192.png" className="h-10 w-10" alt="logo" />
          <p className="text-shadow-2xs text-white font-bold shadow-xl">ARUN SALES</p>
        </Link>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-lg hover:text-purple-500 hover:font-bold transition-all duration-700 ">Home</Link>
          {userRole === "admin" ? (<>
            <Link to="/newproduct" className="hover:text-lg hover:text-purple-500 hover:font-bold transition-all duration-700">New Product</Link>
          </>) : (<>
            
          </>)}
          
          <Link to="/viewproduct" className="hover:text-lg hover:text-purple-500 hover:font-bold transition-all duration-700">View Product</Link>
          {username ? (
            <>
              <span className="text-gray-700 font-medium" onClick={()=>navigate(`/user/${userId}`)}><span><FontAwesomeIcon icon={faCartShopping}  className="mr-3 text-xl"/></span>Hi, {username}</span>
              <button onClick={handleLogout} className="text-red-600 font-semibold">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-lg hover:text-purple-500 hover:font-bold transition-all duration-700">Login</Link>
              <Link to="/register" className="hover:text-lg hover:text-purple-500 hover:font-bold transition-all duration-700">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
