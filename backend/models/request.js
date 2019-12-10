const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
    requester: String,
    recipient: { type: String, required: true },
    status: Number // 1: pending, 2: accepted, 3: rejected
});

module.exports = mongoose.model('Request', requestSchema);