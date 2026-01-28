import { generateToken } from "../utils/helper.js";
import passport from "../config/passport.js";



export const oauthController= (req, res, next) => {
  try{
    passport.authenticate('google', { session: false }, (err, user) => {
    if (err) {
      console.error('Google OAuth error', err);
      return res.redirect(
        `${process.env.CLIENT_URL}/login?error=oauth_failed&message="Authentication failed"`
      );
    } 

    if (!user) {
      return res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed&message="No user found"`);
    }
    
    const token=generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "None",
        });

    res.redirect(`${process.env.CLIENT_URL}/?oauth=success`);
  })(req, res, next);
  }catch(err){
    console.error('OAuth Controller error', err);
    return res.redirect(
      `${process.env.CLIENT_URL}/login?error=oauth_failed&message="Internal server error"`
    );
  }
}