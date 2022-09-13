import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import asyncMiddleware from "./catchAsyncError.js";
import User from "../models/userModel.js";


// TO AUTHENTICTE USER
const isAuthenticatedUser = asyncMiddleware(async(req, res, next) => {

    const {token} = req.cookies;
    
    if(!token){
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
    
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);
    
    next();
})


// TO AUTHORIZE ROLES(like USER, ADMIN )
const authorizeRoles = (...roles) => {

    return(req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403)
            );
        }

        next();
    }
}

export  {isAuthenticatedUser, authorizeRoles};