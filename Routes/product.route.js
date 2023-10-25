const express = require('express');
const router = express.Router();

const ProductController = require('../Controllers/Product.Controller');

// Get a list of all products
router.get('/', ProductController.getAllProducts);

// Create a product
router.post('/', ProductController.createProduct);

// GET a product by id
router.get('/:id', ProductController.getProductById);

// Update a product by id
router.patch('/:id', ProductController.updateProduct);

// Delete a product by id
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;