import { Schema, model, Document } from 'mongoose';
import { IUser } from '../User/User';
import { IProblem } from '../Problem/Problem';
const submissionSchema = new Schema(
    {
        maxScoredPoints: {
            type: Number,
            default: 0,
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

// a user can only have one existing submission per problem
// so if they try to add a submission for a problem, either it will be added fresh
// or updated (this happens successfully only if new score is higher than old score)
submissionSchema.index({ userId: 1, problemId: 1 }, { unique: true });

submissionSchema.pre('save', async function (next) {
    console.log('inside score comparison middleware');
    let newSubmission = this as ISubmission;
    const oldSubmission = await Submission.findById(newSubmission._id);
    if (newSubmission.maxScoredPoints < (oldSubmission ? oldSubmission.maxScoredPoints : 0)) {
        throw new Error('an existing submission by user with a higher score already exists');
    }
    next();
});

export interface IBaseSubmission {
    maxScoredPoints: number;
    userId: IUser['_id'];
    problemId: IProblem['_id'];
}

export interface ISubmission extends IBaseSubmission, Document {}
const Submission = model<ISubmission>('Submission', submissionSchema);

export default Submission;
