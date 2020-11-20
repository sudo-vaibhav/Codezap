import Problem, { IBaseProblem } from '../models/Problem/Problem';
import Contest from '../models/Contest/Contest';
import Participant from '../models/Participant/Participant';
import { Request, Response, NextFunction } from 'express';
import Submission from '../models/Submission/Submission';
import pollJudgeForResult from '../helpers/pollJudgeForResult';

const createProblem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contestId = req.params.contestId;
        const contest = await Contest.findById(contestId).exec();
        // you need to be the creator of the contest to submit a problem for it
        if (contest.creatorId === req.user._id) {
            const problem = new Problem({ ...req.body, contestId });
            problem.save();
            return res.status(201).send(problem.toJSON());
        }
        next('only creators are allowed to add problems to a contest');
    } catch (e) {
        next(e);
    }
};

const getProblem = async (req: Request, res: Response, next: NextFunction) => {
    // only problem creator should be able to see the problem at all times
    // the users should only be allowed to get the problem if they are
    // a *participant* AND the *contest time* is going on
    try {
        const userId = req.user._id;
        const { contestId, problemId } = req.params;
        const contestPromise = Contest.findById(contestId);
        // tbd: finish the participant flow and then do this
        const participantPromise = Participant.findOne({
            participant_user_id: userId,
            contestId,
        });

        const [contest, participant] = await Promise.all([contestPromise, participantPromise]);

        if (contest.creatorId === userId || participant) {
            const problem = (await Problem.findById(problemId).populate('testcases')).toJSON();
            console.log(problem);

            if (contest.creatorId === userId) {
                return res.send(problem);
            } else {
                const publicTestCases = problem.testCases.filter((testCase: { public: Boolean }) => testCase.public);
                return res.send({
                    ...problem,
                    testCases: publicTestCases,
                });
            }
        }
    } catch (e) {
        next(e);
    }
};

interface IUpdateRequest extends Request {
    body: {
        [P in keyof IBaseProblem]?: IBaseProblem[P];
    };
}

const updateProblem = async (req: IUpdateRequest, res: Response, next: NextFunction) => {
    try {
        const { contestId, problemId } = req.params;
        const contestPromise = Contest.findById(contestId).exec();
        const problemPromise = Problem.findById(problemId).exec();
        const [contest, problem] = await Promise.all([contestPromise, problemPromise]);
        if (contest.creatorId === req.user._id) {
            const updatedProblem = req.body;
            const problemKeys = Object.keys(updatedProblem) as [keyof IBaseProblem];
            problemKeys.forEach(key => {
                problem.set(key, updatedProblem[key]);
            });
            await problem.save();
            return res.send(problem.toJSON());
        }
        next('insufficient permissions');
    } catch (e) {
        next(e);
    }
};

export interface ISubmissionInfo {
    sourceCode: string;
    languageId: number;
}
const addSubmission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { problemId, contestId } = req.params;
        // first check if current user has participated or not
        const participant = await Participant.findOne({ participant_user_id: req.user.user_id, contestId });
        if (participant) {
            const problem = await Problem.findById(problemId);
            const submissionInfo = req.body as ISubmissionInfo;
            const obtainedScore = await pollJudgeForResult(problem, submissionInfo);
            const submission = await Submission.findOneAndUpdate(
                { userId: req.user._id, problemId },
                {
                    maxScoredPoints: obtainedScore,
                },
                { upsert: true, new: true },
            );

            return res.send(submission.toJSON());
        }
        next('user not participating in the given event');
    } catch (e) {
        next(e);
    }
};
export default {
    createProblem,
    getProblem,
    updateProblem,
    addSubmission,
};
