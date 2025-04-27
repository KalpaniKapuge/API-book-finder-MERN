import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : "Customer"
    },
    img : {
        type : String,
        required : false,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fschedule.ula.edu.pe%2Fen%2Fdefault-avatar-profile-icon-vector-user-image-stock-vector.html&psig=AOvVaw1Yuz5nIkaDfwoE8UUKpzUT&ust=1745826116294000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNDsjKHb94wDFQAAAAAdAAAAABBF"
    },
    isBlocked : {
        type : Boolean,
        required : true,
        default : false
    }


})

const User = mongoose.model("users",userSchema)

export default User;