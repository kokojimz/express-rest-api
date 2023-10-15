require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const db = mongoose.connection;

const ProductRoute = require('./Routes/product.route');
app.use('/products',ProductRoute);




app.listen(port, () => {
    console.log(`listening on port ${port}`)
});