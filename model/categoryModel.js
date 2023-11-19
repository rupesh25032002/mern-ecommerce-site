import mongoose, { Schema } from "mongoose";

//define schema
const categorySchema=mongoose.Schema({
  name:{type:String,require:true,trim:true},
  slug:{type:String},
},
{timestamps:true})

//compile schema
const categoryModel=mongoose.model("category",categorySchema);

export default categoryModel;
