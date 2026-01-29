import mongoose from 'mongoose';


const userSchema=new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    providerId:{
        type:String,
    },
    authProvider:{
        type:String,
        enum:['local','google','github'],
        default:'local'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


const User=mongoose.model('User',userSchema);
export default User;