const mongoose = require('mongoose');

const shoppingCartSchema = mongoose.Schema({
    items: [{
        product: {
            title: String,
            price: Number
        },
        quantity: {type:Number, default: 1}
    }]
});

module.exports = mongoose.model('ShoppingCart', shoppingCartSchema);