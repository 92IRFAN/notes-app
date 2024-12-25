import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_KEY;

if (!SECRET_KEY) {
  throw new Error("JWT_KEY is not defined in the environment variables");
}

export const VerifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
  
    if (authHeader) {
      let token = authHeader.split(" ")[1];
      if (token) {
        jwt.verify(token, SECRET_KEY, (err, valid) => {
          if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
          } else {
            next();
          }
        }); 
      } else {
        return res.status(401).json({ message: "Token missing" });
      }
    } else {
      return res.status(401).json({ message: "Authorization header missing" });
    }
  }