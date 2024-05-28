require("dotenv").config();

var passport = require('passport');
var LocalStrategy	 	    = require("passport-local").Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, async (err, user) => {
      if (err) { 
        console.log(`Error in authenticating user: ${err}`);
        return done(err); 
      }
      if (!user) { 
        console.log(`User Not Found!!!`);
        return done(null, false); 
      }
      if (!user.verifyPassword(password)) { 
        console.log(`Incorrect password enetered!!`);
        return done(null, false); 
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = {
  jwt_secret: process.env.JWT_SECRET,
  database: process.env.MONGODB_URI,
};
