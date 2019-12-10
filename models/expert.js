const mongoose = require("mongoose");

const ExpertModel = mongoose.model("ExpertScore", {
  score: Number,
  pseudo: String,
  date: { type: Date, default: Date.now }
});

module.exports = ExpertModel;
