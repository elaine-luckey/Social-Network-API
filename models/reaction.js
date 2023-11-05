const mongoose = require("mongoose");
const dayjs = require("dayjs");

// Create reaction model schema
const reactionSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    // Add getter method to format query timestamp
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timeStamp) => {
        return dayjs(timeStamp).format("MMM D YYYY [at] h:mm A");
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;