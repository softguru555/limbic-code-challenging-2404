import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { json } from 'body-parser';
import routes from './routes/index';
import { errorHandler } from './middleware/errorHandler';
import config from './config';

const cors = require('cors');
const app = express();
app.use(json());
app.use(cors());
app.use('/' + config.prefix, routes);
app.use(errorHandler);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader("Access-Control-Allow-Headers", "authorization");
    next();
});
mongoose
    .connect(
        config.databaseUri!,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions
    )
    .then((res) => {
        console.log('Connected to Database - Initial Connection');
        app.listen(config.port, () => {
            console.log(`server is listening on port ${config.port}`);
        });
    })
    .catch((err) => {
        console.log(`Initial Database connection error occured -`, err);
    });
