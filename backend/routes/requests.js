const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const Request = require('../models/request');

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

router.get("/:id", checkAuth, (req, res, next) => {
    Request.findOne({ requester: req.userData.userId, recipient: req.params.id }).then( 
        result => {
            console.log(result);
            res.status(200).json({
                message: "friend fetched successfully",
                request: result
            });
    });
});

router.get("/check/:id", checkAuth, (req, res, next) => {
    Request.findOne({ requester: req.params.id, recipient: req.userData.userId }).then( 
        result => {
            if(result) {
                res.status(200).json({
                    message: "friend already sent you a request",
                    request: result
                });
            }
    });
});

router.get("", checkAuth, (req, res, next) => {
    Request.find({ recipient: req.userData.userId, status: 1 }).then( result => {
        res.status(200).json({
            message: "fetched requests successfully",
            requests: result
        });
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
    Request.deleteOne({ requester: req.params.id, recipient: req.userData.userId }).then(result => {
        res.status(200).json({ message: "deleted request"});
    });
});

module.exports = router;