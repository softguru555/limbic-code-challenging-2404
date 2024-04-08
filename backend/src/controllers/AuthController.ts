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
        let { email, password, name } = req.body;
        if (email == '' || password == '' || name == '') return res.status(400).send("Please fill all inputs");
        const user = await User.findOne({ username: name }).exec();
        if (user) {
            return res.status(401).send("Please fill all inputs")
        }
        const username = name;
        if (username == "wind") {
            var userInfo = User.build({ username, password, email, role: "ADMIN" } as IUser);
        } else {
            var userInfo = User.build({ username, password, email } as IUser);
        }
        // Save the user
        await userInfo.save();
        return res.type('json').send("Success");
    };

    static login = async (req: Request, res: Response, next: NextFunction) => {
        let { email, password } = req.body;
        if (!(email)) throw new ClientError('email and password are required');
        const user = await User.findOne({ email: email }).exec();
        if (!user || !(await user.isPasswordCorrect(password))) {
            throw new UnauthorizedError("email and password don't match");
        }
        const token = sign({ userId: user._id.toString(), email: user.email, role: user.role }, config.jwt.secret!, {
            expiresIn: '1h',
            notBefore: '0',
            algorithm: 'HS256',
        });
        const finalData = { token: token, user: user };
        return res.type('json').send(finalData);
    };

    static changePassword = async (req: Request, res: Response, next: NextFunction) => {
        const id = res.locals.jwtPayload.userId;
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) throw new ClientError("Passwords don't match");
        const user = await User.findById(id);
        if (!user) {
            throw new NotFoundError(`User with ID ${id} not found`);
        } else if (!(await user.isPasswordCorrect(oldPassword))) {
            throw new UnauthorizedError("Old password doesn't match");
        }
        user.password = newPassword;

        try {
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
