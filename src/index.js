require('dotenv').config();
require('express-async-errors');
const express = require('express');
const routes =  require('./routes');
//var bodyParser = require('body-parser') - same as express.json();
const cookieParser = require('cookie-parser');
const timeout = require('connect-timeout');

const app = express();

const{ connectToDB } = require ('./utils/db');
const errorHandler = require('./middleware/errorHandler');

app.use(timeout('10s'));
app.use(express.json());  
app.use(haltOnTimedout);
app.use(cookieParser());
app.use(haltOnTimedout);  
//time out if a request takes too long.
//the use of haltOnTimedout after every middleware; it will stop the request flow on a timeout. It has to be the last 

//bodyparser's package:use req.body to get json object in request body, then transfer it as an  js object.
app.use('/yummy', routes);
app.use(errorHandler);

function haltOnTimedout (req, res, next) {
    if (!req.timedout) next()
  }
//global middleware: pre-process data in req-res cycle：
//1. read chunk and cache; 2. parse token 3. append role etc.

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

app.use("/", (req, res, next) => {
    res.setHeader("X-time", new Date());
    next();
}


);