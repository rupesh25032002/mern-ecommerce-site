import bcrypt from "bcrypt"

//hashing password
export const hashedPassword=async(password)=>{
  try{
    return await bcrypt.hash(password,10)
  }
  catch(error){
   console.log(error)
  }
}

//comparing hashed password
export const comparePassword=async(plainpassword,hashPassword)=>{
  try{
    return bcrypt.compare(plainpassword,hashPassword)
  }
  catch(error){
    console.log(error)
  } 
}