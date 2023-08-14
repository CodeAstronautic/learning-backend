const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Third-Party Google Authentication
passport.serializeUser((user, done) => {
    done(null,user.id);
  })
  passport.deserializeUser((id, done) => {
    User.findById(id).then((user)=>{
      done(null, user)
    })
  })

//Google Strategy
passport.use(new GoogleStrategy({
    clientID: keys.CLIENT_ID,
    clientSecret: keys.CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async(accessToken, refreshToken,profile, done) =>{
  console.log("profile",profile);
   User.findOne({googleId:profile.id})
   .then((existingUser)=>{
     //if User Exists 
    if(existingUser){
      done(null,existingUser);
    }


    else{
      //if user does not exist
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hash(profile.id, salt)
      .then((hash)=>{
        new User({ googleId: profile.id,firstName:profile.name.givenName,lastName:profile.name.familyName,email:profile.emails[0].value,password:hash,confirmPassword:hash}).save()
        .then(user=>{
        done(null,user);
      })
    })
    }
  })
  })
  )
  