const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/mine-sweeper", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const BeginnerModel = mongoose.model("BeginnerScore", {
  score: Number,
  pseudo: String,
  date: { type: Date, default: Date.now }
});
const IntermediateModel = mongoose.model("IntermediateScore", {
  score: Number,
  pseudo: String,
  date: { type: Date, default: Date.now }
});
const ExpertModel = mongoose.model("ExpertScore", {
  score: Number,
  pseudo: String,
  date: { type: Date, default: Date.now }
});

app.get("/beginners", async (req, res) => {
  try {
    const foundScores = await BeginnerModel.find()
      .sort({ score: 1 })
      .limit(5);
    res.status(200).json(foundScores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/beginners/new", async (req, res) => {
  try {
    const newBeginnerScore = new BeginnerModel({
      score: req.body.score,
      pseudo: req.body.pseudo
    });
    await newBeginnerScore.save();
    res.status(200).json(newBeginnerScore);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/intermediates", async (req, res) => {
  try {
    const foundScores = await IntermediateModel.find()
      .sort({ score: 1 })
      .limit(5);
    res.status(200).json(foundScores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/intermediates/new", async (req, res) => {
  try {
    const newIntermediateScore = new IntermediateModel({
      score: req.body.score,
      pseudo: req.body.pseudo
    });
    await newIntermediateScore.save();
    res.status(200).json(newIntermediateScore);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/experts", async (req, res) => {
  try {
    const foundScores = await ExpertModel.find()
      .sort({ score: 1 })
      .limit(5);
    res.status(200).json(foundScores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/experts/new", async (req, res) => {
  try {
    const newExpertScore = new ExpertModel({
      score: req.body.score,
      pseudo: req.body.pseudo
    });
    await newExpertScore.save();
    res.status(200).json(newExpertScore);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const port = 3001;

app.listen(3001, () => {
  console.log(`Server started on port ${port}`);
});
