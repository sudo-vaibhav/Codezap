import { Schema, model, Document } from 'mongoose';
import { IUser } from '../User/User';
import { IProblem } from '../Problem/Problem';
const submissionSchema = new Schema(
    {
        scoredPoints: {
            type: Number,
            required: true,
            immutable: false,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            immutable: true,
        },
        problemId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Problem',
            immutable: true,
        },
    },
    {
        timestamps: true,
    },
);

export interface ISubmission extends Document {
    scoredPoints: number;
    userId: IUser['_id'];
    problem: IProblem['_id'];
}
const Submission = model<ISubmission>('Submission', submissionSchema);

export default Submission;
