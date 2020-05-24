require('dotenv').config();
require('express-async-errors');
const express = require('express');
const routes =  require('./routes');
const app = express();

const{ connectToDB } = require ('./utils/db');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());  
//bodyparser's package:use req.body to get json object in request body, then transfer it as an  js object.
app.use('/yummy', routes);
app.use(errorHandler);

//global middleware: pre-process data in req-res cycle：
//1. read chunk and cache; 2. 解析token 3. append role etc.

connectToDB().then(
    () => {
        //start the server
        app.listen(3000, () =>{
            console.log('server is listening');
        })
    }
).catch(
    //if the connection failed, dont start the server.
    e => {
        console.error(e);
        process.exit(1); //any numbers but 0; 0 means exit w/o errors
    }
);