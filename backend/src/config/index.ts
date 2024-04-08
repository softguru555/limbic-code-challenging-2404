import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    port: 8080,
    prefix: 'api',
    databaseUri: 'mongodb+srv://softguru555:gXxmSyBd1tnnFkS0@cluster0.oe29qky.mongodb.net/pidwind?ssl=true&authSource=admin'
};

export default config;
