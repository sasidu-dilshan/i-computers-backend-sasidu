import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    email : {
        type : String,
        unique : true,
        required : true
    },
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        required : true,
        default : false
    },
    isBlocked : {
        type : Boolean,
        required : true,
        default : false
    },
    isEmailVerified : {
        type : Boolean,
        required : true,
        default : false
    },
    image : {
        type : String,
        required : true,
        default : "/images/default-profile.png"
    },
    cart: [
    {
        product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
        },
        qty: {
        type: Number,
        default: 1
        }
    }
]
})

const User = mongoose.model("User" , userSchema)

export default User;