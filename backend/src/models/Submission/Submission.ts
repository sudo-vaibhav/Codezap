import { Schema, model, Document } from 'mongoose';
import { IUser } from '../User/User';
import Problem, { IProblem } from '../Problem/Problem';
import axios from 'axios';
const submissionSchema = new Schema(
    {
        scoredPoints: {
            type: Number,
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
        userInput: {
            type: String,
            immutable: true,
        },
        languageId: {
            type: Number,
            immutable: true,
            required: true,
        },
        judge0SubmissionTokens: [{ type: [String], default: [] }],
    },
    {
        timestamps: true,
    },
);

submissionSchema.methods.triggerJudge0 = async function () {
    try {
        console.log('trying to submit to judge0');
        const submission: ISubmission = this;
        const problem = await Problem.findById(submission.problemId).populate('testCases');
        const testCases = problem.testCases || [];

        const resp = await axios
            .post(
                'https://judge0.p.rapidapi.com/submissions/batch',
                {
                    submissions: testCases.map(testCase => {
                        return {
                            language_id: submission.languageId,
                            source_code: submission.userInput,
                            stdin: testCase.input,
                            expected_output: testCase.output,
                        };
                    }),
                },
                {
                    headers: {
                        'content-type': 'application/json',
                        'x-rapidapi-key': process.env['JUDGE_KEY'],
                        'x-rapidapi-host': 'judge0.p.rapidapi.com',
                    },
                },
            )
            .then(resp => resp.data);
        const newSubmission = await Submission.findById(submission._id);
        newSubmission.judge0SubmissionTokens = resp.map((submission: { token: string }) => {
            return submission.token;
        });

        await newSubmission.save();
    } catch (e) {
        console.log('error occured in doing judge0 submission\n', e);
    }
};

export interface IBaseSubmission {
    scoredPoints: number;
    userId: IUser['_id'];
    problemId: IProblem['_id'];
    userInput: string | null;
    languageId: number;
    judge0SubmissionTokens: [string];
}
export interface ISubmission extends IBaseSubmission, Document {}
const Submission = model<ISubmission>('Submission', submissionSchema);

export default Submission;
