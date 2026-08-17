import express from 'express';
import { createUser, getAllUsers, getCurrentUser, googleLogin, loginUser, resetPassword, sendOTP, updateUserPassword, updateUserProfile, updateUserRole, updateUserStatus } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.get("/me" , getCurrentUser)
userRouter.post("/" , createUser)
userRouter.post("/login" , loginUser)
userRouter.get("/:pageSize/:pageNumber", getAllUsers)
userRouter.put("/status" , updateUserStatus)
userRouter.put("/role" , updateUserRole)
userRouter.put("/update" , updateUserProfile)
userRouter.put("/password" , updateUserPassword)
userRouter.post("/google" , googleLogin)
userRouter.post("/otp", sendOTP)
userRouter.post("/reset-password", resetPassword)

export default userRouter