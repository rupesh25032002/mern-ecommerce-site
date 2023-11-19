import express from "express";
import { createCategory, deleteCategory, getAllCategory, getSingleCategory, updateCategory } from "../controller/categoryController.js";
import { isAdmin, verifyToken } from "../middleware/authMiddleware.js";

const router=express.Router();
//CREATE CATEGORY
router.post("/create-category",verifyToken,isAdmin,createCategory)

//GET ALL CATEGORY
router.get("/getall-category",getAllCategory)

//GET SINGLE CATEGORY
router.get("/getsingle-category/:slug",getSingleCategory)

//UPDATE CATEGORY
router.put("/update-category/:id",verifyToken,isAdmin,updateCategory)

//DELETE CATEGORY
router.delete("/delete-category/:id",verifyToken,isAdmin,deleteCategory)

export default router