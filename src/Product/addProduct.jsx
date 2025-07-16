// src/components/AddProduct.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  brand: "Generic",
  countInStock: "",
  isFeatured: false,
  photos:"",
};

const AddProduct = () => {
  const [form, setForm] = useState(initialForm);
  const [images, setImages] = useState();       
  const [previews, setPreviews] = useState([]);  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();                 

  
  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};

  const handlePhoto = (e) =>{
    try{
      console.log("Reached handlePhoto");
      setForm((prev)=>({
        ...prev,
        photos:e.target.files[0]
      }))
    }
    catch(error){
      console.log("error in handlePhoto",error);
    }
  }
  console.log("form-data:",form);
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (
    !form.name.trim() ||
    !form.description.trim() ||
    !form.price ||
    !form.category.trim() ||
    !form.countInStock
  ) {
    setError("Please fill all required fields");
    return;
  }

  try {
    setLoading(true);

    const data = new FormData();
    data.append('name', form.name);
    data.append('description', form.description);
    data.append('price', form.price);
    data.append('category', form.category);
    data.append('countInStock', form.countInStock);
    data.append('brand', form.brand);
    data.append('isFeatured', form.isFeatured);
    data.append('photos', form.photos);

    console.log("images:",images);
    console.log("form.photo",form.photos);
    console.log("DATA:",data);

    const res = await fetch("http://localhost:3000/api/product/", {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message || "Unable to create product");
    }

    setForm(initialForm);
    setImages(null);
    setPreviews([]);
    navigate("/viewproduct");
  } catch (err) {
    console.error(err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  const handleViewProduct = async() =>{
    navigate('/viewproduct');
  };

  const addItem = () => {
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-200 via-purple-200 to-pink-200">
      <button onClick={handleViewProduct}>View all Products.</button>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="max-w-2xl mx-auto p-6 bg-white shadow rounded-2xl"
      >
        <h2 className="text-2xl font-semibold mb-6">Create New Product</h2>

        {/* product basics */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="iPhone 16 Pro"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description<span className="text-red-600 text-2xl">*</span></label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded p-2 h-28 resize-none"
              placeholder="Flagship smartphone with A19 chip…"
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Price&nbsp;(₹) *</label>
              <input
                type="number"
                min="0"
                step="0.01"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Count in Stock *</label>
              <input
                type="number"
                min="0"
                name="countInStock"
                value={form.countInStock}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Category *</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Smartphones"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Brand</label>
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Apple"
              />
            </div>
          </div>
        </div>

        {/* images */}
        <div className="pt-6">
          <label className="block font-medium mb-1">Images *</label>
          <input
            name="photos"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handlePhoto}
            className="block"
            required
          />

          {previews.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {previews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`preview-${i}`}
                  className="w-24 h-24 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>

        {/* featured toggle */}
        <div className="flex items-center gap-2 pt-4">
          <input
            id="featured"
            type="checkbox"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label htmlFor="featured" className="font-medium">
            Mark as featured
          </label>
        </div>

        {/* error + submit */}
        {error && (
          <p className="text-red-600 text-sm mt-4 font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full h-11 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Creating…" : "Create Product"}
        </button>
      </form>
    </div>
    
  );
};

export default AddProduct;
