import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import { ClientError } from '../exceptions/clientError';
import { NotFoundError } from '../exceptions/notFoundError';
import { CustomRequest } from '../middleware/checkJwt';
import { Question, IQuestion } from '../models/question';
import { ROLES } from '../utils/constants';
import { processErrors } from '../utils/errorProcessing';
import { Answer, IAnswer } from '../models/answer';

class QuestionController {

    static getQuestions = async (req: Request, res: Response, next: NextFunction) => {
        const data = await Question.aggregate([
            {
                $lookup:
                {
                    from: "answers",
                    localField: "_id",
                    foreignField: "question_id",
                    as: "answers"
                }
            }
        ])
        res.status(200).type('json').send(data);
    };

    static addQuestion = async (req: Request, res: Response, next: NextFunction) => {
        let { question, email } = req.body;
        let ques;
        try {
            ques = Question.build({ question, email } as IQuestion)
            await ques.save();
            return res.status(200).type('json').send(ques);
        } catch (e: any) {
            console.error(e);
            const error = e as Error.ValidationError;
            throw new ClientError(processErrors(error));
        }
    };

    static editQuestion = async (req: Request, res: Response, next: NextFunction) => {
        let { question, id } = req.body;
        try {
            await Question.find({ _id: id })
                .updateOne({ question: question })
            const data = await Question.aggregate([
                {
                    $lookup:
                    {
                        from: "answers",
                        localField: "_id",
                        foreignField: "question_id",
                        as: "answers"
                    }
                }
            ])
            return res.status(200).send(data);
        } catch (e: any) {
            console.error(e);
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

    static addAnswers = async (req: Request, res: Response, next: NextFunction) => {
        let ques;
        const { answer, email, id } = req.body;
        var answers = new Answer({
            answer: answer,
            email: email,
            question_id: id
        })

        await answers.save();
        const data = await Answer.find()
        res.status(200).type('json').send(data);
    };

    static editAnswer = async (req: Request, res: Response, next: NextFunction) => {
        let { answer, id } = req.body;
        try {
            await Answer.find({ _id: id })
                .updateOne({ answer: answer })
            const data = await Question.aggregate([
                {
                    $lookup:
                    {
                        from: "answers",
                        localField: "_id",
                        foreignField: "question_id",
                        as: "answers"
                    }
                }
            ])
            return res.status(200).send(data);
        } catch (e: any) {
            console.error(e);
            const error = e as Error.ValidationError;
            throw new ClientError(processErrors(error));
        }
    };

    static delAnswer = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.body;
        try {
            const result = await Answer.deleteOne({ _id: id });
            const data = await Question.aggregate([
                {
                    $lookup:
                    {
                        from: "answers",
                        localField: "_id",
                        foreignField: "question_id",
                        as: "answers"
                    }
                }
            ])
            return res.status(200).send(data);
        } catch (err) {
            console.log("err", err)
        }
    };
}

export default QuestionController;
