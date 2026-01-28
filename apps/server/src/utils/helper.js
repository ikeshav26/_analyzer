import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export const generateToken=(userId)=>{
    try{
        const token=jwt.sign({id:userId},process.env.JWT_SECRET,{
            expiresIn:'7d'
        });
        return token;
    }catch(err){
        throw new Error('Token generation failed');
    }
}


export const verifyToken=(token)=>{
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        return decoded;
    }catch(err){
        throw new Error('Token verification failed');
    }
}


export const clearCookies=(res)=>{
    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:'None',
        });
    }catch(err){
        throw new Error('Clearing cookies failed');
    }
}

export const hashPasswrord=async(password)=>{
    try{
        return await bcrypt.hash(password,10);
    }catch(err){
        throw new Error('Password hashing failed');
    }
}


export const verifyPassword=async(password,hashedPassword)=>{
    try{
        return await bcrypt.compare(password,hashedPassword);
    }catch(err){
        throw new Error('Password verification failed');
    }
}