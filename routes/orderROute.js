import express from "express";
import { getAdminOrder, getUserOrder, updateStatus } from "../controller/OrderController.js";
import { isAdmin, verifyToken } from "../middleware/authMiddleware.js";

const router=express.Router();

//GET SPECIFIC USER ORDER DETAIL
router.get("/user-order",verifyToken,getUserOrder)


//GET ALL ORDER DETAIL
router.get("/getall-order",verifyToken,isAdmin,getAdminOrder);

//Update Status of order
router.put("/update-status",verifyToken,isAdmin,updateStatus)

export default router