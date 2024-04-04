import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// import { ROLES } from '../utils/constants';

export interface IQuestion {
    question: string;
    email: string;
}

interface questionModelInterface extends mongoose.Model<QuestionDoc> {
    build(attr: IQuestion): QuestionDoc;
}

interface QuestionDoc extends mongoose.Document {
    username: string;
    email: string;
}

const questionSchema = new mongoose.Schema<IQuestion>(
    {
        question: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: async function (v: string): Promise<boolean> {
                    let doc: any = await Question.findOne({ question: v });
                    // @ts-ignore
                    if (doc) return this._id.toString() === doc._id.toString();
                    else return Boolean(!doc);
                },
                message: 'Username already in use.'
            }
        },
        email: {
            type: String,
            required: true,
            minLength: [3, 'email too short'],
            maxLength: [120, 'email too long']
        }
    },
    // Created at and updated at timestamps
    { timestamps: true }
);



questionSchema.statics.build = (attr: IQuestion) => {
    return new Question(attr);
};

questionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
        delete returnedObject.createdAt;
        delete returnedObject.updatedAt;
    }
});

const Question = mongoose.model<QuestionDoc, questionModelInterface>('Question', questionSchema);

export { Question };
