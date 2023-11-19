import mongoose, { Schema } from "mongoose";

//define schema
const userSchema=mongoose.Schema({
  name:{type:String,require:true,trim:true},
  email:{type:String,require:true,unique:true},
  password:{type:String,require:true},
  phone:{type:String,require:true},
  address:{type:String,require:true},
  role:{type:Number,default:0},
  question:{type:String,require:true}
},
{timestamps:true})

//compile schema
const userModel=mongoose.model("users",userSchema);

export default userModel;
