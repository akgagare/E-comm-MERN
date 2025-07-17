const express = require("express");
const {getUsers,loginUser,createUser,getUserById,updateUser,deleteUser} = require("../controllers/user");


const router = express.Router();

router.post("/register", createUser);
router.post('/login',loginUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;