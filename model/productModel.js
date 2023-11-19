import mongoose, { Schema } from "mongoose";

//define schema for product
const productSchema=mongoose.Schema({
  name:{type:String,require:true,trim:true},
  slug:{type:String,require:true},
  description:{type:String,require:true},
  price:{type:Number,require:true},
  rating:{type:Number,default:0},
  photo:{data: Buffer, contentType: String},
  category:{type:mongoose.Types.ObjectId,ref:"category",require:true},
  quantity:{type:Number,require:true,default:1},
  noOfReview:{type:Number,default:0},
  featured:{type:Boolean,default:false},
  reviews:[
    {
      name:{
        type:String,
        require:true,
      },
      rating:{
        type:Number,
        require:true
      },
      comment:{
        type:String,
        require:true
      }
    }
  ],
  shipping:{type:Number,require:true}
},
{timestamps:true})

//compile schema
const productModel=mongoose.model("products",productSchema);

export default productModel;
