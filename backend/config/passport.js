const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/userModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
function(accessToken, refreshToken, profile, cb) {
    User.findOne({ email: profile.emails[0].values }, async (err, user) => {
      if(!user){
          const newUser = new User({
              name: profile.name.givenName,
              email: profile.emails[0].value,
              strategy: 'google'
          });
          await newUser.save();
      }
    });

    console.log(profile)
    return cb(null, profile);
  }
));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user)
})

