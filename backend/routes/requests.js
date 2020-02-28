const express = require('express');
const passport = require('passport');

const checkAuth = require('../middleware/jwt-validation');
const isValidUser = require('../middleware/passport-validation');
const Request = require('../models/request');

const router = express.Router();

router.post("", (req, res, next) => {
    const request = new Request({
        requester: req.body.requester,
        recipient: req.body.recipient,
        status: req.body.status
    });
    request.save().then( createdRequest => {
        res.status(201).json({
            message: "Request sent successfully",
            request: createdRequest
        });
    });
});

router.get("/:id", isValidUser, (req, res, next) => {
    Request.findOne({ requester: req.user._id, recipient: req.params.id }).then( 
        result => {
            console.log(result);
            res.status(200).json({
                message: "friend fetched successfully",
                request: result
            });
    });
});

router.get("/check/:id", isValidUser, (req, res, next) => {
    Request.findOne({ requester: req.params.id, recipient: req.user._id }).then( 
        result => {
            if(result) {
                res.status(200).json({
                    message: "friend already sent you a request",
                    request: result
                });
            }
    });
});


router.get("", isValidUser, (req, res, next) => {
    Request.find({ recipient: req.user._id, status: 1 }).then( result => {
        res.status(200).json({
            message: "fetched requests successfully",
            requests: result
        });
    });
});

router.delete("/:id", isValidUser, (req, res, next) => {
    Request.deleteOne({ requester: req.params.id, recipient: req.user._id }).then(result => {
        res.status(200).json({ message: "deleted request"});
    });
});

module.exports = router;