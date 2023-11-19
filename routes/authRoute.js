import express from "express";
import { forgetPassword, loginController, registerController, updateProfile } from "../controller/authController.js";
import { isAdmin, verifyToken } from "../middleware/authMiddleware.js";
//router object
const router=express.Router()


//REGISTER || POST
router.post("/register",registerController)

//LOGIN || POST
router.post("/login",loginController)

//RESET PASSWORD
router.post("/forgetpassword",forgetPassword)

//USER DASHBOARD ACCESS
router.get("/user-dashboard",verifyToken,(req,res)=>{
  res.status(200).send({
    success:true
  })
})

//ADMIN DASHBOARD ACCESS
router.get("/admin-dashboard",verifyToken,isAdmin,(req,res)=>{
  res.status(200).send({
    success:true
  })
})

//UPDATE PROFILE
router.put("/update-profile",verifyToken,updateProfile)

export default router