import express from "express";
import multer from "multer";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  searchProduct,
  getFilterProduct,
  getProductCount,
  getProductImage,
  getProductPage,
  getSingleProduct,
  updateProduct,
  similarProduct,
  brainTreeToken,
  brainTreePayment,
  addReview,
  getAllReview,
} from "../controller/productController.js";
import { isAdmin, verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

//setup for disk storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// CREATE PRODUCT
router.post("/create-product", upload.single("photo"),
verifyToken,isAdmin,createProduct);

//GET ALL PRODUCT
router.get("/getall-product", getAllProduct);

//GET PRODUCT ON THE BASE OF PAGE
router.get("/getall-product/:page",getProductPage)

//GET PRODUCT COUNT
router.get("/getproduct-count",getProductCount)

//GET FILTER PRODUCT
router.post("/get-filterproduct",getFilterProduct)

//GET SINGLE PRODUCT
router.get("/getsingle-product/:slug", getSingleProduct);

//GET IMAGE OF PRODUCT
router.get("/product-image/:id",getProductImage)

//UPDATE PRODUCT
router.put("/update-product/:id", upload.single("photo"), verifyToken,isAdmin,updateProduct);

//DELETE PRODUCT
router.delete("/delete-product/:id",verifyToken,isAdmin, deleteProduct);

//SEARCH PRODUCT
router.post("/search-product",searchProduct)

//SIMILAR PRODUCT
router.get("/similar-product/:pslug",similarProduct)

//PAYMENT GATEWAY
//token
router.get("/braintree/token",brainTreeToken);

//payment
router.post("/braintree/payment",verifyToken,brainTreePayment)

//UPDATE REVIEW
router.patch("/update-review/:slug",verifyToken,addReview)

//GET ALL REVIEW
router.get("/get-review/:slug",getAllReview)
export default router;