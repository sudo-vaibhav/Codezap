const User = require("../../../models/User/User");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.params._id,
      user_id: req.user.user_id,
    });
    if (user) {
      return res.status(200).send(user);
    } else {
      next("user not found");
    }
  } catch (err) {
    return next(err);
  }
};
