import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ import the auth context

const LoginUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const { user, message, token } = await res.json();
      console.log('message:', message);
      console.log('token:', token);
      console.log('user:', user);

      if (res.ok && message === 'Success') {
        login({
          id: user._id,
          name: user.name,
          email: user.email,
          role:user.role,
          token: token,
        });
        // localStorage.setItem('token', JSON.stringify({
        //   token: user.token,
        //   name: user.name,
        //   id: user._id,
        //   role: user.role // 👈 make sure this exists
        // }));
        navigate(`/user/${user._id}`);
      } else {
        alert('You are not registered to this service');
        navigate('/register');
      }
    } catch (err){
      console.error('Login error:', err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-200 via-purple-200 to-pink-200 p-6">
  <div className="bg-white p-8 w-96 rounded-lg shadow-2xl">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>
    <form onSubmit={handleSubmit}>
      {/* Email Input */}
      <div className="mb-5">
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Email
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          autoComplete="off"
          name="email"
          value={email}
          className="w-full px-4 py-3 rounded-lg shadow-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password Input */}
      <div className="mb-5">
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={password}
          className="w-full px-4 py-3 rounded-lg shadow-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mb-6">
        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold text-xl py-3 rounded-full shadow-lg transition duration-300"
        >
          Login
        </button>
      </div>
    </form>

    {/* No Account Section */}
    <p className="text-center text-gray-600 text-lg mb-4">Don't have an account?</p>
    <div className="text-center">
      <Link
        to="/register"
        className="text-2xl text-purple-500 hover:text-purple-600 font-semibold"
      >
        Sign Up
      </Link>
    </div>
  </div>
</div>

  );
};

export default LoginUser;