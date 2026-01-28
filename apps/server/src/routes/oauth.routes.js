import express from 'express';
import passport from '../config/passport.js';
import { oauthController } from '../controller/oauth.controller.js';


const router=express.Router();


router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

router.get('/google/callback', oauthController);




export default router;