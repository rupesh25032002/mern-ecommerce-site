import orderModel from "../model/OrderModel.js"


//SPECIFIC USER ORDER DETAIL
const getUserOrder=async(req,res)=>{
  try {
    const order=await orderModel.find({buyer:req.user.user._id})
    .populate("products","-photo")
    .populate("buyer","name");
     

    return res.status(200).send({
      success:true,
      message:"Order Detail is fetched",
      order
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:"Something went wrong",
      error
    })
  }
}


//GET ALL ORDER DETAIL
const getAdminOrder=async(req,res)=>{
  try{
  const order=await orderModel.find({})
  .populate("products","-photo")
  .populate("buyer","name");
   

  return res.status(200).send({
    success:true,
    message:"Admin Order Detail is fetched",
    order
  })
} catch (error) {
  console.log(error)
  return res.status(500).send({
    success:false,
    message:"Something went wrong",
    error
  })
}
}

//UPDATE STATUS
const updateStatus=async(req,res)=>{
  const {orderId,status}=req.body;
  try{
  const order=await orderModel.findByIdAndUpdate(orderId,{status});
  
  return res.status(200).send({
    success:true,
    message:"Order Status Updated!",
    order
  })
} catch (error) {
  console.log(error)
  return res.status(500).send({
    success:false,
    message:"Something went wrong",
    error
  })
}
}

export {getUserOrder,getAdminOrder,updateStatus}