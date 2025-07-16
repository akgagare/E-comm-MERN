import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './Home/home';
import Product from './Product/addProduct';
import ViewProduct from './Product/viewProduct';
import LoginUser from './User/LoginUser';
import User from './User/addUser';
import UserPage from './User/UserPage';
import Layout from './components/Layout';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className=''>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="newproduct" element={<Product />} />
            <Route path="viewproduct" element={<ViewProduct />} />
            <Route path="login" element={<LoginUser />} />
            <Route path="register" element={<User />} />
            <Route path="user/:id" element={<UserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
