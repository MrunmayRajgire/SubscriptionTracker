import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:   {
        type: String,
        required: [true, "Name is required"],
        trim:true,
        minlength:2,
        maxlength:50
    },
    email:  {
        type: String,
        required:[true, "User Email is Required"],
        unique:true,
        trim:true,
        lowercase:true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
        type:String,
        required:[true, "USer Password is Required"],
        minlength:6,
    }
}, {timestamps:true});

const User = mongoose.model("User", userSchema);

export default User;