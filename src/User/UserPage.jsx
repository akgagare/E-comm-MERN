// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import toast from "react-hot-toast";

// const UserPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [token,setToken] = useState("");
//   const [order,setOrder] = useState([]);

//   useEffect(()=>{
//     const token_object = localStorage.getItem("token");
//     const token_data = JSON.parse(token_object).token;
//     console.log(token_data,"token_data");
//     setToken(token_data);
//   },[]);

  

//   // useEffect(() => {
//   //   const token = localStorage.getItem("token");
//   //   if (!token) {
//   //     toast.error("Please login!");
//   //     navigate("/login");
//   //     return;
//   //   }

//   //   (async () => {
//   //     try {
//   //       const res = await fetch(`http://localhost:3000/api/user/${id}`);
//   //       if (!res.ok) {
//   //         const { message } = await res.json();
//   //         throw new Error(message || `HTTP ${res.status}`);
//   //       }
//   //       const data = await res.json();
//   //       setUser(data.user);
//   //       toast.success("Data loaded successfully");
//   //     } catch (err) {
//   //       console.error("UserProfile.jsx", err);
//   //       toast.error(err.message || "Could not load user");  
//   //     }
//   //   })();
//   // }, [id, navigate]);


//    const fetchOrder = async() => {
        
//         if (!token) {
//           toast.error("Please login!");
//           navigate("/login");
//           return;
//         }
//         try{
//             const res = await fetch(`http://localhost:3000/api/order/user_order/${id}`,{
//               headers:{
//                 Authorization: `Bearer ${token}`,
//               },
//             });
//             if(res.ok){
//               const json = await res.json();    
//               console.log(json.data);            
//               setOrder(json.data);
//               toast.success("Order successfully fetched");
//             }
//         }catch (err){
//             console.error("Error in fetchOrder UserPage.jsx:", err);
//             toast.error(err.message || "Order error");
//         }
//     };
//     useEffect(()=>{
//         fetchOrder();
//     },[]);
    
  
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     toast.success("Logged out");
//     navigate("/login");
//   };

//   const handleRemove = async(id) =>{
//     try{
//       const res = await fetch(`http://localhost:3000/api/order/${id}`,{
//         method:"DELETE",
//         headers:{
//           Authorization: `Bearer ${token}`,
//         },
        
//       });
//       console.log(await res.json());
//     }catch(error){
//       console.log("Error in removing CART element",error);
//     } 
//   }

  

  
//   return (
//     <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 p-4 bg-gradient-to-tr from-blue-700 via-purple-100 to-pink-100">
//         {/* ORDERS */}
//         <div className="h-[20rem]">
//         <h2 className="flex items-center justify-center text-4xl font-bold text-purple-700 mb-6 drop-shadow-md">
//           Your Cart Elements <span className="text-black ml-2"> {user?.name}</span>
//         </h2>
//         <div className="m-4 gap-3 rounded-md grid grid-cols-3">
//           {order.length > 0 ? (
//             order.map((o) => {
//               const product = o.productId;
              
//               return (
//                 <div key={o._id} className="bg-white-500 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl border border-gray-300 p-6 mb-6 ">
//                   <div className="h-9 w-9 text-3xl text-red-600 hover:rounded-full hover:text-white hover:bg-red-600 hover:pl-2 hover:transition-shadow" onClick={()=>handleRemove(o._id)}>X</div>
//                  <h1 className="text-2xl font-semibold text-purple-700 mb-2">
//                     {product?.name}
//                  </h1>
//                  <h2 className="text-gray-600 mb-1 text-lg">  
//                     {product?.description}
//                  </h2>
//                  <h2 className="text-green-600 text-xl font-bold">
//                     ₹{product?.price}
//                  </h2>
//                 </div>
//               );
//             })
//           ) : (
//             <h1>No Order found</h1>
//           )}
//         </div>
//       </div>
        

//     </div>
//   );
// };

// export default UserPage;





import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import toast from "react-hot-toast";

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState([]);
  const [token, setToken] = useState("");
  const [total,setTotal] = useState(0);

  useEffect(() => {
    const fetchOrder = async () => {
      const tokenObject = localStorage.getItem("token");

      if (!tokenObject) {
        toast.error("Please login!");
        navigate("/login");
        return;
      }

      try {
        const parsedToken = JSON.parse(tokenObject);
        if (!parsedToken.token) throw new Error("Invalid token structure");

        const userToken = parsedToken.token;
        setToken(userToken);

        const res = await fetch(`http://localhost:3000/api/order/user_order/${id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const json = await res.json();
        console.log(json.data);
        setOrder(json.data);
        toast.success("Order successfully fetched");
      } catch (err) {
        console.error("Error in fetchOrder UserPage.jsx:", err);
        toast.error(err.message || "Order error");
        navigate("/login");
      }
    };

    fetchOrder();
  }, [id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    navigate("/login");
  };

  const handleRemove = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/order/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Failed to delete order");
      }

      
      setOrder((prev) => prev.filter((o) => o._id !== orderId));
      toast.success("Item removed from cart");
    } catch (error) {
      console.log("Error in removing CART element", error);
      toast.error("Could not remove item");
    }
  };
  const totalAmount = order.reduce(
    (sum, o) => sum + (o.quantity * o.productId?.price || 0),
    0
  );

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 p-4 bg-gradient-to-tr from-pink-700 via-purple-100 to-pink-100">
      <div className="mb-80 ">
        <h2 className="flex items-center justify-center text-4xl font-bold text-purple-700 mb-6 drop-shadow-md">
          Your Cart Elements
        </h2>
        <div className="m-4 gap-3 rounded-md grid grid-cols-3">
          {order.length > 0 ? (
            order.map((o) => {
              const product = o.productId;

              return (
                <div
                  key={o._id}
                  className="relative bg-white-500 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl border border-gray-300 p-7 mb-6"
                >
                  <div
                    className="absolute top-2 right-2 h-7 w-7 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700"
                    onClick={() => handleRemove(o._id)}
                  >
                    <p className="text-sm text-white font-bold">X</p>
                  </div>
                  <h1 className="text-2xl font-semibold text-purple-700 mb-2">
                    {product?.name}
                  </h1>
                  <h2 className="text-gray-600 mb-1 text-lg">{product?.description}</h2>
                  <h2 className="text-green-600 text-xl font-bold">₹{product?.price}</h2>

                  <button className="absolute bottom-1 right-4 mt-2">Quantity: {o?.quantity} </button>
                </div>
              );
            })
          ) : (
            <h1>No Order found</h1>
          )}
        </div>
      </div>
      <div className="">
        <h2 className="text-xl shadow-md shadow-white rounded-xl p-4 text-purple-500">Amount: {totalAmount}</h2>
      </div>
    </div>
  );
};

export default UserPage;
