import { Schema, model, Document } from 'mongoose';

import testCaseSchema from './testCase/testCaseSchema';

const problemSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard', 'Expert'],
            default: 'Easy',
        },
        contestId: {
            type: Schema.Types.ObjectId,
            ref: 'Contest',
            immutable: true,
            required: true,
        },
        testCases: [testCaseSchema],
    },
    {
        timestamps: true,
    },
);

problemSchema.virtual('totalPoints').get(function (this: IProblem) {
    try {
        const totalPoints = this.testCases
            .map(testCase => {
                return testCase.points;
            })
            .reduce((a, b) => {
                return a + b;
            }, 0);
        return totalPoints;
    } catch (e) {
        console.log(e);
    } finally {
        return 0;
    }
});

export interface ITestCase {
    input: string;
    output: string;
    points: number;
    public: boolean;
}

export interface IBaseProblem {
    name: string;
    description: string;
    difficulty: string;
    testCases: ITestCase[];
}
export interface IProblem extends IBaseProblem, Document {}
const Problem = model<IProblem>('Problem', problemSchema);

export default Problem;
