const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

router.post("/signup", (req, res, next) => {
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
                message: "user created!",
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

router.post("/login", (req, res, next) => {
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

router.put("/:id", (req, res, next) => {
    User.findOneAndUpdate({_id: req.body.userId}, {$addToSet:{friends: req.params.id}}).then(user => {
        res.status(200).json({ message: "friend accepted" });
    });
    User.findOneAndUpdate({_id: req.params.id}, {$addToSet:{friends: req.body.userId}}).then(user => {
        res.status(200).json({ message: "friend accepted & added" });
    });
});

router.get("/:id", (req, res, next) => {
    User.findById(req.params.id).then(user => {
        res.status(200).json({
            message: "found user",
            fullName: user.name,
            username: user.username,
            userId: user._id,
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