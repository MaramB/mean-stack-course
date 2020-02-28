const express = require('express');
const router = express.Router();

const Product = require('../models/product');

router.post("", (req, res, next) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        imageUrl: req.body.imageUrl
    });
    product.save().then( createdProduct => {
        res.status(201).json({
            message: "Product created successfully",
            product: createdProduct
        });
    });
});

router.get("", (req, res, next) => {
    Product.find().then( result => {
        res.status(200).json({
            message: "fetched products successfully",
            products: result
        });
    });
});

module.exports = router;