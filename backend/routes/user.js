const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/user');
const isValidUser = require('../middleware/passport-validation');

const router = express.Router();

router.post("/passport/signup", async (req, res, next) => {
  passport.authenticate('local.signup', function(err, user, info) {
        if (err) { return res.status(501).json(err); }
        if (!user) { return res.status(501).json(info); }
        req.logIn(user, function(err) {
          if (err) { return res.status(501).json(err); }
          return res.status(200).json({message:'Signup Success'});
        });
        
      })(req, res, next);
});

router.post("/passport/login", (req, res, next) => {
    passport.authenticate('local.login', function(err, user, info) {
        if (err) { return res.status(501).json(err); }
        if (!user) { return res.status(501).json(info); }
        req.logIn(user, function(err) {
          if (err) { return res.status(501).json(err); }
        //   req.session.userData = req.user;
          return res.status(200).json({message:'Login Success'});
        });
      })(req, res, next);
});

router.get('/user', isValidUser, (req,res,next) => { //passport
    return res.status(200).json(req.user);
  });
  
  router.get('/logout', isValidUser, (req,res,next) => { //passport
    req.logout();
    return res.status(200).json({message:'Logout Success'});
  });

  router.post('/jwt/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(result => {
            res.status(201).json({
                message: "user created in  jwt!",
                user: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    });
  });

  router.post("/jwt/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email }).then(user => {
        if(!user) {
            res.status(401).json({
                message: "email doesn't exist, signup first!"
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then( result => {
        if(!result) {
            res.status(401).json({
                message: "wrong email or password"
            });
        }
        const token = jwt.sign(
            { email: fetchedUser.email, userId: fetchedUser._id },
            "secret_this_should_be_longer",
            { expiresIn: "1h"}
        );
        
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchedUser._id,
            username: fetchedUser.username,
            friends: fetchedUser.friends
        });
    }).catch(err => {
        res.status(401).json({
            message: "Auth failed"
        });
     });

});

router.put("/:id", isValidUser, (req, res, next) => {
    User.findOneAndUpdate({_id: req.user._id}, {$addToSet:{friends: req.params.id}}).then(user => {
        User.findOneAndUpdate({_id: req.params.id}, {$addToSet:{friends: req.user._id}}).then(user => {
            res.status(200).json({ message: "friend accepted & added" });
        });
    });
    
});

router.get("/:id", (req, res, next) => {
    User.findById(req.user._id).then(user => {
        res.status(200).json({
            message: "found user",
            userId: user._id,
            email: user.email,
            friends: user.friends
        });
    });
});

router.get("", (req, res, next) => {
    User.find().then( users => {
        res.status(200).json({
            message: "users fetched",
            users: users
        });
    });
});

module.exports = router;