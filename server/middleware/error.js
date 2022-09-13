import ErrorHandler from "../utils/errorHandler.js";


const errorMiddleware = (err, req, res, next) => {
    // err = new ErrorHandler
    
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    //WRONG MONGODB "ID" ERROR 
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Mongoose duplicate key error
    if(err.code === 11000 ){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    //WRONG JWT ERROR 
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }
    
    // JWT EXPIRE ERROR 
    if(err.name === "TokenExpiredError"){
        const message = `Json Web Token is expired, try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
        // error: err.stack
    })
}

export default errorMiddleware;