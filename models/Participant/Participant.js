const mongoose = require("mongoose");
const participantSchema = mongoose.Schema(
  {
    partcipant_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      immutable: true,
    },
    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Contest",
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

// imposes integrity constraint to disallow multiple participations of same user in the same event
participantSchema.index(
  { partcipant_user_id: 1, contestId: 1 },
  { unique: true }
);

const Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant;
