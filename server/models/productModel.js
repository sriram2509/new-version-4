import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please enter your product name"],
        trim: true
    },
   
    price:{
        type: Number,
        required: [true, "Please enter product price"],
        maxLength: [6, "Price cannot exceed a characters"]
    },
    ratings:{
        type: Number,
        default: 0
    },
    images: [
        {
            public_id:{
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product category"]
    }, 
    stock: {
        type: Number,
        required: [true, "please enter product stock"],
        maxLength : [4, "Stock cannot exceed 4 characters"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdBy: {
        type: Date,
        default: Date.now
    }
})

const Product =  mongoose.model("Product", productSchema);

export default Product;