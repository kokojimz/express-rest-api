const express = require('express');
const app = express();
const port = 3000;
const createError = require('http-errors');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Initialize DB
require('./initDB')();

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
    next(createError(404,'Not found'));
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