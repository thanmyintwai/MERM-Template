const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = require('../models/User')

//generalize token and put it in a cookie 
//and set it to user
//user is user model (new or existing) from callback of googlestrategy (look down below)
//{"_id":"632c5a306fd92a2bfd63a0c0","googleId":"102012197665909713239","credits":0,"__v":0}
passport.serializeUser((user, done) => {
    done(null, user.id);
  });

//interpret the cookie  
//id from coooke into user detail which is stored in DB
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
  });
/* 
  need to tell passport that cookie is used to share data
*/


passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
},async (accessToken, refreshToken, profile, done) =>{
    //console.log('access token', accessToken)
    //console.log('profile', profile)

    const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
          //error object, found user
          //null means no error
        return done(null, existingUser);
      }

      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
})
)