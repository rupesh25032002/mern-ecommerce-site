import mongoose, { Schema } from "mongoose";

//define schema
const orderSchema=mongoose.Schema({
  products:[{
    type:mongoose.Schema.ObjectId,
    ref:"products"
  }],
  payment:{},
  buyer:{
    type:Schema.ObjectId,
    ref:"users",
  },
  status:{
    type:String,
    default:"Not process",
    enum:["Not process","Processing","Shipped","delivered","cancel"]
  }
},
{timestamps:true})

//compile schema
const orderModel=mongoose.model("order",orderSchema);

export default orderModel;
