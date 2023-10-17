const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
    res.send('getting a list of all products');
    // next(new Error('Cannot get a list of all products'));
});

router.post('/', (req,res) => {
    res.send('products crated');
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