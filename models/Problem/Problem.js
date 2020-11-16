const mongoose = require('mongoose');

const testCaseSchema = require('./testCase/testCaseSchema');

const problemSchema = mongoose.Schema(
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
      required: true,
    },
    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contest',
      immutable: true,
      default: null,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      immutable: true,
      ref: 'User',
    },
    testCases: [testCaseSchema],
  },
  {
    timestamps: true,
  }
);

problemSchema.virtual('totalPoints').get(function () {
  return this.testCases
    .map((testCase) => {
      return testCase.points;
    })
    .reduce((a, b) => {
      return a + b;
    }, 0);
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
