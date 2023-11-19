import mongoose from "mongoose";

const dbConnection= async()=>{
  try{
    const connect = await mongoose.connect(process.env.DATABASE_URL);
    console.log("connected")
  }
  catch (err){
    console.log(err)
  }
}

export default dbConnection;