const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: String,
    price: Number,
    category: String,
    imageUrl: String
});

module.exports = mongoose.model('Product', productSchema);