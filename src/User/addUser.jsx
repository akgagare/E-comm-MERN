import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  
  const navigate = useNavigate();
  const [form,setForm]  = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    street:"",
    city:"",
    state:"",
    zip:"",
    country:""
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
        const res = await fetch("http://localhost:3000/api/user/",{
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
      className="max-w-xl mx-auto p-6 bg-white shadow rounded-2xl min-h-screen bg-gradient-to-tr from-blue-200 via-purple-200 to-pink-200">

      <h2 className="text-2xl font-semibold mb-4">Create New User</h2>

      {/* name & email */}
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
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
            className="w-full border rounded p-2"
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
              onChange={handleChange}
              className="w-full border rounded p-2"
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
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>

        {/* address */}
        <div className="pt-2">
          <h3 className="font-medium mb-1">Address (optional)</h3>
          <input
            name="street"
            value={form.street}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-2"
            placeholder="Street"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className="border rounded p-2"
              placeholder="City"
            />
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              className="border rounded p-2"
              placeholder="State"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <input
              name="zip"
              value={form.zip}
              onChange={handleChange}
              className="border rounded p-2"
              placeholder="ZIP / Post‑code"
            />
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              className="border rounded p-2"
              placeholder="Country"
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
    </form>
  )
}

export default AddUser;
