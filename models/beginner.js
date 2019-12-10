const mongoose = require("mongoose");

const BeginnerModel = mongoose.model("BeginnerScore", {
  score: Number,
  pseudo: String,
  date: { type: Date, default: Date.now }
});

module.exports = BeginnerModel;
