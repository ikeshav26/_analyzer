import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import passport from 'passport';
import User from '../models/user.model.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/auth/google/callback`,
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

        if (!email) {
          return done(new Error('No email provided by Google'), null);
        }

    
        let user = await User.findOne({ providerId: profile.id, authProvider: 'google' });
        if (!user) {
          user = await User.findOne({ email });
          if (user) {
            if (user.authProvider === 'local' && user.password) {
              return done(
                new Error(
                  'An account with this email already exists. Please sign in with your email and password instead.'
                ),
                null
              );
            }
            if (user.authProvider === 'github' && user.providerId) {
              return done(
                new Error(
                  'An account with this email already exists with github login. Please sign in with GitHub instead.'
                ),
                null
              );
            }

            user.authProvider = 'google';
            user.providerId = profile.id;
            user.emailVerified = true;
            await user.save();
          } else {
            user = new User({
              name: profile.displayName || email.split('@')[0],
              email: email,
              authProvider: 'google',
              providerId: profile.id,
              emailVerified: true,
            });
            await user.save();
          }
        }

        return done(null, user);
      } catch (err) {
        console.error('Google OAuth error', err);
        return done(err, null);
      }
    }
  )
);


export default passport;