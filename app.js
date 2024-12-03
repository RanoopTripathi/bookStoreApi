const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');

app.use(morgan('dev'));
app.use(fileupload());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Origin,X-Requested-with,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Credentials',true);
})

app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
})

module.exports = app;