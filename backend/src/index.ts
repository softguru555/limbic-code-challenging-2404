import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { json } from 'body-parser';
import routes from './routes/index';
// import  cors from 'cors';
// Middleware
import { errorHandler } from './middleware/errorHandler';
import config from './config';
// import cors from 'cors';
const cors = require('cors');
const app = express();
app.use(json());
app.use(cors());
console.log("djdjdjd");
// Add the routes with the base prefix
app.use('/' + config.prefix, routes);

// Add error handling
app.use(errorHandler);
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
mongoose
    .connect(
        config.databaseUri!,
        // Pass the options as ConnectOptions to avoid TS errors
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions
    )
    .then((res) => {
        console.log('Connected to Database - Initial Connection');
        // Listen only if DB connection works
        app.listen(config.port, () => {
            console.log(`server is listening on port ${config.port}`);
        });
    })
    .catch((err) => {
        console.log(`Initial Database connection error occured -`, err);
    });
