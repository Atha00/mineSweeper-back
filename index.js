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

const port = 3001;

app.listen(3001, () => {
  console.log(`Server started on port ${port}`);
});
