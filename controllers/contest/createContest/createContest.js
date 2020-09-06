const Contest = require("../../../models/Contest/Contest");

const contestDefaults = {
  approved: false,
};

module.exports = async (req, res, next) => {
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
