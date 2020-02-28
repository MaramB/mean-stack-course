const express = require('express');
const router = express.Router();

const ShoppingCart = require('../models/shopping-cart');
const Cart = require('../models/cart');
const Product = require('../models/product');

router.post("", (req, res, next) => {
    const cart = new ShoppingCart({
        items: {
            product: {
                title: req.body.title,
                price: req.body.price,
            },
            quantity: req.body.quantity
        }
    });
    cart.save().then( createdCart => {
        res.status(201).json({
            message: "Cart created successfully",
            cart: createdCart
        });
    });
});

router.put("/:id", async(req, res, next) => {
    const cart = await ShoppingCart.findById(req.params.id);
    edited= false;
    qty = 0;
    for(const i in cart.items) {
        if (cart.items[i].product.title == req.body.title) {
            cart.items[i].quantity += req.body.quantity;
            qty = cart.items[i].quantity;
            
            updateItemQuantity = await ShoppingCart.update(
            {_id: req.params.id, "items.product.title": req.body.title}, 
            { $set: { "items.$.quantity" : cart.items[i].quantity } });
            res.status(200).json({
                qty : qty
            });
            edited = true;
        }
    }
    if(!edited) {
        addItem = await ShoppingCart.update(
            {_id: req.params.id}, 
            { $push: { "items" : 
            {product: {title: req.body.title, price: req.body.price}} } });
            res.status(200).json({
                qty: 1
            });
    }
});

// router.get("/:id", async(req, res, next) => {
//     const cart = await ShoppingCart.findById(req.params.id);
//     res.status(200).json({
//         cart: cart
//     });
// });

router.get("/shopping-cart", (req, res, next) => {
    if(!req.session.cart) {
        res.status(200).json({
            products: null,
            totalPrice: null
        });
    }
    else {
        const cart = new Cart(req.session.cart);
        res.status(200).json({
            products: cart.generateArray(),
            totalPrice: cart.totalPrice
        });
    }
});

router.delete("/clear-cart", (req, res, next) => {
    req.session.destroy();
    res.status(200).json({ cart: req.session });
});

router.get("/add/:id", async(req, res, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {} );

    Product.findById(productId).then( product => {
        cart.add(product, product.id); // the add method in cart.js
        req.session.cart = cart; //create cart object from session and it will be saved auto when the request is called
        // console.log(res.locals.session);
        res.status(200).json({ cart: req.session.cart});
    });
});

router.get("/remove/:id", async(req, res, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart );

    Product.findById(productId).then( product => {
        cart.remove(product, product.id); // the remove method in cart.js
        req.session.cart = cart; //create cart object from session and it will be saved auto when the request is called
        res.status(200).json({ cart: req.session.cart});
    });
});

router.get("", (req, res, next) => {
    if(res.locals.session) {
        res.status(200).json({
            session: res.locals.session
        });
    }
});







// router.get("/:id/:title", async(req, res, next) => {
//     ShoppingCart.findOne({}, { items: {$elemMatch: {"product.title": req.params.title}},
//      _id: req.params.id } )
//     .then( doc => {
//         res.status(200).json({ qty : doc.items[0].quantity });
//     });
// });

module.exports = router;