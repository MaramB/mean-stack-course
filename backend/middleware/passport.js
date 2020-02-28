const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use('local.signup',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback: true
},
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (user) {
                return done(null, false, { message: 'Email already in use.' });
            }
            const newUser = new User({
                email: email,
                password: User.hashPassword(password)
            });
            
            newUser.save(function(err, result){
                if (err) {
                    return done(err);
                }
                return done(null, newUser);
            });
        });
    }
));


passport.use('local.login',new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.isValid(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));


passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });