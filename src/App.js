import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './Home/home';
import Product from './Product/addProduct';
import ViewProduct from './Product/viewProduct';
import LoginUser from './User/LoginUser';

import UserPage from './User/UserPage';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Register from './User/Register';

function App() {
  return (
    <div className='min-h-screen'>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="newproduct" element={<Product />} />
            <Route path="viewproduct" element={<ViewProduct />} />
            <Route path="login" element={<LoginUser />} />
            <Route path='/register/' element={<Register/>}/>
            <Route path="user/:id" element={<UserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
