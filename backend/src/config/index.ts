// Add dotenv for environment variables
import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    jwt: {
        secret: process.env.JWT_SECRET,
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER
    },
    port: 8080,
    prefix: 'api',
    databaseUri: 'mongodb+srv://softguru555:gXxmSyBd1tnnFkS0@cluster0.oe29qky.mongodb.net/pidwind?ssl=true&authSource=admin'
};

export default config;
