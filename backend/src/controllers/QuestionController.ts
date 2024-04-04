import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import { ClientError } from '../exceptions/clientError';
import { ForbiddenError } from '../exceptions/forbiddenError';
import { NotFoundError } from '../exceptions/notFoundError';
import { CustomRequest } from '../middleware/checkJwt';
import { Question, IQuestion } from '../models/question';
import { ROLES } from '../utils/constants';
import { processErrors } from '../utils/errorProcessing';

class QuestionController {

    static addQuestion = async (req: Request, res: Response, next: NextFunction) => {
        // Get parameters from the body
        let { question, email } = req.body;
        let ques;
        try {
            ques = Question.build({ question, email } as IQuestion)
            // ques = new Question({ question, email });
            // Save the question
            await ques.save();
            return res.status(200).send("Success");
        } catch (e: any) {
            console.error(e);
            const error = e as Error.ValidationError;
            throw new ClientError(processErrors(error));
        }

    };
    static getQuestions = async (req: Request, res: Response, next: NextFunction) => {
        let ques;
        const questions = await Question.find();
        console.log("questions", questions)
        if (!questions) res.status(300).type('json').send("question is not found");
        res.status(200).type('json').send(questions);
    };
}

export default QuestionController;
