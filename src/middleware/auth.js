import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const tokenString = req.header("Authorization");

  if (!tokenString) {
    return res.status(401).json({
         message: "No token provided"
     });
  }

  const token = tokenString.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err || !decoded) {
      return res.status(403).json({ 
        message: "Invalid token" 
    });
    }
    req.user = decoded;
    next();

  });
};
