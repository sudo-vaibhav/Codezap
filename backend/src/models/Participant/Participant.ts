import { Schema, Document, model } from 'mongoose';
import { IUser } from '../User/User';
import { IContest } from '../Contest/Contest';
const participantSchema = new Schema(
    {
        participant_user_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            immutable: true,
        },
        contestId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Contest',
            immutable: true,
        },
    },
    {
        timestamps: true,
    },
);

// imposes integrity constraint to disallow multiple participations of same user in the same event
participantSchema.index({ participant_user_id: 1, contestId: 1 }, { unique: true });

export interface IParticipant extends Document {
    participant_user_id: IUser['_id'];
    contestid: IContest['_id'];
}
const Participant = model<IParticipant>('Participant', participantSchema);

export default Participant;
