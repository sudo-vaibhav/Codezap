import Contest from '../../models/Contest/Contest';
import { Request, Response, NextFunction } from 'express';
import { IBaseContest } from '../../models/Contest/Contest';
import Participant from '../../models/Participant/Participant';
const contestDefaults = {
    approved: false,
};

const participantRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user._id;
        const contestId = req.params.contestId;
        const contest = await Contest.findById(contestId).exec();
        if (contest.secretCode === req.body.secretCode) {
            if (contest.creatorId != userId) {
                const participant = new Participant({
                    participant_user_id: userId,
                    contestId,
                });
                await participant.save();
                return res.send(participant);
            }
            next('creator of contest cannot participate');
        }
        next('code provided is incorrect');
    } catch (e) {
        next(e);
    }
};

const createContest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // will fail automatically if creator is not defined
        const contest = new Contest({
            ...req.body,
            ...contestDefaults,
            creatorId: req.user._id,
        });
        await contest.save();
        return res.status(200).send(contest);
    } catch (err) {
        next(err);
    }
};

interface IContestRequest extends Request {
    body: {
        [key in keyof IBaseContest]?: IBaseContest[key];
    };
}

const updateContest = async (req: IContestRequest, res: Response, next: NextFunction) => {
    try {
        const contestId = req.params.contestId;
        const updatedContest = req.body;
        const contest = await Contest.findById(contestId).exec();
        if (contest._id === req.user._id) {
            const keys = (Object.keys(updatedContest) as (keyof IBaseContest)[]).filter(key => key != 'approved');
            keys.forEach(key => contest.set(key, updatedContest[key]));

            await contest.save();
            res.send(contest.toJSON());
        }
        next('insufficient permissions');
    } catch (e) {
        next(e);
    }
};

const getMyContests = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const participations = await Participant.findOne({ participant_user_id: userId }).populate('contestId');
    return res.send(participations);
};

export default {
    createContest,
    participantRegister,
    updateContest,
    getMyContests,
};
