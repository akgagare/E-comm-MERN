const dotenv = require("dotenv") ;
const jwt = require('jsonwebtoken');

dotenv.config() ;

const authMiddleware = (req, res, next) => {
  try {
    console.log(req.body);
    let token = null;
    const authHeader = req.headers.authorization; 
    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }
    if (!token) token = req.body.token;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Printing the decoded user from Middleware",decoded);
    req.user = {id:decoded.user_id,role:decoded.role};
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or Expired token' ,err});
  }
};



module.exports = authMiddleware; 