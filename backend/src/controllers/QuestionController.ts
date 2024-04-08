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
        if (!questions) res.status(300).type('json').send("question is not found");
        res.status(200).type('json').send(questions);
    };
    static addAnswers = async (req: Request, res: Response, next: NextFunction) => {
        let ques;
        const { answer, email, id } = req.body;
        try {
            const result = await Question.updateOne(
                { _id: id },
                { $push: { contents: { answer: answer, email: email } } }
            );
            const data = await Question.find();
            console.log(`$ document(s) updated.`, data);

            return res.status(200).type('json').send(data)
        } catch (e) {
            // console.error('Error updating document:', error);
            const error = e as Error.ValidationError;

            throw new ClientError(processErrors(error));
        }

    };

    static delQuestion = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const data = await Question.findById(id);
        if (!data) throw new NotFoundError(`User with ID ${id} not found`);

        await data.delete();
        return res.status(200).type('json').send(data);
    };
    static delAnswer = async (req: Request, res: Response, next: NextFunction) => {
        const { questionId, answer } = req.body;
        try {
            const result = await Question.updateOne(
                { id: questionId },
                { $pull: { contents: { answer: answer } } }
            );
            console.log("queuedfssssssssssssssssssssssssssss", result); return;
        } catch (err) {
            console.log("err", err)
        }


        // const data = await Question.findById(id);
        // if (!data) throw new NotFoundError(`User with ID ${id} not found`);

        // await data.delete();
        // return res.status(200).type('json').send(data);
    };
}

export default QuestionController;
