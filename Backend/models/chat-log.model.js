const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
   role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
)

const chatLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    messages: {
      type: [chatMessageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const chatLogModel = mongoose.model("chat-logs", chatLogSchema);

module.exports = chatLogModel;