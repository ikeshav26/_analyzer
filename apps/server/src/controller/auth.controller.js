import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { clearCookies, genrerateToken, hashPasswrord,verifyPassword } from '../utils/helper.js';



//signup --> /api/auth/signup
export const signup=async (req,res)=>{
    try{
        const {username,email,password}=req.body;
        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword=await hashPasswrord(password);
        const newUser=await User.create({username,email,password:hashedPassword});
        const token=await genrerateToken(newUser._id);

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:'None',
            maxAge:7*24*60*60*1000
        });
        res.status(201).json({message:"User created successfully",user:newUser,token:token});
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
        console.log(err);
    }
}



//login --> /api/auth/login
export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const isPasswordValid=await verifyPassword(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=await genrerateToken(user._id);     

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:'None',
            maxAge:7*24*60*60*1000
        });
        res.status(200).json({message:"Login successful",user:user,token:token});
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
        console.log(err);
    }
}


//logout --> /api/auth/logout
export const logout=async(req,res)=>{
    try{
        clearCookies(res);
        res.status(200).json({message:"Logout successful"});                        
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
        console.log(err);
    }
}