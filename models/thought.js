// Import reaction Schema, days.js, and mongoose
const mongoose = require("mongoose");
const reaction = require("./reaction");
const dayjs = require("dayjs");

// create thought model schema
const thoughtSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    reaction: [reaction],
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
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get thought's reaction array length
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reaction.length;
});

// Initialize Thought model
const thought = mongoose.model("thought", thoughtSchema);

module.exports = thought;