
const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    members: [ { type: String, required: true } ], //usernames 
    messages:[ 
        { from: {type:String, required: true}, 
          body: {type:String, required: true} 
        }]
});

module.exports = mongoose.model('Chat', chatSchema);