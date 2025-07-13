
import './App.css';
import Home from './Home/home';
import Product from "./Product/addProduct"
import User from "./User/addUser"
import ViewProduct from './Product/viewProduct';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import LoginUser from './User/LoginUser';
import UserPage from './User/UserPage';
import toast, { Toaster } from 'react-hot-toast';
import { Breadcrumbs } from '@mui/material';
import Sidebar from './Sidebar';
function App() {
  return (
    <div>
      
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/newproduct" element={<Product/>}/>
            <Route path="/viewproduct" element={<ViewProduct />}/>
            <Route path='/login' element={<LoginUser/>}/>
            <Route path="/register" element={<User/>}/>
            <Route path="/user/:id" element={<UserPage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
