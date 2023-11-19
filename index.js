import express from "express"
import dotenv from "dotenv"
import dbConnection from "./config/db.js"
import authRoute from "./routes/authRoute.js"
import {isAdmin, verifyToken} from "./middleware/authMiddleware.js"
import { testController } from "./controller/authController.js"
import cors from 'cors';
import category from "./routes/categoryRoute.js"
import product from "./routes/productRoute.js"
import order from "./routes/orderROute.js"

//config dotenv
dotenv.config()

//database connection
dbConnection();

//rest object
const app = express();

// Enable CORS for all routes
app.use(cors());

//PORT
const PORT=process.env.PORT;

//middleware
app.use(express.json())

//routes
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/category",category)
app.use("/api/v1/product",product)
app.use("/api/v1/order",order)


//rest api
app.get("/test",verifyToken,isAdmin,testController)

//listening server
app.listen(PORT,()=>{console.log(`listening on port ${PORT}`)})


