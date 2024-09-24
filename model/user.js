import mongoose from "mongoose";
const schema=mongoose.Schema;

const userSchema=new schema({
    name:String,
    email:String,
    password:String,
    otp:Number,
    verified:{
        type:Boolean,
        default:false
    }
});

export default mongoose.model("User",userSchema)