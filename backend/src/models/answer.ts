import mongoose, { ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';
// import { ROLES } from '../utils/constants';

export interface IAnswer {
    answer: string;
    email: string;
    question_id: mongoose.Schema.Types.ObjectId;
}

interface answerModelInterface extends mongoose.Model<AnswerDoc> {
    build(attr: IAnswer): AnswerDoc;
}

interface AnswerDoc extends mongoose.Document {
    answer: string;
    email: string;
    question_id: mongoose.Schema.Types.ObjectId;
}

const answerSchema = new mongoose.Schema<IAnswer>(
    {
        answer: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
        },
        question_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        }
    },
    { timestamps: true }
);

answerSchema.statics.build = (attr: IAnswer) => {
    return new Answer(attr);
};

answerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.createdAt;
        delete returnedObject.updatedAt;
    }
});
const Answer = mongoose.model<AnswerDoc, answerModelInterface>('Answer', answerSchema);
export { Answer };
