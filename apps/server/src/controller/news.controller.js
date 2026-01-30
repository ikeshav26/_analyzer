import analyzeNewsFromAi from "../config/news-analyzer-ai.service.js";



export const analyzeNews=async(req,res)=>{
    try{
        const {text}=req.body;
        if(!text){
            return res.status(400).json({message:"Text is required"})
        }

        const response=await analyzeNewsFromAi(text);
        res.status(200).json({message:response})

    }catch(err){
        res.status(500).json({message:"Internal Server Error"})
        console.error(err)
    }
}