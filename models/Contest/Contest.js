const mongoose = require("mongoose");

const contestSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    logo: {
      type: String,
      validate: /^data:image\/[^;]+;base64[^"]+$/,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      immutable: true,
    },
    secretCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contest = mongoose.model("Contest", contestSchema);

module.exports = Contest;
