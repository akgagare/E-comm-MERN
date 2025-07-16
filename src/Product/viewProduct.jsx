import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // ✅ Auth check and token extraction
  useEffect(() => {
    const localData = localStorage.getItem('token');

    if (!localData) {
      toast.error("Please login");
      navigate('/login');
      return;
    }

    try {
      const parsed = JSON.parse(localData);
      if (!parsed.token || !parsed.id) {
        throw new Error("Invalid token data");
      }
      setToken(parsed.token);
      setUserId(parsed.id);
    } catch (err) {
      console.error("Token parse error:", err);
      toast.error("Session invalid. Please login again.");
      localStorage.removeItem("token");
      navigate('/login');
    }
  }, [navigate]);

  // ✅ Fetch Products after token is ready
  useEffect(() => {
    if (!token) return;

    const getProducts = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/product', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) navigate('/login');
        const { products } = await res.json();
        setProducts(products ?? []);
      } catch (err) {
        console.log("Error in viewProduct.jsx:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [navigate,token]);

  // ✅ Add to cart
  const addItem = async (pid) => {
    try {
      const res = await fetch('http://localhost:3000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: pid }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Failed to add item');
      }

      const data = await res.json();
      toast.success('Item added to cart');
      console.log('Order created:', data);
    } catch (err) {
      toast.error(err.message || 'Item not created successfully');
      console.error('addItem ▶', err.message);
    }
  };

  const deleteItem = async(pid) => {
    try{
      console.log("PID :", pid);
      const res = await fetch(`http://localhost:3000/api/product/${pid}`,{
        method:"DELETE",
        headers: {
            'Content-type': 'application/json'
        }
      });
      if(!res.ok){
        toast.error("Deletion unsuccessfull");
      }
    }
    catch(error){
      console.log("Error in deleteing",error);
    }
  }
  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className='backdrop-blur-md bg-lime-200/30 rounded-xl border border-white/40 p-6'>
      <h2 style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }} className="text-5xl font-semibold mb-4">All Products</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="space-y-2">
          {products.map((p) => (
            <div key={p._id} className='border-2 rounded-md border-purple-300 p-5 shadow-lg'>
              <li className="border p-2 rounded">
                <p className='text-[2rem] text-black'>
                  <strong>{p?.name}</strong> — ₹{p?.price}
                </p>
                <p className="text-sm text-gray-600">{p?.description}</p>
                {console.log("p.images--->>>",p.images)}
                  <img
                    src={`http://localhost:3000/uploads/${p.images}`}
                    alt={p.name}
                    className="flex w-32 h-70 object-cover rounded-xl mb-2 shadow-2xl shadow-green-300"
                  />
              </li>
              <div className='flex gap-4'>
                <button
                  onClick={() => addItem(p._id)}
                  className='rounded-md bg-green-400 h-10 w-40 text-white mt-2'
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
                >
                  Add to Cart
                </button>
                <button
                onClick={()=>deleteItem(p._id)}
                className='rounded-md bg-red-600 h-10 w-40 text-white mt-2'>
                  Delete Cart
                </button>
              </div>
            </div>
          ))}
        </ul>
      )}

      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => navigate('/newproduct')}
          className="flex items-center px-4 py-2 bg-black text-white rounded"
        >
          ADD NEW PRODUCT
        </button>
        <button
          onClick={() => navigate(`/user/${userId}`)}
          className="flex items-center px-4 py-2 bg-black text-white rounded"
        >
          VIEW CART
        </button>
      </div>
    </div>
  );
};

export default ViewProduct;
