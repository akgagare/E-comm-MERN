import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Register = () => {
  
  const navigate = useNavigate();
  const [form,setForm]  = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
    
  });

  const [error,setError]  = useState();
  const [loading,setLoading]  = useState(false);

  const handleChange =async(e) =>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setError("");

    if(!form.name || !form.email || !form.password){
        setError("Name,email,password are required");
    }
    if(form.password !== form.confirmPassword){
        setError("Password not matching2");
    }
    console.log("name",form.name);
    console.log(form.password,form.confirmPassword);
    try{
        setLoading(true);
        const res = await fetch("http://localhost:3000/api/user/register",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(form),
        });
        if(!res.ok){
            const {message} = await res.json();
            navigate("/register")
            throw new Error(message || "Unable to create user");
        }
        navigate('/login');
        setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      });
    }
    catch(error){
        console.log("Error is occuring in form",error);
    }
    finally{
        setLoading(false);
    }
  }

  return (
     <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow rounded-2xl my-4 bg-gradient-to-tr from-blue-200 via-purple-200 to-pink-200">

      <h2 className="text-2xl font-semibold mb-4">Create New User</h2>

      {/* name & email */}
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">E‑mail</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="john@example.com"
            required
          />
        </div>

        {/* password */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder=".........."
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder=".........."
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
        </div>
      </div>

      {/* status + submit */}
      {error && (
        <p className="text-red-600 text-sm mt-4 font-medium">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full h-11 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Creating…" : "Create User"}
      </button>
       
      <h2 className="flex justify-center items-center  mt-5">Already Have an Account ??? <span className="text-purple-500 font-bold text-xl ml-2 cursor-pointer" onClick={()=>navigate('/login')}>Login</span></h2>
    </form>
  )
}

export default Register;
