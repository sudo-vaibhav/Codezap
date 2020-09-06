const User = require("../../../models/User/User");

module.exports = async (req, res, next) => {
  console.log(req.params);
  try {
    const result = await User.findOneAndUpdate(
      {
        _id: req.params._id,
        user_id: req.user.user_id,
      },
      { $set: req.body },
      {
        runValidators: true,
        returnOriginal: false,
      }
    );
    return res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};
