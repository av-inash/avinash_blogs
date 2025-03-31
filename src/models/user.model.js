import mongoose, { Schema } from "mongoose";


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:email,
        unique:true
    },
    profilePicture: {
        type: String, 
        default: ""
      },
    password:{
        type:String,
        required:true
    },
    accessToken:{
        type:String,
    },
   
    isBlock:{
        type:Boolean,
        default:false
    },
   
},{
    
        strict: true,
        collection: "User",
        versionKey: false,
        timestamps: true,
    

}
)

const UserModel=mongoose.model("User",userSchema)
export default UserModel