import { Schema, Document, model } from 'mongoose';
import { IUser } from '../User/User';
const contestSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        logo: {
            type: String,
            validate: /^data:image\/[^;]+;base64[^"]+$/,
            required: true,
        },
        startTime: {
            type: Date,
            required: true,
            validate: [
                function () {
                    console.log('inside start time check');
                    console.log(this.startTime.getTime());
                    console.log(Date.now());
                    console.log(this.startTime.getTime() > Date.now());
                    return this.startTime > Date.now();
                },
                'Start Time should not be in the past',
            ],
        },
        endTime: {
            type: Date,
            required: true,
            validate: [
                function () {
                    return this.endTime > this.startTime;
                },
                'End time should be after start time',
            ],
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        approved: {
            type: Boolean,
            default: false,
        },
        creatorId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            immutable: true,
        },
        secretCode: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export interface IBaseContest {
    name: string;
    logo: string;
    startTime: Date;
    endTime: Date;
    description: string;
    approved: boolean;
    creatorId: IUser['_id'];
    secretCode: string;
}

export interface IContest extends Document, IBaseContest {}

const Contest = model<IContest>('Contest', contestSchema);

export default Contest;
