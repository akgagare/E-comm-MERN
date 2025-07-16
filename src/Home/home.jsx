import React, { useState } from 'react'
import Product from "../Product/addProduct"
import User from "../User/addUser"
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  const [content,setContent] = useState("");
  const handleChange = (e)=>{
    setContent(e.target.value);
  }
  const handleAI  = async(e) =>{
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/gemini',{
      method:"POST",
      body: JSON.stringify({ prompt: "Hello AI" }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(await response.json());
  }
  return (
   <div className="font-sans text-gray-800">
  {/* Header Section */}
  <div className="flex h-auto w-full py-8 px-4 flex-wrap md:flex-nowrap items-start gap-6">
    {/* Left Text Block */}
    <div className="w-full md:w-[25rem] font-extrabold text-4xl md:text-6xl leading-tight">
      <p>GET VARIETY OF</p>
      <p>PRODUCTS JUST</p>
      <p>IN ARUN'S SALES</p>
    </div>

    {/* Search Section */}
    <div className="w-full md:ml-10 mt-6 md:mt-0">
     

      {/* Brand Info & Product Images */}
      <div className="mt-6 space-y-4">
        <div className="text-xl font-semibold">
          <h2>WE ARE THE BRAND</h2>
          <h2>WE HAVE TOP PRODUCTS</h2>
        </div>

        <div className="flex gap-4 rounded-md p-4  overflow-x-auto hide-scrollbar">
          {[
            "/tide.jpg",
            "/comfort.jpg",
            "/popcorn.jpg",
            "/coca.jpg",
            "/bis.jpg",
            "/ghee.jpg",
            "/milk.jpg",
            "/butter.jpg",
          ].map((src, idx) => (
            <img key={idx} src={src} alt={`product-${idx}`} className="h-36 rounded-lg flex-shrink-0" />
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Features Carousel */}
  <div className="flex rounded-md w-full gap-6 justify-start overflow-x-auto p-4 mt-6">
    {[
      "BUY PRODUCTS",
      "EASY PAYMENT",
      "GET QUALITY",
      "ENJOY FREE DELIVERY",
      "GET PRODUCTS ON A CLICK",
      "GET DISCOUNTS",
    ].map((text, idx) => (
      <div key={idx} className="flex flex-col items-center text-center justify-center h-60 w-60 border-2 border-gray-300 flex-shrink-0 p-2">
        <img src="/logo192.png" alt="logo" className="object-cover mb-2" />
        <p className="font-medium">{text}</p>
      </div>
    ))}
  </div>

  {/* Chatbot Section */}
  <div className="w-full flex-col items-center justify-between gap-6 px-4 py-10 bg-gradient-to-r from-purple-300 to-purple-600">
    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
      <video
        src="/chat-bot.mp4"
        autoPlay
        loop
        muted
        className="w-full md:w-[20rem] h-auto rounded-lg shadow-lg"
      />
      <div className="w-full md:max-w-md space-y-4">
        <h2 className="text-3xl font-bold">HOW CAN I HELP YOU ??</h2>
        <input
          type="text"
          id="content"
          placeholder="Happy to help"
          className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none shadow text-lg"
          onClick={handleAI}
          onChange={handleChange}
        />
      </div>
    </div>

    {/* Empty Placeholder for Bottom Section */}
    <div>
      
    </div>
  </div>
</div>

  )
}
 
export default Home
