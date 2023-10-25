const Product = require('../Models/Product.model');
const mongoose = require('mongoose');
const createError = require('http-errors');

const getAllProducts = async (req,res,next) => {
    try {
        const result = await Product.find({},{ __v: 0});
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
};

const createProduct = async (req,res,next) => {
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
};

const getProductById = async (req, res, next) => {
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
};

const updateProduct = async (req,res,next) => {
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
};

const deleteProduct = async (req,res,next) => {
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
};

module.exports = {getAllProducts,createProduct,getProductById,updateProduct,deleteProduct};