import { Schema } from 'mongoose';
const testCaseSchema = new Schema({
    // input to be given
    input: {
        type: String,
        required: true,
    },
    // expected output
    output: {
        type: String,
        required: true,
    },
    //points alloted for given test case
    points: {
        type: Number,
        required: true,
        default: 0,
    },
    // determines if test case is private or public
    public: {
        type: Boolean,
        required: true,
        default: false,
    },
});

export default testCaseSchema;
