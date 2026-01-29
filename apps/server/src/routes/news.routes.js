import express from 'express';
import { analyzeNews } from '../controller/news.controller.js';


const router=express.Router();


router.post('/analyze-news',analyzeNews);

export default router;