const mongoose = require("mongoose");

const IntermediateModel = mongoose.model("IntermediateScore", {
  score: Number,
  pseudo: String,
  date: { type: Date, default: Date.now }
});

module.exports = IntermediateModel;
