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

// Update a product by id
router.patch('/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = {new: true};

        const result = await Product.findByIdAndUpdate(id,updates,options);
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
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