import { hashedPassword,comparePassword } from "../helper/authHelper.js";
import userModel from "../model/usermodel.js";
import Jwt  from "jsonwebtoken";
//register controller
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address,question } = req.body;

    //validation
    if (!name) {
      return res.status(400).send({success:false, message: "Name is Required" });
    }
    if (!email) {
      return res.status(400).send({success:false, message: "Email is Required" });
    }
    if (!password) {
      return res.status(400).send({success:false, message: "Password is Required" });
    }
    if (!phone) {
      return res.status(400).send({success:false, message: "Phone is Required" });
    }
    if (!address) {
      return res.status(400).send({success:false, message: "Address is Required" });
    }
    if (!question) {
      return res.status(400).send({success:false, message: "Question is mandatory to attempt" });
    }

    //if user already register
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      res.status(409).send({
        success: false,
        message: "User already register",
      });
    }

    //hash password
    const hashPassword = await hashedPassword(password);

    //if user has not register
    const userDoc = await new userModel({
      ...req.body,
      password: hashPassword,
    }).save();
    
    res.status(201).send({
      success: true,
      message: "User Registration Succesfull",
      userDoc,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//login controller
const loginController=async(req,res)=>{
  const {email,password}=req.body;
  try{
    //validation
    if(!email){
      return res.status(400).send({success:false,message:"Email is Required"})
    }
    if(!password){
      return res.status(400).send({success:false,message:"Password is Required"})
    }

  const user=await userModel.findOne({email});

  //if user email not found
  if (!user) {
    return res.status(401).send({ success: false, message: "Invalid Email or Password" });
  }

  //compare password
  const comparedpassword=await comparePassword(password,user.password)
 
  //check password
  if(!comparedpassword){
    return res.status(401).send({
      success:false,
      message:"Invalid Email or Password",
    })
  }

  //generate jwt token
  const token=Jwt.sign({user},process.env.SECRET_KEY, { expiresIn: '30d' });

  res.status(200).send({
    success:true,
    message:"Login successfully completed",
    user:{
     name:user.name,
     email:user.email,
     phone:user.phone,
     address:user.address,
     role:user.role
    },
    token
  })

  }
  catch(error){
    console.log(error)
     res.status(500).send({
      success:false,
      message:"Error in login",
      error
     })
  }
}

//FORGT PASSWORD
const forgetPassword=async(req,res)=>{
  try{
  const {email,question,password}=req.body;
  if(!email){
    return res.status(400).send({
      success:false,
      message:"Email is required"
    })
  }
  if(!question){
    return res.status(400).send({
      success:false,
      message:"Answer is required"
    })
  }
  if(!password){
    return res.status(400).send({
      success:false,
      message:"Password is required"
    })
  }
  const user=await userModel.findOne({email});
  if(!user){
    return res.status(401).send({
      success:false,
      message:"Email is not valid"
    })
  }
  
  if(user.question!==question){
    return res.status(401).send({
      success:false,
      message:"Answer is not valid"
    })
  }
   const hashPassword=await hashedPassword(password);
   await userModel.findByIdAndUpdate(user._id,{password:hashPassword})


  res.status(201).send({
    success:true,
    message:"Password Reset Successfull",
    user
  })
}
catch(error){
   res.send({
    success:false,
    message:"Something went wrong",
    error
   })
}
}

//test Controller
const testController=(req,res)=>{
  res.send("test controller")
}

//UPDATE PROFILE
const updateProfile=async(req,res)=>{
  const {name,email,password,address,phone}=req.body;
  try {
    const passwordRegex=/^[a-zA-z1-9_@#]{3,}$/;
    if(password && !passwordRegex.test(password)){
        return res.status(400).send({
          success:false,
          message:"Keep strong password",
        })
    }

    const hashPassword= password && await hashedPassword(password);
    const findUser=await userModel.findOne({email});

    const user=await userModel.findByIdAndUpdate(findUser._id,{
        password:hashPassword || findUser?.password,
        name: name || findUser?.name,
        email: email,
        address: address || findUser?.address,
        phone: phone || findUser?.phone
    })

    res.status(200).send({
      success:true,
      message:"Profile updated succesfully",
      user:{
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address,
      }
    })
  } catch (error) {
    res.send({
      success:false,
      message:"Something went wrong",
      error
     })
  }
}
export { registerController,loginController,testController,forgetPassword,updateProfile};
