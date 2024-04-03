import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import { User } from '../models/user';
import config from '../config';
import { ClientError } from '../exceptions/clientError';
import { UnauthorizedError } from '../exceptions/unauthorizedError';
import { NotFoundError } from '../exceptions/notFoundError';
import { processErrors } from '../utils/errorProcessing';
import { Error } from 'mongoose';
import { IUser } from '../models/user';
class AuthController {
    static signup = async (req: Request, res: Response, next: NextFunction) => {
        // Check if username and password are set
        let { email, password, name} = req.body;
        if (email == '' || password == '' || name == '') return res.status(400).send("Please fill all inputs");

        // Get user from 
        console.log(name);
        
        const user = await User.findOne({ username: name }).exec();
        console.log("user:", user);
        // Check if encrypted password match
        // if (!user || !(await user.isPasswordCorrect(password))) {
        //     throw new UnauthorizedError("Username and password don't match");
        // }
        if(user){
            return res.status(401).send("Please fill all inputs");
        }
        // const userData = new User({
        //     username: name,
        //     password: password,
        //     email: email
        // });
        const username = name;
        const userInfo = User.build({username, password, email} as IUser);

        // Save the user
        await userInfo.save();
        // await userData.save();
        console.log("ok");
        // Sing JWT, valid for 1 hour
        // const token = sign({ userId: user._id.toString(), username: user.username, role: user.role }, config.jwt.secret!, {
        //     expiresIn: '1h',
        //     notBefore: '0', // Cannot use before now, can be configured to be deferred
        //     algorithm: 'HS256',
        //     audience: config.jwt.audience,
        //     issuer: config.jwt.issuer
        // });

        // Send the jwt in the response
        // res.type('json').send({ token: token });
        return res.type('jsone').send("Success");
    };
    static login = async (req: Request, res: Response, next: NextFunction) => {
        // Check if username and password are set
        let { email, password } = req.body;
        console.log("req.body", req.body);
        if (!(email)) throw new ClientError('email and password are required');

        // Get user from database
        const user = await User.findOne({ email: email }).exec();

        // Check if encrypted password match
        if (!user || !(await user.isPasswordCorrect(password))) {
            throw new UnauthorizedError("email and password don't match");
        }

        // Sing JWT, valid for 1 hour
        const token = sign({ userId: user._id.toString(), email: user.email, role: user.role }, config.jwt.secret!, {
            expiresIn: '1h',
            notBefore: '0', // Cannot use before now, can be configured to be deferred
            algorithm: 'HS256',
            audience: config.jwt.audience,
            issuer: config.jwt.issuer
        });
        console.log("pride", token);
        // Send the jwt in the response
        res.type('json').send({ token: token });
    };

    static changePassword = async (req: Request, res: Response, next: NextFunction) => {
        // Get ID from JWT
        const id = res.locals.jwtPayload.userId;

        // Get parameters from the body
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) throw new ClientError("Passwords don't match");

        // Get user from the database
        const user = await User.findById(id);
        if (!user) {
            throw new NotFoundError(`User with ID ${id} not found`);
        } else if (!(await user.isPasswordCorrect(oldPassword))) {
            throw new UnauthorizedError("Old password doesn't match");
        }

        // Store new pasword
        user.password = newPassword;

        try {
            // Just save, validation will happen when saving
            await user.save();
        } catch (e) {
            console.error(e);
            const error = e as Error.ValidationError;
            throw new ClientError(processErrors(error));
        }

        res.status(204).send();
    };
}
export default AuthController;
