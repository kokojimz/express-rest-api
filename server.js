require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');


// Access variables
const dbHost = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
mongoose
    .connect(dbHost,{
        dbName: dbName,
        user: dbUser,
        pass: dbPassword,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    )
    .then(() => {
    console.log('Mongodb connected...');
});

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