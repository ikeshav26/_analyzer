import express from 'express';
import passport from '../config/passport-google.js';
import { googleOauthController } from '../controller/google-oauth.controller.js';
import { githubOauthController } from '../controller/github-oauth.js';


const router=express.Router();


router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/google/callback', googleOauthController);



router.get('/github/callback', githubOauthController);




export default router;