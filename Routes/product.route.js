const express = require('express');
const router = express.Router();
const Product = require('../Models/Product.model');

router.get('/', async (req,res,next) => {
    try {
        const result = await Product.find({},{ __v: 0});
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
});

router.post('/', async (req,res) => {
    try {
        const product = new Product(req.body);
        const result = await product.save();
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/:id', (req,res) => {
    res.send('getting a single product');
});

router.patch('/:id', (req,res) => {
    res.send('updating a single product');
});

router.delete('/:id', (req,res) => {
    res.send('deleting a single product');
});

module.exports = router;