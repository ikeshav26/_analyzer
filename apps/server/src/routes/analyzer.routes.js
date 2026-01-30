import express from 'express';
import {  analyzeImageFromAI, analyzeNewsFromAI } from '../controller/analyzer.controller.js';


const router=express.Router();


router.post('/analyze-news',analyzeNewsFromAI);
router.post('/analyze-image',analyzeImageFromAI);

export default router;