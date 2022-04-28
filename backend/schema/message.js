const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    msg: {
  type: String, required: true
    },
    room: {
      type: String,
    
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);