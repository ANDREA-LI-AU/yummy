require('dotenv').config();
require('express-async-errors');
const express = require('express');
const routes =  require('./routes');
const app = express();

const{ connectToDB } = require ('./utils/db');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());
app.use('/yummy', routes);
app.use(errorHandler);

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