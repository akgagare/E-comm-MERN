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
          token: token,
        });
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
      <div className="bg-white p-3 w-35 h-55 rounded-lg">
        <h2>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>
              <strong>Email</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              value={email}
              className="form-control rounded-0 shadow-lg h-12 ml-2 rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              className="form-control rounded-0 rounded-mg shadow-lg border-gray-400 h-12 ml-2 border-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold text-xl px-8 py-3 rounded-full shadow-lg transition duration-300"
            >
                Login
            </button>
          </div>
        </form>
        <p className='text-3xl text-gray-400'>Don't have an account?</p>
        <Link
          to="/register"
          className="btn btn-default text-3xl border w-100 bg-light rounded-0 text-decoration-none"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginUser;
