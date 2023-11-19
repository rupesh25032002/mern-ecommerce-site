import categoryModel from "../model/categoryModel.js";
import slugify from "slugify";
import productModel from "../model/productModel.js";

//CREATE CATEGORY
const createCategory = async (req, res) => {
  const { name } = req.body;
  const slug = slugify(name);
  try {
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "Category Name is rquired" });
    }

    const existCategory = await categoryModel.findOne({ slug });
    if (existCategory) {
      return res
        .status(400)
        .send({ success: false, message: "This category is already exist!" });
    }

    const category = await new categoryModel({ name, slug }).save();
    return res.status(201).send({
      success: true,
      message: "Category is created Successfully",
      category,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

//GET ALL CATEGORY
const getAllCategory = async (req, res) => {
  try {
    const allCategory = await categoryModel.find({});
    console.log(allCategory)
    return res.status(201).send({
      success: true,
      message: "All Category",
      allCategory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

//GET SINGLE CATEGORY
const getSingleCategory = async (req, res) => {
  try {
    const singleCategory = await categoryModel.findOne({slug:req.params.slug});
    return res.status(201).send({
      success: true,
      message: "Single Category",
      singleCategory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

//UPDATE CATEGORY
const updateCategory=async(req,res)=>{
  const {name}=req.body;
  const slug=slugify(name);
  try{
    if(!name){
      return res.status(400).send({
        success:false,
        message:"Category Name is Required"
      })
    }
    
     const updatedCategory = await categoryModel.findByIdAndUpdate({_id:req.params.id},{name:name,slug})
     res.status(200).send({
      success:true,
      message:"Category Updated Successfully"
     })

  }
  catch(error){
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
}
//DELETE CATEGORY
const deleteCategory=async(req,res)=>{
  try{
     await categoryModel.findByIdAndDelete(req.params.id);
     await productModel.updateMany({category:req.params.id},{$set:{category:null}})
     res.status(200).send({
      success:true,
      message:"Category Deleted Successfully"
     })

  }
  catch(error){
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
}

export {createCategory,getAllCategory,getSingleCategory,updateCategory,deleteCategory}