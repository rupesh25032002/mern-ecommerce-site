import Jwt from "jsonwebtoken";
import userModel from "../model/usermodel.js";

//verifying token
export const verifyToken = async (req, res, next) => {
  try {
    const decode = Jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      error,
    });
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.user._id);
    if (user.role === 1) {
      next();
    } else {
      res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
    });
  }
};
