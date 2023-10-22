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

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

//test
app.all('/test',(req,res) => {
    // console.log(req.query);
    // res.send(req.query);
    // console.log(req.query.name);
    // console.log(req.params);
    // res.send(req.params);
    console.log(req.body);
    res.send(req.body);
});

const ProductRoute = require('./Routes/product.route');
app.use('/products',ProductRoute);

//404 handler and pass to error handler
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