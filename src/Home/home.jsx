import React from 'react'
import Product from "../Product/addProduct"
import User from "../User/addUser"
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col gap-4 p-2'>
      <nav className="bg-purple-400 px-8 py-3 shadow-md h-[50px]">
        <ul className="flex justify-between items-center space-x-8 text-white font-semibold">
          <li className="cursor-pointer hover:text-xl transition-all duration-200 ease-in-out">Home</li>
          <li className="cursor-pointer hover:text-xl transition-all duration-200 ease-in-out">About Us</li>
          <li className="cursor-pointer hover:text-xl transition-all duration-200 ease-in-out">Contact</li>
        </ul>
      </nav>
      <div className='flex gap-3 items-center justify-center bg-purple-300 min-h-screen bg-'>
         <button
          className='flex h-15 w-50 bg-pink-200 p-4 rounded-xl'
          onClick={() => navigate('/viewproduct')}
        >
          Product
        </button>
        <button
          className='flex h-15 w-30 bg-pink-300 p-4 rounded-xl'
          onClick={() => navigate('/login')}
        >
          User
        </button>
      </div>
     
    </div>
  )
}

export default Home
