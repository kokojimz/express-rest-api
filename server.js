require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const db = mongoose.connection;

const ProductRoute = require('./Routes/product.route');
app.use('/products',ProductRoute);

app.use((req,res,next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//Error handler
app.use((err,req,res,next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});


app.listen(port, () => {
    console.log(`listening on port ${port}`)
});