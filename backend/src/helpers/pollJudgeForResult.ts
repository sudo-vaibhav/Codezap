import { ISubmissionInfo } from '../controllers/problem';
import { IProblem, ITestCase } from '../models/Problem/Problem';
import axios from 'axios';
import constants from './constants';
const apiBaseURL = 'https://judge0.p.rapidapi.com';

const axiosForJudge = axios.create({
    baseURL: apiBaseURL,
    headers: {
        'Content-type': 'application/json',
        'x-rapidapi-key': process.env['JUDGE_KEY'],
        'x-rapidapi-host': 'judge0.p.rapidapi.com',
    },
    // transformResponse: [
    //     function (resp) {
    //         // Do whatever you want to transform the data
    //         return resp.data;
    //     },
    // ],
});

interface ITokenObject {
    token: string;
}

const pollJudgeForResult = async (problem: IProblem, submissionInfo: ISubmissionInfo) => {
    console.log('trying to poll judge0 evaluation');
    let tokenToTestCaseMap: { [key: string]: ITestCase };
    const submissionsResp: ITokenObject[] = await axiosForJudge
        .post(`${apiBaseURL}/submissions/batch`, {
            submissions: problem.testCases.map(testCase => {
                return {
                    language_id: submissionInfo.languageId,
                    source_code: submissionInfo.sourceCode,
                    stdin: testCase.input,
                    expected_output: testCase.output,
                };
            }),
        })
        .then(resp => resp.data.submissions);

    const tokens = submissionsResp.map((submissionResponse, index) => {
        tokenToTestCaseMap[submissionResponse.token] = problem.testCases[index];
        return submissionResponse.token;
    });

    //wait 3 seconds hoping that all the evaluations get compeleted
    console.log('wait 3 seconds hoping that all the evaluations get compeleted');

    await new Promise(resolve => setTimeout(resolve, 3000));

    const submissionsResultResp: [{ token: string; status: { description: string } }] = await axiosForJudge
        .get(`${apiBaseURL}/submissions/batch?tokens=${tokens.join(',')}`)
        .then(resp => resp.data.submissions);
    let scoredPoints = 0;
    submissionsResultResp.forEach(result => {
        if (result.status.description === constants.acceptedString) {
            // add the corresponding marks to that test case if the submission was accepted
            scoredPoints += tokenToTestCaseMap[result.token].points;
        }
    });

    return scoredPoints;
};

export default pollJudgeForResult;
