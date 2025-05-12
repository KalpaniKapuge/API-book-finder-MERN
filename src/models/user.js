import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: { 
        type: String,
        required: true 
    },
    lastName: { 
        type: String,
       required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    img: {
        type: String,
        default: "https://via.placeholder.com/150", 
    },
    role: {
        type: String,
        default: "user",
        required: true,
    },
    isBlocked: {
        type: Boolean,
        default: false,
        required: true,
    }
});

const User = mongoose.model("User", userSchema);

export default User;
