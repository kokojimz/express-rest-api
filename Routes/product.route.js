const express = require('express');
const router = express.Router();
const Product = require('../Models/Product.model');

// Get a list of all products
router.get('/', async (req,res,next) => {
    try {
        const result = await Product.find({},{ __v: 0});
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
});

// Create a product
router.post('/', async (req,res) => {
    try {
        const product = new Product(req.body);
        const result = await product.save();
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
});

// GET a product by id
router.get('/:id', async (req,res) => {
    try {
        const result = await Product.findById({_id: req.params.id},{ __v: 0});
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
});

router.patch('/:id', (req,res) => {
    res.send('updating a single product');
});

// Delete a product by id
router.delete('/:id', async (req,res) => {
    try {
        const result = await Product.findByIdAndDelete({_id: req.params.id});
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;