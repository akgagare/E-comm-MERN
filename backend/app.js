const express  = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require("cors");
const app = express();
const multer  = require('multer');
const bcrypt = require('bcrypt');
const upload = multer();
const path = require('path');

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.get('/',(req,res)=>{
    res.send("Hello Sound");
});

const userRoutes = require('./routes/user');
const productRoutes  = require('./routes/product');
const orderRoutes  = require('./routes/order');

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order',orderRoutes);
app.use(express.static(path.join(__dirname, 'public'))); 

app.listen(3000,()=>{
    console.log("Listening on port 3000");
})