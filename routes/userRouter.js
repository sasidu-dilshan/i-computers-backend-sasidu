import express from 'express';
import jwt from 'jsonwebtoken';
import { 
  createUser, 
  getAllUsers, 
  getCurrentUser, 
  getUserCart, 
  googleLogin, 
  loginUser, 
  resetPassword, 
  sendOTP, 
  updateUserCart, 
  updateUserPassword, 
  updateUserProfile, 
  updateUserRole, 
  updateUserStatus 
} from '../controllers/userController.js';

const userRouter = express.Router();

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

userRouter.get("/me" , getCurrentUser);
userRouter.post("/" , createUser);
userRouter.post("/login" , loginUser);
userRouter.get("/:pageSize/:pageNumber", getAllUsers);
userRouter.put("/status" , updateUserStatus);
userRouter.put("/role" , updateUserRole);
userRouter.put("/update" , updateUserProfile);
userRouter.put("/password" , updateUserPassword);
userRouter.post("/google" , googleLogin);
userRouter.post("/otp", sendOTP);
userRouter.post("/reset-password", resetPassword);
userRouter.get("/cart", authenticateUser, getUserCart);
userRouter.put("/cart", authenticateUser, updateUserCart);

export default userRouter;