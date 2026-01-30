import {analyzeNews,analyzeImage}from '../config/ai.service.js';



export const analyzeNewsFromAI=async(req,res)=>{
    try{
        const {text}=req.body;
        if(!text){
            return res.status(400).json({message:"Text is required"})
        }

        const response=await analyzeNews(text);
        res.status(200).json({message:response})

    }catch(err){
        res.status(500).json({message:"Internal Server Error"})
        console.error(err)
    }
}


export const analyzeImageFromAI=async(req,res)=>{
    try{
        const {imageUrl}=req.body;
        if(!imageUrl){
            return res.status(400).json({message:"Image URL is required"})
        }

        const response=await analyzeImage(imageUrl);
        res.status(200).json({message:response})
    }catch(err){
        res.status(500).json({message:"Internal Server Error"})
        console.error(err)
    }
}