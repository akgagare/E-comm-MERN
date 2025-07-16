const express = require("express");
const {getUsers,loginUser,createUser,getUserById,updateUser,deleteUser} = require("../controllers/user");


const router = express.Router();

router.post("/", createUser);
router.post('/login',loginUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;


// MONGO_URL="mongodb+srv://arungagare2915:mongo123@cluster0.ez7sv3z.mongodb.net/tata-aig-learning"
// JWT_SECRET = "arunfkepkfepfm",
// cloud_name =  'dwfn4yrbe'
// api_key =  '873471998155466'
// api_secret = '<your_api_secret>'
// GOOGLE_API_KEY = AIzaSyCbpapj7JEIhPk1Y4wGmQoXaegiRqt2OV8