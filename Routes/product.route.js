const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../Models/Product.model');
const createError = require('http-errors');

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
router.post('/', async (req,res,next) => {
    try {
        const product = new Product(req.body);
        const result = await product.save();
        res.send(result);
    } catch (error) {
        console.log(error.message);
        if(error.name === 'ValidationError') {
            next(createError(422, error.message));
            return;
        }
        next(error);
    }
});

// GET a product by id
router.get('/:id', async (req, res, next) => {
    const productId = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw createError(400, 'Invalid product ID!');
        }
        const result = await Product.findById(productId);
        if(!result){
            throw createError(404, 'No such product exists!');
        }
        res.send(result);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
});

// Update a product by id
router.patch('/:id', async (req,res,next) => {
    try {
        const productId = req.params.id;
        const updates = req.body;
        const options = {new: true};

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw createError(400, 'Invalid product ID!');
        }
        const result = await Product.findByIdAndUpdate(productId,updates,options);
        if(!result){
            throw createError(404, 'No such product exists!');
        }
        res.send(result);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
});

// Delete a product by id
router.delete('/:id', async (req,res,next) => {
    const productId = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw createError(400, 'Invalid product ID!');
        }
        const result = await Product.findByIdAndDelete(productId);
        if(!result){
            throw createError(404, 'No such product exists!');
        }
        res.send(result);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
});

module.exports = router;