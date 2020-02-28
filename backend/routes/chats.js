const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/jwt-validation');
const Chat = require('../models/chat');

router.post("", (req, res, next) => {
    
    Chat.findOneAndUpdate({$or: [
        {members:{$eq:[req.body.user, req.body.friend]}},
        {members:{$eq:[req.body.friend, req.body.user]}}
        ]},
        {$push:{messages: {from: req.body.user, body: req.body.message} }},
        {new: true}).then(chat => {
            if(!chat) {
                const newChat = new Chat({
                    members: [req.body.user, req.body.friend],
                    messages:
                    {
                        from: req.body.user, 
                        body: req.body.message
                    }
                });
                newChat.save().then( createdChat => {
                    res.status(201).json({
                        message: "Chat created & message sent successfully",
                        chat: createdChat
                    });
                });
            }
            else {
                res.status(200).json({ 
                    message: "message sent",
                    chat: chat
                });
            }
            
        });
    
});

router.get("/:friendUsername/:username", checkAuth, (req, res, next) => {
    Chat.findOne({$or: [
        {members:{$eq:[req.params.friendUsername, req.params.username]}},
        {members:{$eq:[req.params.username, req.params.friendUsername]}}
        ]}).then(chat => {
        // console.log(req.params.username);
        // console.log(req.params.friendUsername);
        // console.log(chat);
        res.status(200).json({
            message: "fetched",
            chat: chat
        });
    });
});

module.exports = router;